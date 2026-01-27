import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <>
    <div className={cn("text-3xl font-bold underline")}>Page</div>
    <Button>Click me</Button>
    </>
  );
};

export default Page;