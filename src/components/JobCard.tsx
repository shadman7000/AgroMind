"use client";

import { motion } from "framer-motion";
import { JobIcon } from "@/components/JobIcon";
import { staggerItem } from "@/lib/motion";
import type { TodayJob } from "@/mocks/types";

const priorityClass: Record<TodayJob["priority"], string> = {
  high: "bg-[rgba(200,62,43,0.12)] text-[var(--vermilion)] border border-[var(--vermilion)]",
  medium: "bg-[rgba(35,79,50,0.1)] text-[var(--leaf-deep)] border border-[var(--leaf)]",
  low: "bg-[rgba(22,21,20,0.05)] text-[var(--soil)] border border-[rgba(22,21,20,0.25)]",
};

export function JobCard({ job }: { job: TodayJob }) {
  return (
    <motion.article
      variants={staggerItem}
      className="panel flex items-start gap-4 p-5"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[var(--ink)] bg-[rgba(35,79,50,0.1)] text-[var(--leaf-deep)]">
        <JobIcon kind={job.icon} />
      </div>
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="display text-lg text-[var(--ink)]">{job.title}</h3>
          <span
            className={`px-2.5 py-0.5 font-[family-name:var(--font-mono)] text-[0.65rem] font-bold uppercase tracking-wide ${priorityClass[job.priority]}`}
          >
            {job.priority}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-[var(--muted)]">{job.detail}</p>
        <p className="mono-label text-[var(--soil)]">{job.fieldName}</p>
      </div>
    </motion.article>
  );
}
