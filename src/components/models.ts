export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export interface Card {
  id: number;
  name: string;
  priority: Priority;
  description?: string;
  status?: number;
}

export interface Column {
  title: string;
  listCard: Card[];
}
