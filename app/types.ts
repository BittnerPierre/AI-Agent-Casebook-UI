export interface Message {
  type: 'human' | 'ai' | 'tool';
  content: string;
  id?: string;
  name: string;
  createdAt?: string;
  metadata?: any;
}

export interface AIMessage extends Omit<Message, 'type'> {
  type: 'ai';
} 