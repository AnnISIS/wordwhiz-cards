
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { Word } from './WordCard';
import { Check, X } from 'lucide-react';

interface QuestionProps {
  word: Word;
  onCorrect: () => void;
  onIncorrect: () => void;
  onNext: () => void;
}

// Question Type 1: Choose the correct meaning
export const MeaningQuestion = ({ word, onCorrect, onIncorrect, onNext }: QuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [correctIndex, setCorrectIndex] = useState<number>(0);

  useEffect(() => {
    // Reset state when word changes
    setSelectedOption(null);
    setShowFeedback(false);
    
    // Generate options (in a real app, these would come from a larger set of words)
    // For now, we'll use the first definition as correct and add fake options
    const allOptions = [
      word.definitions[0],
      "An incorrect definition of the word.",
      "Another wrong definition for testing.",
      "One more definition that is not correct."
    ];
    
    // Shuffle the options
    const shuffled = [...allOptions].sort(() => 0.5 - Math.random()).slice(0, 4);
    
    // Make sure the correct option is included
    if (!shuffled.includes(word.definitions[0])) {
      shuffled[0] = word.definitions[0];
    }
    
    setOptions(shuffled);
    setCorrectIndex(shuffled.indexOf(word.definitions[0]));
  }, [word]);

  const handleSelect = (index: number) => {
    if (showFeedback) return; // Prevent selection after answer is revealed
    
    setSelectedOption(index);
    setShowFeedback(true);
    
    if (index === correctIndex) {
      onCorrect();
    } else {
      onIncorrect();
    }
    
    // Move to next question after a delay
    setTimeout(() => {
      onNext();
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-medium">Select the correct meaning</h2>
        <h1 className="text-4xl font-bold">{word.term}</h1>
        {word.phonetic && <p className="phonetic text-center">{word.phonetic}</p>}
      </div>
      
      <div className="grid grid-cols-1 gap-3 mt-8">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            className={cn(
              "option-button",
              showFeedback && index === correctIndex && "correct",
              showFeedback && selectedOption === index && index !== correctIndex && "incorrect"
            )}
          >
            <div className="flex justify-between items-center">
              <span>{option}</span>
              {showFeedback && index === correctIndex && (
                <Check className="h-5 w-5 text-green-600" />
              )}
              {showFeedback && selectedOption === index && index !== correctIndex && (
                <X className="h-5 w-5 text-red-600" />
              )}
            </div>
          </button>
        ))}
      </div>
      
      {showFeedback && (
        <div className="mt-4 text-center">
          <Button onClick={onNext} variant="outline">
            Next Question
          </Button>
        </div>
      )}
    </div>
  );
};

// Question Type 2: Choose the correct example
export const ExampleQuestion = ({ word, onCorrect, onIncorrect, onNext }: QuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [correctIndex, setCorrectIndex] = useState<number>(0);

  useEffect(() => {
    // Reset state when word changes
    setSelectedOption(null);
    setShowFeedback(false);
    
    // Generate options (in a real app, these would come from a larger set of examples)
    // For now, we'll use the first example as correct and add fake options
    const allOptions = [
      word.examples[0] || `This is an example using the word "${word.term}".`,
      `This sentence doesn't use the word properly.`,
      `Another example that doesn't fit with the definition.`,
      `Example that uses an incorrect meaning of ${word.term}.`
    ];
    
    // Shuffle the options
    const shuffled = [...allOptions].sort(() => 0.5 - Math.random()).slice(0, 4);
    
    // Make sure the correct option is included
    const correctOption = word.examples[0] || allOptions[0];
    if (!shuffled.includes(correctOption)) {
      shuffled[0] = correctOption;
    }
    
    setOptions(shuffled);
    setCorrectIndex(shuffled.indexOf(correctOption));
  }, [word]);

  const handleSelect = (index: number) => {
    if (showFeedback) return; // Prevent selection after answer is revealed
    
    setSelectedOption(index);
    setShowFeedback(true);
    
    if (index === correctIndex) {
      onCorrect();
    } else {
      onIncorrect();
    }
    
    // Move to next question after a delay
    setTimeout(() => {
      onNext();
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-medium">Select the correct example</h2>
        <div className="space-y-1">
          <h1 className="text-4xl font-bold">{word.term}</h1>
          {word.phonetic && <p className="phonetic text-center">{word.phonetic}</p>}
        </div>
        <p className="mt-2">{word.definitions[0]}</p>
      </div>
      
      <div className="grid grid-cols-1 gap-3 mt-8">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            className={cn(
              "option-button",
              showFeedback && index === correctIndex && "correct",
              showFeedback && selectedOption === index && index !== correctIndex && "incorrect"
            )}
          >
            <div className="flex justify-between items-center">
              <span className="example-text">"{option}"</span>
              {showFeedback && index === correctIndex && (
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
              )}
              {showFeedback && selectedOption === index && index !== correctIndex && (
                <X className="h-5 w-5 text-red-600 flex-shrink-0" />
              )}
            </div>
          </button>
        ))}
      </div>
      
      {showFeedback && (
        <div className="mt-4 text-center">
          <Button onClick={onNext} variant="outline">
            Next Question
          </Button>
        </div>
      )}
    </div>
  );
};

// Question Type 3: Word Completion
export const WordCompletionQuestion = ({ word, onCorrect, onIncorrect, onNext }: QuestionProps) => {
  const [userInput, setUserInput] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hint, setHint] = useState('');

  useEffect(() => {
    // Reset state when word changes
    setUserInput('');
    setShowFeedback(false);
    setIsCorrect(false);
    
    // Create a hint with the first letter and underscores
    const wordHint = word.term.charAt(0) + 
      '_'.repeat(word.term.length - 2) + 
      (word.term.length > 1 ? word.term.charAt(word.term.length - 1) : '');
    
    setHint(wordHint);
  }, [word]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (showFeedback) return;
    
    const correct = userInput.toLowerCase() === word.term.toLowerCase();
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      onCorrect();
    } else {
      onIncorrect();
    }
    
    // Move to next question after a delay
    setTimeout(() => {
      onNext();
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-medium">Complete the word</h2>
        <p className="text-muted-foreground">Fill in the missing letters</p>
      </div>
      
      <div className="space-y-4">
        <div className="p-4 bg-secondary/50 rounded-lg">
          <p className="example-text">"{word.examples[0] || `This is an example sentence using the word.`}"</p>
        </div>
        
        <div className="flex justify-center">
          <div className="text-2xl font-mono tracking-wider">
            {hint.split('').map((char, i) => (
              <span key={i} className={char === '_' ? 'text-primary' : ''}>
                {char}
              </span>
            ))}
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex-1">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={showFeedback}
              placeholder="Type the word"
              className="w-full px-4 py-3 rounded-lg border border-input bg-background"
            />
          </div>
          
          {!showFeedback && (
            <Button type="submit" className="w-full">
              Check Answer
            </Button>
          )}
        </form>
      </div>
      
      {showFeedback && (
        <div className={cn(
          "p-4 rounded-lg text-center",
          isCorrect ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
        )}>
          {isCorrect ? (
            <div className="flex items-center justify-center space-x-2">
              <Check className="h-5 w-5" />
              <span>Correct!</span>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <X className="h-5 w-5" />
                <span>Incorrect</span>
              </div>
              <p>The correct word is: <strong>{word.term}</strong></p>
            </div>
          )}
        </div>
      )}
      
      {showFeedback && (
        <div className="mt-4 text-center">
          <Button onClick={onNext} variant="outline">
            Next Question
          </Button>
        </div>
      )}
    </div>
  );
};
