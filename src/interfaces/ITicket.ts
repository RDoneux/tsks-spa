export default interface ITicket {
  id: string;
  ticketName: string;
  description: string;
  priority: Priority;
  done: boolean;
  columnId: string;
  createdAt: Date;
  updatedAt: Date;
}

export const Priority = {
  CRITICAL: 'Critical',
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low'
} as const;
export type Priority = (typeof Priority)[keyof typeof Priority];
