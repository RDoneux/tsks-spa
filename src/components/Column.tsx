import { useEffect, useState } from 'react';
import axiosInstance from '../services/axios-interceptor.service';
import { AxiosResponse } from 'axios';
import ITicket from '../interfaces/ITicket';
import IColumn from '../interfaces/IColumn';
import Ticket from './Ticket';
import { useDrop } from 'react-dnd';

interface ColummProps {
  id: string;
}

export default function Column({ id }: ColummProps) {
  const [column, setColumn] = useState<IColumn>();

  useEffect(() => {
    axiosInstance
      .get(`/columns/tickets/${id}`)
      .then((response: AxiosResponse) => {
        setColumn(response.data);
      });
  }, [id]);

  const [, dropRef] = useDrop(() => ({
    accept: 'BOX',
    drop: (id) => onTicketDropped(id as {ticketId: string})
  }));

  function onTicketDropped({ticketId}: {ticketId: string}) {
    console.log(`need to move itcket ${ticketId} to column: ${column?.id}`);
  }

  return (
    <section
      ref={dropRef}
      className="w-full flex flex-col gap-6 bg-neutral-700 rounded p-2"
    >
      <h1 className="text-2xl">{column?.columnName}</h1>
      {column?.tickets.map((ticket: ITicket) => (
        <Ticket key={ticket.id} ticket={ticket} />
      ))}
    </section>
  );
}
