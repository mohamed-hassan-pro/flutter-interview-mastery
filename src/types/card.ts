export type Level = 'Junior' | 'Mid' | 'Senior';
export type Frequency = 'Rare' | 'Common' | 'Very Common' | 'Critical';
export type QuestionType = 'Theoretical' | 'Practical' | 'System Design' | 'Critical Thinking' | 'Deep Dive';

export interface CodeExample {
  language: string;
  code: string;
}

export interface Question {
  type: QuestionType;
  question: string;
  questionAr?: string;
  difficulty: number;
  expectedAnswer?: {
    points?: string[];
    timeToAnswer?: string;
    codeExample?: {
      before?: string;
      after?: string;
    };
  };
}

export interface Definition {
  summary: string;
  detailed: string;
  analogy?: string;
  keyPoints: string[];
  codeExample?: CodeExample;
}

export interface ArchitectureLinks {
  solid?: string[];
  patterns?: string[];
  principles?: string[];
}

export interface InterviewerMind {
  whatTheyWant: string[];
  redFlags: string[];
  greenFlags: string[];
}

export interface LinkedCard {
  id: string;
  title: string;
}

export interface LinkedCards {
  prerequisites: string[];
  nextSteps: LinkedCard[];
  related: LinkedCard[];
}

export interface Pitfall {
  mistake: string;
  whyWrong: string;
  correctApproach: string;
  egyptianContext?: string;
}

export interface AnswerStrategy {
  structure: string[];
  timeAllocation: {
    junior: string;
    mid: string;
    senior: string;
  };
  keyPhrases: string[];
}

export interface QuickRevision {
  bulletPoints: string[];
  memoryHook: string;
  cheatSheet: string;
}

export interface EgyptianMarket {
  popularity: string;
  salaryImpact: string;
}

export interface Card {
  id: string;
  number: number;
  title: string;
  titleAr?: string;
  level: Level;
  frequency: Frequency;
  tags: string[];
  definition: Definition;
  architectureLinks?: ArchitectureLinks;
  questions: Question[];
  interviewerMind?: InterviewerMind;
  linkedCards?: LinkedCards;
  commonPitfalls?: Pitfall[];
  answerStrategy?: AnswerStrategy;
  quickRevision?: QuickRevision;
  companyTags: string[];
  egyptianMarket: EgyptianMarket;
}

export interface FilterOptions {
  level: Level | 'All';
  company: string | 'All';
  tags: string[];
  frequency: Frequency | 'All';
  searchQuery: string;
}

export interface StudyProgress {
  cardId: string;
  studiedAt: string;
  confidenceLevel: number; // mapped to 0-5 for SM-2
  nextReviewDate?: string;
  lastReviewedDate?: string;
  reviewCount: number;
  interval: number;    // days
  repetition: number;  // iteration count
  efactor: number;     // easiness factor (default 2.5)
}
