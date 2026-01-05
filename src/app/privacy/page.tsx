import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Local Media Tools',
  description: 'Privacy policy for Local Media Tools. We process all videos locally in your browser via WebAssembly. Your files are NEVER uploaded to our servers.',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-lg prose-gray max-w-none">
        <p className="lead">
          This Privacy Policy describes how Local Media Tools (<strong>https://local-media-tools.com</strong>) handles information when you use our video compression service.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          <strong>Local Media Tools</strong> is designed with privacy as a core principle. We do not collect, store, or transmit your video files. All processing occurs directly in your browser using WebAssembly technology. As a result:
        </p>
        <ul>
          <li>Your video files <strong>never leave your device</strong>.</li>
          <li>We do not have access to your content.</li>
          <li>No video data is uploaded to our servers.</li>
        </ul>

        <h2>2. Data Handling</h2>
        <p>
          <strong className="font-bold">We process all videos locally in your browser via WebAssembly. Your files are NEVER uploaded to our servers.</strong> This means you retain full ownership and control of your media at all times.
        </p>

        <h2>3. Cookies</h2>
        <p>
          We use cookies for analytics (Google Analytics) and advertisements (Google AdSense). These cookies help us understand how visitors interact with our site and enable us to serve relevant advertisements. You can control cookie settings through your browser preferences.
        </p>

        <h2>4. Third‑Party Services</h2>
        <p>
          We integrate with Google Analytics and Google AdSense. These services may collect anonymized usage data in accordance with their respective privacy policies. We do not share personal information with third parties beyond what is necessary for these services to function.
        </p>

        <h2>5. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The most current version will always be posted on this page with an updated effective date.
        </p>

        <h2>6. Contact</h2>
        <p>
          If you have any questions about this Privacy Policy, you can contact us via the GitHub repository linked in the site footer.
        </p>

        <p className="text-sm text-gray-500 mt-12">
          <strong>Effective Date:</strong> January 5, 2026
        </p>
      </div>
    </div>
  );
}