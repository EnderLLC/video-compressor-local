import VideoAdjuster from "@/components/features/video-adjuster";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
    title: "Adjust Video - Local Media Tools",
    description: "Adjust video brightness, contrast, saturation, and gamma locally in your browser.",
};

export default function AdjustVideoPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                        Adjust Video
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                        Fine-tune your video's look. Correct lighting, enhance colors, or add style—all privately on your device.
                    </p>
                </div>

                <VideoAdjuster />

                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Brightness & Contrast</CardTitle>
                            <CardDescription>Fix lighting issues</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Brighten underexposed videos or increase contrast to make colors pop.
                                Useful for older recordings or bad lighting conditions.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Saturation & Gamma</CardTitle>
                            <CardDescription>Color correction</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Boost saturation for vibrant colors or adjust gamma to correct the overall luminance without washing out the image.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
