
import React from 'react';
import { cn } from '@/lib/utils';

interface ReviewProgressProps {
  totalWords: number;
  reviewedWords: number;
  correctAnswers: number;
}

export const ReviewProgress = ({ totalWords, reviewedWords, correctAnswers }: ReviewProgressProps) => {
  const percentage = totalWords > 0 ? Math.round((reviewedWords / totalWords) * 100) : 0;
  const accuracy = reviewedWords > 0 ? Math.round((correctAnswers / reviewedWords) * 100) : 0;

  return (
    <div className="glass dark:glass-dark rounded-2xl border border-border/40 p-4">
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Progress</h3>
        
        <div className="relative pt-1">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-primary">{percentage}%</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-medium text-muted-foreground">
                {reviewedWords} of {totalWords} words
              </span>
            </div>
          </div>
          <div className="mt-2 overflow-hidden h-2 text-xs flex rounded-full bg-secondary">
            <div
              style={{ width: `${percentage}%` }}
              className="bg-primary transition-all duration-500 ease-out rounded-full"
            ></div>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">{reviewedWords}</span>
            <span className="text-xs text-muted-foreground">Reviewed</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="relative inline-flex">
              <svg className="w-16 h-16" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-secondary"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="100"
                  strokeDashoffset={100 - accuracy}
                  className="text-primary"
                  transform="rotate(-90 18 18)"
                />
              </svg>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <span className="text-xl font-bold">{accuracy}%</span>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">Accuracy</span>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">{totalWords - reviewedWords}</span>
            <span className="text-xs text-muted-foreground">Remaining</span>
          </div>
        </div>
      </div>
    </div>
  );
};
