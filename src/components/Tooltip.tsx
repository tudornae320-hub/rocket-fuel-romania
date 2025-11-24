import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DictionaryTooltipProps {
  word: string;
  definition: string;
  children: React.ReactNode;
}

export const DictionaryTooltip = ({ word, definition, children }: DictionaryTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <span className="underline decoration-dashed decoration-primary cursor-help">
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs bg-card border-primary/20">
          <p className="font-semibold text-primary mb-1">{word}</p>
          <p className="text-sm">{definition}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
