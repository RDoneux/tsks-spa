import { useEffect, useReducer } from 'react';
import Modal from '../Modal';
import anime from 'animejs';
import {
  createTicketReducer,
  ICreateTicketInitialState,
  updateColumn,
  updateDescription,
  updateName,
  updatePriority
} from './reducer/CreateNewTicketModalReducer';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import TicketPrioritySelector from './TicketPrioritySelector';
import axiosInstance from '../../services/axios-interceptor.service';
import { AxiosError } from 'axios';
import IColumn from '../../interfaces/IColumn';
import toast from 'react-hot-toast';

interface CreateNewTicketModal {
  modalOpen: IColumn | null;
  onClose: () => void;
  triggerColumnRefresh: () => void;
}

export default function CreateNewTicketModal({
  modalOpen,
  onClose,
  triggerColumnRefresh
}: CreateNewTicketModal) {
  const [state, dispatch] = useReducer(
    createTicketReducer,
    ICreateTicketInitialState
  );

  useEffect(() => {
    anime({
      targets: '#modal',
      opacity: modalOpen ? 1 : 0,
      translateY: modalOpen ? [-100, 0] : [0, -100],
      duration: 200,
      easing: 'easeInOutQuad'
    });
  }, [modalOpen]);

  useEffect(() => {
    if (!modalOpen) return;
    dispatch(updateColumn(modalOpen));
  }, [modalOpen]);

  function onCancel() {
    onClose();
  }

  function onConfirm() {
    axiosInstance
      .post('/tickets', { ...state })
      .then(() => triggerColumnRefresh())
      .catch((error: AxiosError) =>
        toast(`There as an issue creating the ticket: ${error.message}`)
      );
    onCancel();
  }

  return (
    <Modal
      open={modalOpen != null}
      title="Create New Ticket"
      onCancel={onCancel}
      onConfirm={onConfirm}
    >
      <div className="flex flex-col gap-2">
        <Input
          type="text"
          label="Ticket Name"
          value={state.ticketName}
          onChange={(event) => dispatch(updateName(event.target.value))}
        />

        <TextArea
          value={state.description}
          onChange={(event) => dispatch(updateDescription(event.target.value))}
          placeholder="Ticket Description"
        />

        <TicketPrioritySelector
          selectedValue={state.priority}
          valueSelected={(event) => dispatch(updatePriority(event))}
        />
      </div>
    </Modal>
  );
}
