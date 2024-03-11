import { IInvoice } from '@/features/stage-card/types/IInvoice';

export interface IStage {
  level?: number;
  name: string;
  url: string;
  status: string;
  estimate: string;
  completed: string;
  timeSpent: string;
  moneySpent: number;
  start: string | null;
  end: string | null;
  invoice: IInvoice | null;
}
