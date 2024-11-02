import ITicket from './ITicket';

export default interface IColumn {
  id: string;
  columnName: string;
  boardId: string;
  tickets: ITicket[];
  createdAt: Date;
  updatedAt: Date;
}
