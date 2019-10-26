import { Author } from './Author';

export interface Message {
  author: Author;
  content: string;
  date: any;
  status: string;  // 'unread' | 'read' | 'answered'
}
