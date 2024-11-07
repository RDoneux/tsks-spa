import { useEffect } from 'react';
import { Priority } from '../../interfaces/ITicket';

interface TicketPriorityLabel {
  priority: Priority;
}

const priorityMap: { [key: string]: string } = {
  [Priority.CRITICAL]: 'bg-red-500',
  [Priority.HIGH]: 'bg-orange-400',
  [Priority.MEDIUM]: 'bg-blue-700',
  [Priority.LOW]: 'bg-black'
};

export default function TicketPriorityLabel({ priority }: TicketPriorityLabel) {
  useEffect(() => {
    console.log(JSON.stringify(priorityMap), priority, priorityMap[priority]);
  }, []);

  return (
    <>
      <div className={`${priorityMap[priority]} rounded w-fit px-2 py-1`}>{priority}</div>
    </>
  );
}
