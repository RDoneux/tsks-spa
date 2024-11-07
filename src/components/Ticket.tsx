import { useDraggable } from '@dnd-kit/core';
import ITicket from '../interfaces/ITicket';

interface TicketProps {
  ticket: ITicket;
  columnId: string;
}

export default function Ticket({ ticket, columnId }: TicketProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: ticket.id,
    data: { columnOrigin: columnId }
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        boxShadow: '0 4px 5px #333'
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-neutral-500 rounded p-3"
    >
      <h4>{ticket.ticketName}</h4>
      <p>{ticket.description}</p>
    </div>
  );
}
