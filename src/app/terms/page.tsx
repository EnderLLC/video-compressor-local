import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Local Media Tools',
  description: 'Terms of Service for Local Media Tools. By using our service, you agree to these terms.',
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <div className="prose prose-lg prose-gray max-w-none">
        <p className="lead">
          Welcome to <strong>Local Media Tools</strong> (<strong>https://local-media-tools.com</strong>). By accessing or using our video compression service, you agree to be bound by these Terms of Service.
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By using the Local Media Tools website, you acknowledge that you have read, understood, and agree to these Terms. If you do not agree, please do not use the service.
        </p>

        <h2>2. Service Description</h2>
        <p>
          Local Media Tools provides a browser‑based video compression tool that processes videos locally on your device using WebAssembly. No video data is uploaded to our servers; all processing occurs within your browser.
        </p>

        <h2>3. User Responsibilities</h2>
        <ul>
          <li>You are solely responsible for the content you compress.</li>
          <li>You must not use the service for any illegal, harmful, or infringing activities.</li>
          <li>You agree not to attempt to disrupt or overload the service.</li>
        </ul>

        <h2>4. Intellectual Property</h2>
        <p>
          The Local Media Tools software, branding, and website content are owned by Local Media Tools. You retain all rights to your uploaded video files. By using the service, you grant us no ownership or license to your content.
        </p>

        <h2>5. Disclaimer of Warranties</h2>
        <p>
          The service is provided <strong>"as is"</strong> without warranties of any kind, express or implied. We do not guarantee that the service will be error‑free, uninterrupted, or meet your specific requirements.
        </p>

        <h2>6. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, Local Media Tools shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of the service.
        </p>

        <h2>7. Privacy</h2>
        <p>
          Your privacy is important to us. Please review our <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a> for details on how we handle information.
        </p>

        <h2>8. Cookies</h2>
        <p>
          We use cookies for analytics (Google Analytics) and advertisements (Google AdSense). By using the site, you consent to the use of cookies as described in our Privacy Policy.
        </p>

        <h2>9. Changes to Terms</h2>
        <p>
          We may update these Terms of Service at any time. The updated version will be posted on this page with a new effective date. Continued use of the service after changes constitutes acceptance of the new Terms.
        </p>

        <h2>10. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the Republic of Turkey, without regard to its conflict‑of‑law principles.
        </p>

        <h2>11. Contact</h2>
        <p>
          If you have questions about these Terms, please contact us via the GitHub repository linked in the site footer.
        </p>

        <p className="text-sm text-gray-500 mt-12">
          <strong>Effective Date:</strong> January 5, 2026
        </p>
      </div>
    </div>
  );
}