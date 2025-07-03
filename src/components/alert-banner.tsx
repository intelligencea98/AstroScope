import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert } from "lucide-react";

export default function AlertBanner() {
  return (
    <Alert variant="destructive" className="bg-destructive/10 animate-in fade-in slide-in-from-top-2 duration-500">
      <ShieldAlert className="h-5 w-5" />
      <AlertTitle className="font-headline text-lg dark:text-destructive-foreground">High-Risk Alert!</AlertTitle>
      <AlertDescription className="text-destructive/90 dark:text-destructive-foreground/90">
        A high-energy solar flare is projected to intersect with a high-density debris field. Potential impact on LEO satellites.
      </AlertDescription>
    </Alert>
  );
}
