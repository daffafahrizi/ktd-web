"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  PortfolioItem,
  ShopSettings,
  INITIAL_PORTFOLIO,
  INITIAL_SETTINGS,
} from "@/data/initialData";

const PORTFOLIO_STORAGE_KEY = "ktd_portfolio_data_v1";
const SETTINGS_STORAGE_KEY = "ktd_settings_data_v1";

type PortfolioContextType = {
  portfolio: PortfolioItem[];
  settings: ShopSettings;
  isLoaded: boolean;
  addPortfolioItem: (item: Omit<PortfolioItem, "id">) => PortfolioItem;
  updatePortfolioItem: (id: string, updated: Partial<PortfolioItem>) => void;
  deletePortfolioItem: (id: string) => void;
  updateSettings: (newSettings: Partial<ShopSettings>) => void;
  resetToDefaults: () => void;
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined
);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(INITIAL_PORTFOLIO);
  const [settings, setSettings] = useState<ShopSettings>(INITIAL_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
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
      console.warn("Failed to load data from localStorage:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage when state changes
  const savePortfolio = (items: PortfolioItem[]) => {
    setPortfolio(items);
    try {
      localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save portfolio:", e);
    }
  };

  const saveSettings = (newSettings: ShopSettings) => {
    setSettings(newSettings);
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));
    } catch (e) {
      console.error("Failed to save settings:", e);
    }
  };

  const addPortfolioItem = (item: Omit<PortfolioItem, "id">) => {
    const newItem: PortfolioItem = {
      ...item,
      id: "box-" + Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const updatedList = [newItem, ...portfolio];
    savePortfolio(updatedList);
    return newItem;
  };

  const updatePortfolioItem = (id: string, updated: Partial<PortfolioItem>) => {
    const updatedList = portfolio.map((item) =>
      item.id === id ? { ...item, ...updated } : item
    );
    savePortfolio(updatedList);
  };

  const deletePortfolioItem = (id: string) => {
    const updatedList = portfolio.filter((item) => item.id !== id);
    savePortfolio(updatedList);
  };

  const updateSettingsHandler = (newSettingsData: Partial<ShopSettings>) => {
    const updated = { ...settings, ...newSettingsData };
    saveSettings(updated);
  };

  const resetToDefaults = () => {
    savePortfolio(INITIAL_PORTFOLIO);
    saveSettings(INITIAL_SETTINGS);
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        settings,
        isLoaded,
        addPortfolioItem,
        updatePortfolioItem,
        deletePortfolioItem,
        updateSettings: updateSettingsHandler,
        resetToDefaults,
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
