
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function TermsPage() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
           <SidebarTrigger className="md:hidden" />
          <h1 className="font-headline text-2xl md:text-3xl font-bold tracking-tight">
            Terms of Service
          </h1>
        </div>
      </header>
      <Card className="transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
        <CardHeader>
          <CardTitle>Agreement to Terms</CardTitle>
          <CardDescription>Please read these Terms of Service carefully before using our service.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            By accessing or using AstroScope (the "Service"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the Service.
          </p>
          <h3 className="font-semibold text-foreground pt-2">1. Use of Service</h3>
          <p>
            AstroScope is provided for informational and educational purposes only. The data provided through the Service is sourced from third-party APIs (such as NASA and Celestrak) and is provided "as is". We do not guarantee the accuracy, completeness, or timeliness of the information. You agree to use the data responsibly and not for any purpose that is unlawful or prohibited by these Terms.
          </p>
          <h3 className="font-semibold text-foreground pt-2">2. Intellectual Property</h3>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property of AstroScope and its licensors. The Service is protected by copyright, trademark, and other laws. Data from NASA is generally in the public domain, but you should verify the specific usage rights for any data you use.
          </p>
           <h3 className="font-semibold text-foreground pt-2">3. Disclaimer of Warranty</h3>
          <p>
            The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance. AstroScope does not warrant that the service will function uninterrupted, secure, or available at any particular time or location.
          </p>
          <h3 className="font-semibold text-foreground pt-2">4. Limitation of Liability</h3>
          <p>
            In no event shall AstroScope, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </p>
           <h3 className="font-semibold text-foreground pt-2">5. Changes to Terms</h3>
           <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms of Service on this page.
           </p>
        </CardContent>
      </Card>
    </div>
  );
}
