export type User = {
  _id: string;
  name: string;
  email: string;
  favorites: Candidate[];
};

export type Comment = {
  user: string;
  message: string;
};

export type Candidate = {
  _id: string;
  name: string;
  biography: string;
  electoralProgram: string;
  votes: number;
  comments: Comment[];
};
