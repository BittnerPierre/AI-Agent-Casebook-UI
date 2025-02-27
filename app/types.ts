export interface Message {
  role: 'user' | 'assistant';
  content: string;
  id?: string;

  createdAt?: string;
  metadata?: any;
}

export interface AIMessage extends Omit<Message, 'role'> {
  role: 'assistant';
} 