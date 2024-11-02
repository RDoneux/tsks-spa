import ITicket from '../interfaces/ITicket';

interface TicketProps {
  ticket: ITicket;
}

export default function Ticket({ ticket }: TicketProps) {
  return (
    <div className="bg-neutral-500 rounded p-3">
      <h4>{ticket.ticketName}</h4>
      <p>{ticket.description}</p>
    </div>
  );
}
