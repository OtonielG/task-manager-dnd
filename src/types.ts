export type Id = string;

export type Column = {
  id: Id;
  title: string;
  createdAt: number;
};

export interface Task {
  id: Id;
  content: string;
}
