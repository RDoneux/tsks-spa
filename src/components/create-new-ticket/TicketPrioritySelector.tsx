import { Priority } from '../../interfaces/ITicket';

interface TicketPrioritySelector {
  selectedValue?: Priority;
  valueSelected: (priority: Priority) => void;
}

const options: Priority[] = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

export default function TicketPrioritySelector({
  selectedValue = Priority.MEDIUM,
  valueSelected
}: TicketPrioritySelector) {
  return (
    <>
      <h3>Priority</h3>
      <div className="flex gap-6" aria-label="Tabs">
        {options.map((value: Priority) => (
          <button
            onClick={() => valueSelected(value)}
            style={{ background: selectedValue === value ? '#333' : undefined }}
            className={`shrink-0 rounded p-2 text-sm font-medium text-neutral-200 hover:bg-gray-50 hover:text-gray-700 ${selectedValue === value ? 'hover:text-neutral-200' : ''}`}
          >
            {value}
          </button>
        ))}
      </div>
    </>
  );
}
