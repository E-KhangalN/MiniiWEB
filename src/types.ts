export type TabId = 'course' | 'about' | 'geology' | 'plans' | 'cinema' | 'contact';

export interface Course {
  id: string;
  title: string;
  category: 'Math' | 'Code';
  level: string;
  description: string;
  topics: string[];
}

export interface MovieQuote {
  quote: string;
  character: string;
  movie: string;
}
