import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * 21st.dev inspired Timeline component
 * Provides connected vertical rails with glowing milestone nodes
 * and card content containers for accomplishments.
 */
export function Timeline({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "relative flex flex-col space-y-8 before:absolute before:inset-0 before:left-5 md:before:left-6 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-amber-400/80 before:via-violet-500/60 before:to-pink-500/30",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function TimelineItem({ className, children, ...props }) {
  return (
    <div
      className={cn("relative flex items-start gap-4 md:gap-6 group", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function TimelineIcon({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "relative z-10 flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-xl bg-[#0d0718] border border-violet-500/30 text-violet-300 shadow-[0_0_15px_rgba(139,92,246,0.3)] group-hover:scale-105 transition-transform",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function TimelineContent({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "flex-1 rounded-xl bg-[#130b24]/75 border border-violet-500/20 p-5 md:p-6 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all hover:border-violet-400/40",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
