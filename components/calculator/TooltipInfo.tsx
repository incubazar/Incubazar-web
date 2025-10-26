"use client"

import { Info } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface TooltipInfoProps {
  term: string
  definition: string
  benchmark?: string
  example?: string
}

export function TooltipInfo({ term, definition, benchmark, example }: TooltipInfoProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <button className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <Info className="h-4 w-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs" side="right">
          <div className="space-y-2">
            <div>
              <p className="font-semibold">{term}</p>
              <p className="text-sm text-muted-foreground">{definition}</p>
            </div>
            {benchmark && (
              <div>
                <p className="text-xs font-semibold">Benchmark:</p>
                <p className="text-xs text-muted-foreground">{benchmark}</p>
              </div>
            )}
            {example && (
              <div>
                <p className="text-xs font-semibold">Example:</p>
                <p className="text-xs text-muted-foreground">{example}</p>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
