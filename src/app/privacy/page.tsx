
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function PrivacyPage() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
           <SidebarTrigger className="md:hidden" />
          <h1 className="font-headline text-2xl md:text-3xl font-bold tracking-tight">
            Privacy Policy
          </h1>
        </div>
      </header>
      <Card className="transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
        <CardHeader>
          <CardTitle>Your Privacy Matters</CardTitle>
          <CardDescription>How we handle your data at AstroScope.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
          </p>
          <h3 className="font-semibold text-foreground pt-2">1. Information Collection and Use</h3>
          <p>
            AstroScope is designed to be a privacy-respecting application. We do not require user accounts, and we do not collect personally identifiable information (PII) such as your name, email address, or location. Your interactions with the AI tools may be processed by our AI provider (Google Cloud) to generate responses, but this data is not stored or associated with you.
          </p>
          <h3 className="font-semibold text-foreground pt-2">2. Cookies and Local Storage</h3>
          <p>
            We may use cookies or local storage for essential application functionality, such as remembering your display settings or sidebar state. These are not used for tracking purposes.
          </p>
           <h3 className="font-semibold text-foreground pt-2">3. Third-Party Services</h3>
          <p>
            This application uses APIs from third parties, including NASA and Celestrak. When you use a tool that interacts with these APIs, your requests may be sent to them. We recommend reviewing their respective privacy policies for information on how they handle data.
          </p>
          <h3 className="font-semibold text-foreground pt-2">4. Data Security</h3>
          <p>
            We take reasonable measures to protect the information that we process. However, no security system is impenetrable, and we cannot guarantee the security of our systems 100%.
          </p>
           <h3 className="font-semibold text-foreground pt-2">5. Changes to This Privacy Policy</h3>
           <p>
            We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.
           </p>
        </CardContent>
      </Card>
    </div>
  );
}
