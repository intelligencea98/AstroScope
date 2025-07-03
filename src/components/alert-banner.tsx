import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert } from "lucide-react";

export default function AlertBanner() {
  return (
    <Alert className="bg-accent/10 border-accent/50 text-accent-foreground">
      <ShieldAlert className="h-5 w-5 !text-accent" />
      <AlertTitle className="font-headline text-lg text-accent">High-Risk Alert!</AlertTitle>
      <AlertDescription className="text-foreground/80">
        A high-energy solar flare is projected to intersect with a high-density debris field. Potential impact on LEO satellites.
      </AlertDescription>
    </Alert>
  );
}
