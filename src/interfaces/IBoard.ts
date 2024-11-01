import IColumn from './IColumn';

export default interface IBoard {
  id: string;
  boardName: string;
  columns?: IColumn[];
  columnCount: number;
  createdAt: Date;
  updatedAt: Date;
}
