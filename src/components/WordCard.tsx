
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Volume, RefreshCw, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WordCardProps {
  word: Word;
  onNext: () => void;
  onPrevious: () => void;
  onMarkKnown: (wordId: string) => void;
  reviewMode?: boolean;
}

export interface Word {
  id: string;
  term: string;
  phonetic?: string;
  definitions: string[];
  chineseDefinitions?: string[]; // Add Chinese definitions
  examples: string[];
  imageUrl?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  knowLevel?: number; // 0-5, where 5 is completely memorized
  lastReviewedAt?: Date;
}

export const WordCard = ({ word, onNext, onPrevious, onMarkKnown, reviewMode = false }: WordCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [loadingImage, setLoadingImage] = useState(!!word.imageUrl);
  const [audioAvailable, setAudioAvailable] = useState(true);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const playAudio = () => {
    // In a real implementation, this would play the audio file
    console.log('Play audio for:', word.term);
    // TODO: Implement actual audio playback
  };

  const handleImageLoad = () => {
    setLoadingImage(false);
  };

  useEffect(() => {
    // Reset state when word changes
    setIsFlipped(false);
    setLoadingImage(!!word.imageUrl);
  }, [word]);

  return (
    <div className={cn("word-card card-shadow", isFlipped && "flipped")}>
      <div className="word-card-inner">
        {/* Front of card */}
        <div className="word-card-front glass rounded-3xl border border-border/50">
          <div className="flex justify-between items-center mb-8">
            <div className="text-sm font-medium text-muted-foreground">
              {word.level && (
                <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                  {word.level}
                </span>
              )}
            </div>
            <Button onClick={handleFlip} variant="ghost" size="icon" className="text-muted-foreground">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center space-y-6">
            <h1 className="text-5xl font-bold tracking-tight animate-fade-in">
              {word.term}
            </h1>
            {word.phonetic && (
              <div className="flex items-center space-x-2 animate-fade-in" style={{ animationDelay: '100ms' }}>
                <span className="phonetic">{word.phonetic}</span>
                {audioAvailable && (
                  <Button onClick={playAudio} variant="ghost" size="icon" className="rounded-full h-8 w-8">
                    <Volume className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}
          </div>

          <div className="mt-auto flex justify-between">
            <Button 
              onClick={onPrevious} 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button 
              onClick={handleFlip} 
              variant="ghost" 
              className="text-primary hover:text-primary/80"
            >
              Reveal
            </Button>
            <Button 
              onClick={onNext} 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Back of card */}
        <div className="word-card-back glass rounded-3xl border border-border/50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold tracking-tight">{word.term}</h3>
            <Button onClick={handleFlip} variant="ghost" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4 overflow-y-auto flex-1">
            {word.phonetic && (
              <div className="flex items-center space-x-2">
                <span className="phonetic">{word.phonetic}</span>
                {audioAvailable && (
                  <Button onClick={playAudio} variant="ghost" size="icon" className="rounded-full h-8 w-8">
                    <Volume className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Definitions</h4>
              <ul className="space-y-2">
                {word.definitions.map((def, index) => (
                  <li key={`def-${index}`} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                    {def}
                  </li>
                ))}
              </ul>
            </div>

            {word.chineseDefinitions && word.chineseDefinitions.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">中文释义</h4>
                <ul className="space-y-2">
                  {word.chineseDefinitions.map((def, index) => (
                    <li key={`cn-${index}`} className="animate-slide-up text-primary-foreground bg-primary px-3 py-2 rounded-lg" style={{ animationDelay: `${(index + word.definitions.length) * 100}ms` }}>
                      {def}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {word.examples.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Examples</h4>
                <ul className="space-y-2">
                  {word.examples.map((example, index) => (
                    <li key={`ex-${index}`} className="example-text animate-slide-up" style={{ animationDelay: `${(index + word.definitions.length + (word.chineseDefinitions?.length ||0)) * 100}ms` }}>
                      "{example}"
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {word.imageUrl && (
              <div className="mt-4 relative overflow-hidden rounded-lg aspect-video">
                {loadingImage && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <img 
                  src={word.imageUrl} 
                  alt={word.term} 
                  className="w-full h-full object-cover rounded-lg"
                  onLoad={handleImageLoad}
                />
              </div>
            )}
          </div>

          <div className="mt-4 flex justify-between">
            <Button 
              onClick={onPrevious} 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            {reviewMode && (
              <Button
                onClick={() => onMarkKnown(word.id)}
                variant="outline"
                className="text-green-600 border-green-200 hover:bg-green-50"
              >
                我认识这个词
              </Button>
            )}
            <Button 
              onClick={onNext} 
              variant="default" 
            >
              下一个
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

