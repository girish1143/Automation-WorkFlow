"use client";
import { LogoutButton } from "@/components/logout-button";
import { requireAuth } from "@/lib/auth-utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "./api/trpc/client";
import { Button } from "@/components/ui/button";

export default async function Page() {
  requireAuth();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());
  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess: () => {
      // Pass an object with queryKey to invalidateQueries, as required by Tanstack Query
      queryClient.invalidateQueries({ queryKey: trpc.getWorkflows.queryKey() });
    }
  }));
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      Protected server-side page
      <div>{JSON.stringify(data)}</div>
      <Button disabled={create.isPending} onClick={() => create.mutate()}>Create Workflow</Button>
      <LogoutButton></LogoutButton>
    </div>
  );
}