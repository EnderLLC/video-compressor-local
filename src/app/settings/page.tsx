"use client";

import { useSettings } from "@/hooks/use-settings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
    const { settings, updateSettings, loaded } = useSettings();

    if (!loaded) return null;

    return (
        <div className="container mx-auto py-10 px-4 max-w-2xl">
            <h1 className="text-3xl font-bold mb-8">Settings</h1>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>General</CardTitle>
                        <CardDescription>Manage your global preferences.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Default Export Format</Label>
                                <p className="text-sm text-gray-500">
                                    Select the format to be selected by default when converting videos.
                                </p>
                            </div>
                            <select
                                className="p-2 border rounded-md bg-white dark:bg-gray-800"
                                value={settings.defaultFormat}
                                onChange={(e) => updateSettings({ defaultFormat: e.target.value })}
                            >
                                <option value="mp4">MP4</option>
                                <option value="mov">MOV</option>
                                <option value="avi">AVI</option>
                                <option value="mkv">MKV</option>
                                <option value="webm">WebM</option>
                                <option value="mp3">MP3</option>
                                <option value="gif">GIF</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Notifications</Label>
                                <p className="text-sm text-gray-500">
                                    Show browser notifications when a long process completes.
                                </p>
                            </div>
                            <Switch
                                checked={settings.notifications}
                                onCheckedChange={(checked: boolean) => updateSettings({ notifications: checked })}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Storage</CardTitle>
                        <CardDescription>Manage local storage usage.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-gray-500">
                            FFmpeg binaries are cached locally to work offline.
                            Calculated cache size: ~30MB.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
