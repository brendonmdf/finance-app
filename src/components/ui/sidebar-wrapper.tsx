"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SidebarWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function SidebarWrapper({ children, className, ...props }: SidebarWrapperProps) {
  return (
    <div
      className={cn(
        "group/sidebar-wrapper flex h-full w-full flex-col",
        className
      )}
      data-collapsible="icon"
      {...props}
    >
      {children}
    </div>
  )
}
