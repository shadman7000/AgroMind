import type { ReactNode } from "react";
import { FarmShell } from "@/components/FarmShell";

export default function AppLayout({ children }: { children: ReactNode }) {
  return <FarmShell>{children}</FarmShell>;
}
