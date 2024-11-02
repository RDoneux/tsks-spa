interface ModalProps {
  onConfirm: () => void;
  onCancel: () => void;

  title: string;
  description?: string;
  confirmationButtonText?: string;
  cancelButtonText?: string;
}

export default function Modal({
  onConfirm,
  onCancel,
  title,
  description,
  confirmationButtonText = "Yes, I'm sure",
  cancelButtonText = 'No, close'
}: ModalProps) {
  return (
    <div
      id="modal"
      className="fixed opacity-0 top-5 rounded-lg bg-neutral-600 p-8 shadow-2xl"
    >
      <h2 className="text-lg font-bold">{title}</h2>

      <p className="mt-2 text-sm text-neutral-100">{description}</p>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          className="rounded bg-red-900 px-4 py-2 text-sm font-medium text-neutral-100 hover:bg-red-800"
          onClick={onConfirm}
        >
          {confirmationButtonText}
        </button>

        <button
          type="button"
          className="rounded bg-neutral-800 text-neutral-100 px-4 py-2 text-sm font-medium hover:bg-neutral-900"
          onClick={onCancel}
        >
          {cancelButtonText}
        </button>
      </div>
    </div>
  );
}
