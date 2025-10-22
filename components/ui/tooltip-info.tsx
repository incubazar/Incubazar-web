'use client'

import * as React from 'react'
import { HelpCircle } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface TooltipInfoProps {
  content: string | React.ReactNode
  className?: string
}

export function TooltipInfo({ content, className }: TooltipInfoProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <button
            type="button"
            className={`inline-flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors ${className}`}
          >
            <HelpCircle className="h-4 w-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="text-sm">{content}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

interface LabelWithTooltipProps {
  label: string
  tooltip: string | React.ReactNode
  required?: boolean
  htmlFor?: string
}

export function LabelWithTooltip({ label, tooltip, required, htmlFor }: LabelWithTooltipProps) {
  return (
    <label 
      htmlFor={htmlFor}
      className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-1"
    >
      <span>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </span>
      <TooltipInfo content={tooltip} />
    </label>
  )
}


