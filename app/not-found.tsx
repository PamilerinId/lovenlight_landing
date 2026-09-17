import Link from "next/link";

import { Button } from "@/components/ui/button";
import { org } from "@/content/site";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col items-start justify-center gap-6 px-page py-24">
      <p className="eyebrow text-green">{org.name}</p>
      <h1 className="text-[clamp(36px,3.6vw,52px)] leading-[1.08] font-medium tracking-[-0.03em] text-ink">
        Page not found
      </h1>
      <p className="max-w-[560px] text-lg leading-[1.6] text-body">
        The page you are looking for does not exist.
      </p>
      <Button asChild variant="primary" size="primary">
        <Link href="/">Back to the homepage</Link>
      </Button>
    </main>
  );
}
