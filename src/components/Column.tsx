import { useEffect, useState } from 'react';
import axiosInstance from '../services/axios-interceptor.service';
import { AxiosResponse } from 'axios';
import ITicket from '../interfaces/ITicket';
import IColumn from '../interfaces/IColumn';
import Ticket from './Ticket';

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

  return (
    <section className="w-full flex flex-col gap-6 bg-neutral-700 rounded p-2">
      <h1 className="text-2xl">{column?.columnName}</h1>
      {column?.tickets.map((ticket: ITicket) => <Ticket ticket={ticket} />)}
    </section>
  );
}
