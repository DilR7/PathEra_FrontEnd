export type PracticeSessionType = {
  id: number;
  user_id: number;
  job_title: string;
  average_score: number;
  createdAt: string;
};

export type AnswerDetailsType = {
  question: string;
  answer: string;
  score: number;
  feedback: string;
  sampleAnswer: string;
};
