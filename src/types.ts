export type Id = string;

export type Task = {
  id: Id;
  content: string;
};

export type Column = {
  id: Id;
  title: string;
  createdAt: number;
  tasks: Task[];
};
