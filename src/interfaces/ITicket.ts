import IColumn from './IColumn';

export default interface ITicket {
  id: string;
  ticketName: string;
  description: string;
  priority: Priority;
  done: boolean;
  columnId: string;
  column: IColumn;
  createdAt: Date;
  updatedAt: Date;
}

export const Priority = {
  CRITICAL: 'CRITICAL',
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW'
} as const;
export type Priority = (typeof Priority)[keyof typeof Priority];
