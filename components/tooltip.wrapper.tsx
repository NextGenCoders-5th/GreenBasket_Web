import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
  } from "@/components/ui/tooltip";
import React from "react";
  interface Props{
    children: React.ReactNode
    title: string
    arroClassName?: string
    className?: string
  }
  
  export function TooltipWrapper({ children, title, arroClassName, className}: Props) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent
         className={className}
          side="top"
          sideOffset={5}
          arrowClassName={arroClassName}
         >
          {title}
        </TooltipContent>
      </Tooltip>
    );
  }
  