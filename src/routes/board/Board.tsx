import { useEffect, useState } from 'react';
import IBoard from '../../interfaces/IBoard';
import axiosInstance from '../../services/axios-interceptor.service';
import { useParams } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import Column from '../../components/Column';
import IColumn from '../../interfaces/IColumn';
import styles from './Board.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function Board() {
  const [board, setBoard] = useState<IBoard>();
  const { boardId } = useParams();

  useEffect(() => {
    axiosInstance
      .get<IBoard>(`/boards/columns/${boardId}`)
      .then((response: AxiosResponse<IBoard>) => {
        setBoard(response.data);
      });
  }, [boardId]);

  return (
    <div className="flex flex-col gap-5 p-5 h-full w-full">
      <h1 className="text-6xl">{board?.boardName}</h1>
      <div
        style={{ '--grid-size': board?.columns?.length } as React.CSSProperties}
        className={styles['dynamic-grid']}
      >
        <DndProvider backend={HTML5Backend}>
          {board?.columns?.map((column: IColumn) => (
            <Column key={column.id} id={column.id} />
          ))}
        </DndProvider>
      </div>
    </div>
  );
}
