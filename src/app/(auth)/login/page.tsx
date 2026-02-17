import { LoginForm } from "@/features/auth/components/login-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-6">
      <Alert className="max-w-md w-full border-primary/50 bg-card">
        <InfoIcon className="size-4" />
        <AlertTitle>Sign in required</AlertTitle>
        <AlertDescription>
          Please sign in to your account to access your workflows and continue.
        </AlertDescription>
      </Alert>
      <LoginForm />
    </div>
  );
};

export default Page;