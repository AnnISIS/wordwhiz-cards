
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { WordCard, Word } from '@/components/WordCard';
import { MeaningQuestion, ExampleQuestion, WordCompletionQuestion } from '@/components/QuestionTypes';
import { ReviewProgress } from '@/components/ReviewProgress';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sampleWords, shuffleArray } from '@/utils/wordUtils';
import { Book, Play, BarChart, ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [reviewMode, setReviewMode] = useState<'browse' | 'quiz'>('browse');
  const [learnedWords, setLearnedWords] = useState<string[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [shuffledWords, setShuffledWords] = useState(() => shuffleArray(sampleWords));
  const { toast } = useToast();

  const currentWord = shuffledWords[currentWordIndex];
  const totalWords = shuffledWords.length;
  
  const handleNextWord = () => {
    if (currentWordIndex < totalWords - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      // Cycle back to first word when reaching the end
      setCurrentWordIndex(0);
      toast({
        title: "You've reviewed all words",
        description: "Starting from the beginning again",
      });
    }
  };
  
  const handlePreviousWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
    } else {
      // Cycle to last word when at the beginning
      setCurrentWordIndex(totalWords - 1);
    }
  };
  
  const handleMarkKnown = (wordId: string) => {
    if (!learnedWords.includes(wordId)) {
      setLearnedWords([...learnedWords, wordId]);
      toast({
        title: "Word marked as known",
        description: `${currentWord.term} has been added to your learned words.`,
      });
    }
    handleNextWord();
  };
  
  const handleCorrectAnswer = () => {
    setCorrectAnswers(correctAnswers + 1);
    if (!learnedWords.includes(currentWord.id)) {
      setLearnedWords([...learnedWords, currentWord.id]);
    }
  };
  
  const handleIncorrectAnswer = () => {
    // Could implement logic to mark this word for extra review
  };
  
  // Determine which question type to show based on the word index
  const getQuestionComponent = () => {
    // Rotate through question types based on index
    const questionType = currentWordIndex % 3;
    
    switch (questionType) {
      case 0:
        return (
          <MeaningQuestion
            word={currentWord}
            onCorrect={handleCorrectAnswer}
            onIncorrect={handleIncorrectAnswer}
            onNext={handleNextWord}
          />
        );
      case 1:
        return (
          <ExampleQuestion
            word={currentWord}
            onCorrect={handleCorrectAnswer}
            onIncorrect={handleIncorrectAnswer}
            onNext={handleNextWord}
          />
        );
      case 2:
        return (
          <WordCompletionQuestion
            word={currentWord}
            onCorrect={handleCorrectAnswer}
            onIncorrect={handleIncorrectAnswer}
            onNext={handleNextWord}
          />
        );
      default:
        return (
          <MeaningQuestion
            word={currentWord}
            onCorrect={handleCorrectAnswer}
            onIncorrect={handleIncorrectAnswer}
            onNext={handleNextWord}
          />
        );
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left sidebar - on smaller screens, this appears above the content */}
          <div className="md:col-span-1 space-y-6">
            <div className="glass dark:glass-dark rounded-2xl border border-border/40 p-6 card-shadow">
              <h2 className="text-2xl font-bold mb-4">WordWhiz</h2>
              <p className="text-muted-foreground mb-6">Expand your vocabulary through spaced repetition and interactive quizzes.</p>
              
              <div className="space-y-4">
                <Button 
                  variant={reviewMode === 'browse' ? 'default' : 'outline'} 
                  className="w-full justify-start"
                  onClick={() => setReviewMode('browse')}
                >
                  <Book className="mr-2 h-4 w-4" />
                  Browse Words
                </Button>
                
                <Button 
                  variant={reviewMode === 'quiz' ? 'default' : 'outline'} 
                  className="w-full justify-start"
                  onClick={() => setReviewMode('quiz')}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Practice Quiz
                </Button>
                
                <Button variant="outline" className="w-full justify-start" onClick={() => window.location.href = '/word-lists'}>
                  <BarChart className="mr-2 h-4 w-4" />
                  Word Lists
                </Button>
              </div>
            </div>
            
            <ReviewProgress 
              totalWords={totalWords} 
              reviewedWords={learnedWords.length} 
              correctAnswers={correctAnswers}
            />
          </div>
          
          {/* Main content area */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">
                {reviewMode === 'browse' ? 'Review Words' : 'Quiz Mode'}
              </h1>
              <p className="text-muted-foreground">
                {reviewMode === 'browse' 
                  ? 'Browse through words to memorize their meaning and usage.' 
                  : 'Test your knowledge with different question types.'}
              </p>
            </div>
            
            <div className="flex justify-center">
              {reviewMode === 'browse' ? (
                <div className="w-full max-w-md">
                  <WordCard 
                    word={currentWord}
                    onNext={handleNextWord}
                    onPrevious={handlePreviousWord}
                    onMarkKnown={handleMarkKnown}
                    reviewMode={true}
                  />
                </div>
              ) : (
                <div className="w-full max-w-md glass dark:glass-dark rounded-2xl border border-border/40 p-6 card-shadow">
                  {getQuestionComponent()}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
