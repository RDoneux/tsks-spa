import { useEffect, useState } from 'react';
import IBoard from '../../interfaces/IBoard';
import axiosInstance from '../../services/axios-interceptor.service';
import { useParams } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import Column from '../../components/Column';
import IColumn from '../../interfaces/IColumn';
import styles from './Board.module.css';
import { DndContext, DragEndEvent, UniqueIdentifier } from '@dnd-kit/core';
import ITicket from '../../interfaces/ITicket';
import Ticket from '../../components/Ticket';
import { moveTicket } from './services/Board.service';
import AddTicketButton from '../../components/create-new-ticket/AddTicketButton';
import CreateNewTicketModal from '../../components/create-new-ticket/CreateNewTicketModal';

export default function Board() {
  const [board, setBoard] = useState<IBoard>();
  const [columns, setColumns] = useState<IColumn[]>([]);
  const [modalOpen, setModalOpen] = useState<IColumn | null>(null);

  const { boardId } = useParams();

  useEffect(() => {
    axiosInstance
      .get<IBoard>(`/boards/columns/${boardId}`)
      .then((response: AxiosResponse<IBoard>) => {
        setBoard(response.data);
        setColumns(response.data.columns ?? []);
      });
  }, [boardId]);

  useEffect(() => {
    updateColumns();
    // eslint-disable-next-line
  }, [board]);

  async function updateColumns() {
    const updatedColumns = await Promise.all(
      columns.map(async (column: IColumn) => {
        const response: AxiosResponse<IColumn> = await axiosInstance.get(
          `/columns/tickets/${column.id}`
        );
        return { ...response.data };
      })
    );
    setColumns(updatedColumns);
  }

  function handleDragEnd(event: DragEndEvent) {
    setColumns(
      (previousColumns: IColumn[]) =>
        moveTicket(
          previousColumns,
          event.active.id.toString(),
          event.active.data.current?.columnOrigin,
          (event.over?.id as UniqueIdentifier).toString()
        ) ?? []
    );

    axiosInstance.put('/tickets/move', {
      ticketId: event.active.id,
      destinationColumnId: event.over?.id
    });
  }

  return (
    <>
      <div className="flex flex-col gap-5 p-5 h-full w-full">
        <h1 className="text-6xl">{board?.boardName}</h1>
        <div
          style={
            { '--grid-size': board?.columns?.length } as React.CSSProperties
          }
          className={styles['dynamic-grid']}
        >
          <DndContext onDragEnd={handleDragEnd}>
            {columns?.map((column: IColumn) => (
              <Column key={column.id} column={column}>
                {column.tickets?.map((ticket: ITicket) => (
                  <Ticket
                    key={ticket.id}
                    ticket={ticket}
                    columnId={column.id}
                  />
                ))}
                <AddTicketButton onClick={() => setModalOpen(column)} />
              </Column>
            ))}
          </DndContext>
        </div>
      </div>
      <CreateNewTicketModal
        modalOpen={modalOpen}
        triggerColumnRefresh={updateColumns}
        onClose={() => setModalOpen(null)}
      />
    </>
  );
}
