import IColumn from '../../../interfaces/IColumn';
import ITicket from '../../../interfaces/ITicket';

export function moveTicket(
  columns: IColumn[],
  ticketId: string,
  sourceColumnId: string,
  destinationColumnId: string
) {
  const { destination, origin } = columns.reduce(
    (acc: { [key: string]: IColumn }, item: IColumn) => {
      if (item.id === destinationColumnId) acc.destination = item;
      if (item.id === sourceColumnId) acc.origin = item;
      return acc;
    },
    {}
  );

  if (destination.id === origin.id) return columns;

  // error handling if destination or origin aren't found

  const ticketIndex: number = origin.tickets.findIndex(
    (ticket: ITicket) => ticket.id === ticketId
  );
  // error handling if ticket isn't found

  const [ticket] = origin.tickets.splice(ticketIndex, 1);

  return columns.map((column: IColumn) => {
    if (column.id === origin.id) {
      return { ...column, tickets: origin.tickets };
    }
    if (column.id === destinationColumnId) {
      return { ...column, tickets: [...destination.tickets, ticket] };
    }
    return column;
  });
}
