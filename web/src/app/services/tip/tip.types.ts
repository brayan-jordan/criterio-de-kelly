import { Method } from '../method/method.types';

export type Tip = {
  id: string;
  description: string;
  odd?: number;
  date: Date;
  result: string;
  methodId: string;
  method: Method;
};

export type TipInput = {
  description: string;
  methodId: string;
  odd?: number;
  date?: Date;
  result?: string;
};
