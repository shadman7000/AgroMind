"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DemoBadge } from "@/components/DemoBadge";
import { farm } from "@/mocks";

export default function LoginPage() {
  return (
    <div className="login-screen relative flex min-h-screen items-center justify-center px-4 py-12">
      <motion.div
        className="panel w-full max-w-xl overflow-hidden"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="field-plot h-36 w-full" aria-hidden />
        <div className="space-y-6 p-8 sm:p-10">
          <DemoBadge />
          <div className="space-y-3">
            <p className="mono-label text-[var(--vermilion)]">Field Decision Helper</p>
            <h1 className="display text-4xl text-[var(--ink)] sm:text-5xl">AgroMind</h1>
            <p className="max-w-md text-base leading-relaxed text-[var(--muted)]">
              A calm helper for daily farm decisions — soil, weather, costs, and a clear plan you can
              accept or reject.
            </p>
          </div>

          <div className="border border-[var(--ink)] bg-[var(--parchment)] px-4 py-3 text-sm text-[var(--leaf-deep)]">
            Demo farm: <strong>{farm.name}</strong> · {farm.location}
          </div>

          <Link href="/today" className="btn btn-primary w-full sm:w-auto">
            Continue with Google
          </Link>
          <p className="text-xs text-[var(--muted)]">
            Google sign-in is mocked in this build — wire real auth when connecting the backend.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
