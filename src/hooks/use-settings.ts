"use client";

import { useState, useEffect, useCallback } from "react";

export interface UserSettings {
    defaultFormat: string;
    theme: "light" | "dark" | "system";
    notifications: boolean;
}

const DEFAULT_SETTINGS: UserSettings = {
    defaultFormat: "mp4",
    theme: "system",
    notifications: true,
};

export function useSettings() {
    const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("user_settings");
        if (stored) {
            try {
                setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(stored) });
            } catch (e) {
                console.error("Failed to parse settings", e);
            }
        }
        setLoaded(true);
    }, []);

    const updateSettings = useCallback((newSettings: Partial<UserSettings>) => {
        setSettings((prev) => {
            const updated = { ...prev, ...newSettings };
            localStorage.setItem("user_settings", JSON.stringify(updated));
            return updated;
        });
    }, []);

    return { settings, updateSettings, loaded };
}
