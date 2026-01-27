import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
const Page = async () => {
  const users = await prisma.user.findMany();
  return (
    <>
    <div className={cn("text-3xl font-bold underline")}>Page</div>
    <Button>Click me</Button>
    {JSON.stringify(users)}
    </>
  );
};

export default Page;