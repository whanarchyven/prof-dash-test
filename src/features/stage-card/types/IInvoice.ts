export interface IInvoice {
  url: string;
  name: string;
  description: string;
  status: string;
  amount: number;
  expected: string;
  comment: string | null;
}
