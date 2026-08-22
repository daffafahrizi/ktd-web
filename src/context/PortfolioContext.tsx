"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  PortfolioItem,
  ShopSettings,
  INITIAL_PORTFOLIO,
  INITIAL_SETTINGS,
} from "@/data/initialData";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const PORTFOLIO_STORAGE_KEY = "ktd_portfolio_data_v1";
const SETTINGS_STORAGE_KEY = "ktd_settings_data_v1";

type PortfolioContextType = {
  portfolio: PortfolioItem[];
  settings: ShopSettings;
  isLoaded: boolean;
  isSupabaseConnected: boolean;
  addPortfolioItem: (item: Omit<PortfolioItem, "id">) => Promise<PortfolioItem>;
  updatePortfolioItem: (id: string, updated: Partial<PortfolioItem>) => Promise<void>;
  deletePortfolioItem: (id: string) => Promise<void>;
  updateSettings: (newSettings: Partial<ShopSettings>) => Promise<void>;
  resetToDefaults: () => Promise<void>;
  refreshFromCloud: () => Promise<void>;
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined
);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(INITIAL_PORTFOLIO);
  const [settings, setSettings] = useState<ShopSettings>(INITIAL_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(isSupabaseConfigured);

  // Fungsi memuat data dari Supabase Cloud (dengan fallback ke localStorage)
  const loadData = async () => {
    let loadedFromSupabase = false;

    if (isSupabaseConfigured && supabase) {
      try {
        // 1. Fetch Portfolio Items from Supabase
        const { data: portfolioData, error: portfolioError } = await supabase
          .from("portfolio_items")
          .select("*")
          .order("created_at", { ascending: false });

        if (!portfolioError && portfolioData && portfolioData.length > 0) {
          const formattedPortfolio: PortfolioItem[] = portfolioData.map((row: any) => ({
            id: row.id,
            title: row.title,
            category: row.category,
            categoryLabel: row.category_label,
            size: row.size,
            material: row.material,
            client: row.client,
            description: row.description,
            imageSrc: row.image_src || undefined,
            colorScheme: row.color_scheme,
            accentBg: row.accent_bg,
            createdAt: row.created_at,
          }));
          setPortfolio(formattedPortfolio);
          localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(formattedPortfolio));
          loadedFromSupabase = true;
        }

        // 2. Fetch Shop Settings from Supabase
        const { data: settingsData, error: settingsError } = await supabase
          .from("shop_settings")
          .select("*")
          .eq("id", "ktd_main_settings")
          .single();

        if (!settingsError && settingsData) {
          const formattedSettings: ShopSettings = {
            whatsappNumber: settingsData.whatsapp_number,
            adminName: settingsData.admin_name,
            isOpenToday: settingsData.is_open_today,
            operatingHours: settingsData.operating_hours,
            workshopAddress: settingsData.workshop_address,
            instagramHandle: settingsData.instagram_handle,
            instagramUrl: settingsData.instagram_url,
            adminPin: settingsData.admin_pin,
          };
          setSettings(formattedSettings);
          localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(formattedSettings));
          loadedFromSupabase = true;
        }
      } catch (err) {
        console.warn("Supabase fetch error, using local storage fallback:", err);
      }
    }

    // Jika Supabase belum diset atau offline, muat dari localStorage
    if (!loadedFromSupabase) {
      try {
        const savedPortfolio = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
        const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);

        if (savedPortfolio) {
          setPortfolio(JSON.parse(savedPortfolio));
        }
        if (savedSettings) {
          setSettings({ ...INITIAL_SETTINGS, ...JSON.parse(savedSettings) });
        }
      } catch (e) {
        console.warn("Failed to load local data:", e);
      }
    }

    setIsSupabaseConnected(loadedFromSupabase);
    setIsLoaded(true);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Save to LocalStorage helper
  const syncLocalStorage = (items: PortfolioItem[], currentSettings: ShopSettings) => {
    try {
      localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(items));
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(currentSettings));
    } catch (e) {
      console.error("Failed to sync localStorage:", e);
    }
  };

  // 1. ADD PORTFOLIO ITEM
  const addPortfolioItem = async (item: Omit<PortfolioItem, "id">) => {
    const newItemId = "box-" + Date.now().toString();
    const newItem: PortfolioItem = {
      ...item,
      id: newItemId,
      createdAt: new Date().toISOString(),
    };

    const updatedList = [newItem, ...portfolio];
    setPortfolio(updatedList);
    syncLocalStorage(updatedList, settings);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from("portfolio_items").insert({
          id: newItem.id,
          title: newItem.title,
          category: newItem.category,
          category_label: newItem.categoryLabel,
          size: newItem.size,
          material: newItem.material,
          client: newItem.client,
          description: newItem.description,
          image_src: newItem.imageSrc || null,
          color_scheme: newItem.colorScheme,
          accent_bg: newItem.accentBg,
        });
      } catch (err) {
        console.error("Gagal simpan produk ke Supabase:", err);
      }
    }

    return newItem;
  };

  // 2. UPDATE PORTFOLIO ITEM
  const updatePortfolioItem = async (id: string, updated: Partial<PortfolioItem>) => {
    const updatedList = portfolio.map((item) =>
      item.id === id ? { ...item, ...updated } : item
    );
    setPortfolio(updatedList);
    syncLocalStorage(updatedList, settings);

    if (isSupabaseConfigured && supabase) {
      try {
        const payload: any = {};
        if (updated.title !== undefined) payload.title = updated.title;
        if (updated.category !== undefined) payload.category = updated.category;
        if (updated.categoryLabel !== undefined) payload.category_label = updated.categoryLabel;
        if (updated.size !== undefined) payload.size = updated.size;
        if (updated.material !== undefined) payload.material = updated.material;
        if (updated.client !== undefined) payload.client = updated.client;
        if (updated.description !== undefined) payload.description = updated.description;
        if (updated.imageSrc !== undefined) payload.image_src = updated.imageSrc || null;
        if (updated.colorScheme !== undefined) payload.color_scheme = updated.colorScheme;
        if (updated.accentBg !== undefined) payload.accent_bg = updated.accentBg;

        await supabase.from("portfolio_items").update(payload).eq("id", id);
      } catch (err) {
        console.error("Gagal update produk di Supabase:", err);
      }
    }
  };

  // 3. DELETE PORTFOLIO ITEM
  const deletePortfolioItem = async (id: string) => {
    const updatedList = portfolio.filter((item) => item.id !== id);
    setPortfolio(updatedList);
    syncLocalStorage(updatedList, settings);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from("portfolio_items").delete().eq("id", id);
      } catch (err) {
        console.error("Gagal hapus produk dari Supabase:", err);
      }
    }
  };

  // 4. UPDATE SHOP SETTINGS
  const updateSettingsHandler = async (newSettingsData: Partial<ShopSettings>) => {
    const updated = { ...settings, ...newSettingsData };
    setSettings(updated);
    syncLocalStorage(portfolio, updated);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from("shop_settings").upsert({
          id: "ktd_main_settings",
          whatsapp_number: updated.whatsappNumber,
          admin_name: updated.adminName,
          is_open_today: updated.isOpenToday,
          operating_hours: updated.operatingHours,
          workshop_address: updated.workshopAddress,
          instagram_handle: updated.instagramHandle,
          instagram_url: updated.instagramUrl,
          admin_pin: updated.adminPin,
          updated_at: new Date().toISOString(),
        });
      } catch (err) {
        console.error("Gagal update settings di Supabase:", err);
      }
    }
  };

  // 5. RESET TO DEFAULTS
  const resetToDefaults = async () => {
    setPortfolio(INITIAL_PORTFOLIO);
    setSettings(INITIAL_SETTINGS);
    syncLocalStorage(INITIAL_PORTFOLIO, INITIAL_SETTINGS);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from("portfolio_items").delete().neq("id", "0");
        for (const item of INITIAL_PORTFOLIO) {
          await supabase.from("portfolio_items").insert({
            id: item.id,
            title: item.title,
            category: item.category,
            category_label: item.categoryLabel,
            size: item.size,
            material: item.material,
            client: item.client,
            description: item.description,
            image_src: item.imageSrc || null,
            color_scheme: item.colorScheme,
            accent_bg: item.accentBg,
          });
        }
      } catch (err) {
        console.error("Gagal reset Supabase data:", err);
      }
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        settings,
        isLoaded,
        isSupabaseConnected,
        addPortfolioItem,
        updatePortfolioItem,
        deletePortfolioItem,
        updateSettings: updateSettingsHandler,
        resetToDefaults,
        refreshFromCloud: loadData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
