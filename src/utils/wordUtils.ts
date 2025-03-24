import { Word } from "@/components/WordCard";

// Sample word list for demonstration
export const sampleWords: Word[] = [
  {
    id: "1",
    term: "ubiquitous",
    phonetic: "/juːˈbɪkwɪtəs/",
    definitions: [
      "Present, appearing, or found everywhere."
    ],
    chineseDefinitions: [
      "无处不在的，普遍存在的。"
    ],
    examples: [
      "Mobile phones are now ubiquitous in modern society.",
      "The ubiquitous nature of plastic pollution is a global concern."
    ],
    imageUrl: "https://images.unsplash.com/photo-1501618669935-18b6ecb13d6d?w=500&h=300&fit=crop",
    level: "advanced",
    knowLevel: 2,
  },
  {
    id: "2",
    term: "ephemeral",
    phonetic: "/ɪˈfem(ə)rəl/",
    definitions: [
      "Lasting for a very short time."
    ],
    chineseDefinitions: [
      "短暂的，瞬息即逝的。"
    ],
    examples: [
      "The ephemeral beauty of cherry blossoms.",
      "Social media posts often have an ephemeral impact on public opinion."
    ],
    imageUrl: "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?w=500&h=300&fit=crop",
    level: "advanced",
    knowLevel: 1,
  },
  {
    id: "3",
    term: "serendipity",
    phonetic: "/ˌser.ənˈdɪp.ɪ.ti/",
    definitions: [
      "The occurrence and development of events by chance in a happy or beneficial way."
    ],
    chineseDefinitions: [
      "意外发现的好事，机缘巧合。"
    ],
    examples: [
      "Finding your dream job through a chance meeting is an example of serendipity.",
      "Their meeting was pure serendipity."
    ],
    imageUrl: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=500&h=300&fit=crop",
    level: "advanced",
    knowLevel: 0,
  },
  {
    id: "4",
    term: "ambiguous",
    phonetic: "/amˈbɪɡjuəs/",
    definitions: [
      "Open to more than one interpretation; having a double meaning.",
      "Unclear or inexact because a choice between alternatives has not been made."
    ],
    chineseDefinitions: [
      "模棱两可的，含糊不清的。",
      "有多种解释可能的，意义不明确的。"
    ],
    examples: [
      "The instructions were ambiguous and confusing.",
      "Her reply to my question was rather ambiguous."
    ],
    level: "intermediate",
    knowLevel: 3,
  },
  {
    id: "5",
    term: "pragmatic",
    phonetic: "/præɡˈmætɪk/",
    definitions: [
      "Dealing with things sensibly and realistically in a way that is based on practical rather than theoretical considerations."
    ],
    chineseDefinitions: [
      "务实的，实用主义的。"
    ],
    examples: [
      "A pragmatic approach to solving problems.",
      "She takes a pragmatic view of life."
    ],
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop",
    level: "intermediate",
    knowLevel: 2,
  },
  {
    id: "6",
    term: "procrastinate",
    phonetic: "/prəˈkræstɪneɪt/",
    definitions: [
      "Delay or postpone action; put off doing something."
    ],
    chineseDefinitions: [
      "拖延，耽搁。"
    ],
    examples: [
      "I've been procrastinating all morning—I haven't done any work.",
      "He always procrastinates until the last minute."
    ],
    level: "intermediate",
    knowLevel: 4,
  },
  {
    id: "7",
    term: "benevolent",
    phonetic: "/bɪˈnev.əl.ənt/",
    definitions: [
      "Well meaning and kindly.",
      "Characterized by or expressing goodwill or kindly feelings."
    ],
    chineseDefinitions: [
      "仁慈的，慈善的。",
      "表达善意和友好情感的。"
    ],
    examples: [
      "A benevolent smile.",
      "The charity relies on benevolent donors."
    ],
    level: "advanced",
    knowLevel: 1,
  },
  {
    id: "8",
    term: "resilient",
    phonetic: "/rɪˈzɪl.i.ənt/",
    definitions: [
      "Able to withstand or recover quickly from difficult conditions.",
      "Tending to recover from or adjust easily to misfortune or change."
    ],
    chineseDefinitions: [
      "有弹性的，能快速恢复的。",
      "能轻松从不幸或变化中恢复或适应的。"
    ],
    examples: [
      "Children are often remarkably resilient in the face of significant adversity.",
      "The economy is proving to be more resilient than expected."
    ],
    imageUrl: "https://images.unsplash.com/photo-1520881363902-a0ff4e722963?w=500&h=300&fit=crop",
    level: "intermediate",
    knowLevel: 3,
  },
];

// Function to get words for review based on forgetting curve
export const getWordsForReview = (allWords: Word[], count: number = 10): Word[] => {
  // Sort words by a combination of knowledge level and time since last review
  // Lower knowLevel and older lastReviewedAt gets higher priority
  const sortedWords = [...allWords].sort((a, b) => {
    const aKnowLevel = a.knowLevel || 0;
    const bKnowLevel = b.knowLevel || 0;
    
    // If never reviewed or no knowLevel set, prioritize
    if (!a.lastReviewedAt) return -1;
    if (!b.lastReviewedAt) return 1;
    
    // Compare knowledge levels first
    if (aKnowLevel !== bKnowLevel) {
      return aKnowLevel - bKnowLevel; // Lower knowLevel first
    }
    
    // If knowledge levels are the same, compare last reviewed date
    const aReviewed = a.lastReviewedAt instanceof Date ? a.lastReviewedAt : new Date(a.lastReviewedAt);
    const bReviewed = b.lastReviewedAt instanceof Date ? b.lastReviewedAt : new Date(b.lastReviewedAt);
    return aReviewed.getTime() - bReviewed.getTime(); // Older first
  });
  
  // Return the top N words for review
  return sortedWords.slice(0, count);
};

// Function to update word knowledge level
export const updateWordKnowledge = (word: Word, wasCorrect: boolean): Word => {
  const currentLevel = word.knowLevel || 0;
  let newLevel;
  
  if (wasCorrect) {
    // Increase knowledge level, max is 5
    newLevel = Math.min(5, currentLevel + 1);
  } else {
    // Decrease knowledge level, min is 0
    newLevel = Math.max(0, currentLevel - 1);
  }
  
  return {
    ...word,
    knowLevel: newLevel,
    lastReviewedAt: new Date(),
  };
};

// Shuffle an array using Fisher-Yates algorithm
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Estimate total vocabulary size based on known words
export const estimateVocabularySize = (
  correctAnswers: number, 
  totalAnswered: number, 
  level: 'beginner' | 'intermediate' | 'advanced'
): number => {
  // Calculate accuracy rate
  const accuracy = totalAnswered > 0 ? correctAnswers / totalAnswered : 0;
  
  // Base vocabulary sizes by level
  const baseVocabulary = {
    beginner: 1000,
    intermediate: 3000,
    advanced: 8000
  };
  
  // Adjust based on accuracy
  // Higher accuracy rates suggest larger vocabulary
  const accuracyMultiplier = 0.5 + accuracy * 1.5; // Range from 0.5 to 2.0 based on accuracy
  
  return Math.round(baseVocabulary[level] * accuracyMultiplier);
};
