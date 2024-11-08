interface AddTicketButtonProps {
  onClick: () => void;
}

export default function AddTicketButton({ onClick }: AddTicketButtonProps) {
  return (
    <>
      <button
        className="flex justify-center align-center gap-1 py-2 bg-neutral-700 funky-button"
        onClick={() => onClick()}
      >
        <span className="material-symbols-outlined">add</span>{' '}
        <p className="leading-[22px]">Create Ticket</p>
      </button>
    </>
  );
}
