import { IStage } from '@/features/stage-card/types/IStage';

export interface IProject {
  type: string;
  customerUrl: string;
  url: string;
  name: string;
  customer: string;
  types: string[];
  responsible: {
    id: number;
    username: string;
    email: string;
    color: string;
    profilePicture: string;
    initials: string;
  } | null;
  start: string | null;
  end: string | null;
  estimate: string;
  timeSpent: string;
  budget: number | null;
  stages: IStage[];
}
