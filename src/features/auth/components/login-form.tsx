"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

import { Github } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isPending = form.formState.isSubmitting;

  // Email Login
  const onSubmit = async (values: LoginFormValues) => {
    const { data, error } = await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
        callbackURL: "/",
      },
      {
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      }
    );

    if (data && !error) {
      window.location.href = "/";
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  // GitHub Login
  const handleGithubLogin = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">
            Welcome back 👋
          </CardTitle>
          <CardDescription>
            Sign in to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {/* OAuth Buttons */}
              <div className="space-y-3">
                {/* Google */}
                <Button
                  variant="outline"
                  className="w-full h-11 flex items-center justify-center gap-3 font-medium transition hover:shadow-md"
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isPending}
                >
                  <span className="flex items-center justify-center w-5 h-5">
                    <FcGoogle className="w-5 h-5" />
                  </span>
                  Continue with Google
                </Button>

                {/* GitHub */}
                <Button
                  variant="outline"
                  className="w-full h-11 flex items-center justify-center gap-3 font-medium transition hover:shadow-md"
                  type="button"
                  onClick={handleGithubLogin}
                  disabled={isPending}
                >
                  <span className="flex items-center justify-center w-5 h-5">
                    <Github className="w-5 h-5" />
                  </span>
                  Continue with GitHub
                </Button>
              </div>

              {/* Divider */}
              <div className="relative text-center text-sm">
                <span className="bg-background px-2 relative z-10 text-muted-foreground">
                  OR CONTINUE WITH EMAIL
                </span>
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
              </div>

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="and@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-11 font-medium"
                disabled={isPending}
              >
                {isPending ? "Signing in..." : "Login"}
              </Button>

              {/* Register */}
              <p className="text-center text-sm text-muted-foreground">
                Don’t have an account?{" "}
                <Link
                  href="/register"
                  className="text-primary font-medium hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
