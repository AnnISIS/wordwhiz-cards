
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sampleWords } from '@/utils/wordUtils';
import { VolumeUp, BookOpen, ArrowRight, Search, Filter } from 'lucide-react';

const WordList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentLevel, setCurrentLevel] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  
  // Filter words based on search term and level
  const filteredWords = sampleWords.filter(word => {
    const matchesSearch = searchTerm === '' || 
      word.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
      word.definitions.some(def => def.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLevel = currentLevel === 'all' || word.level === currentLevel;
    
    return matchesSearch && matchesLevel;
  });
  
  const playAudio = (word: string) => {
    console.log('Play audio for:', word);
    // TODO: Implement actual audio playback
  };
  
  const totalBeginner = sampleWords.filter(w => w.level === 'beginner').length;
  const totalIntermediate = sampleWords.filter(w => w.level === 'intermediate').length;
  const totalAdvanced = sampleWords.filter(w => w.level === 'advanced').length;
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold">Word Lists</h1>
          <p className="text-muted-foreground">Browse and search through all available words.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div 
            className="glass dark:glass-dark rounded-2xl border border-border/40 p-6 transition-all duration-200 hover:shadow-md card-shadow"
            onClick={() => setCurrentLevel('all')}
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">All Words</h3>
              <div className="text-3xl font-bold">{sampleWords.length}</div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">All vocabulary words</div>
          </div>
          
          <div 
            className="glass dark:glass-dark rounded-2xl border border-border/40 p-6 transition-all duration-200 hover:shadow-md card-shadow"
            onClick={() => setCurrentLevel('beginner')}
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">Beginner</h3>
              <div className="text-3xl font-bold">{totalBeginner}</div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">Common everyday words</div>
          </div>
          
          <div 
            className="glass dark:glass-dark rounded-2xl border border-border/40 p-6 transition-all duration-200 hover:shadow-md card-shadow"
            onClick={() => setCurrentLevel('intermediate')}
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">Intermediate</h3>
              <div className="text-3xl font-bold">{totalIntermediate}</div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">More advanced vocabulary</div>
          </div>
          
          <div 
            className="glass dark:glass-dark rounded-2xl border border-border/40 p-6 transition-all duration-200 hover:shadow-md card-shadow"
            onClick={() => setCurrentLevel('advanced')}
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">Advanced</h3>
              <div className="text-3xl font-bold">{totalAdvanced}</div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">Sophisticated vocabulary</div>
          </div>
        </div>
        
        <div className="glass dark:glass-dark rounded-2xl border border-border/40 p-6 mb-8 card-shadow">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search words..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" className="flex gap-2">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-muted-foreground px-4">
              <span>Word</span>
              <span>Actions</span>
            </div>
            
            {filteredWords.length > 0 ? (
              <div className="space-y-2">
                {filteredWords.map((word) => (
                  <div 
                    key={word.id}
                    className="flex justify-between items-center p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors duration-200"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{word.term}</h3>
                        {word.level && (
                          <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                            {word.level}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate max-w-md">
                        {word.definitions[0]}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {word.phonetic && (
                        <Button onClick={() => playAudio(word.term)} variant="ghost" size="icon" className="rounded-full">
                          <VolumeUp className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="rounded-full" onClick={() => window.location.href = '/'}>
                        <BookOpen className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No words found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default WordList;
