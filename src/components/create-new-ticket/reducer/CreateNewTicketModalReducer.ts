import IColumn from '../../../interfaces/IColumn';
import ITicket, { Priority } from '../../../interfaces/ITicket';

export const ICreateTicketInitialState: Partial<ITicket> = {
  ticketName: '',
  description: '',
  priority: 'Medium'
};

const CreateTicketReducerType = {
  UPDATE_NAME: '5282587c-8a85-4868-ad51-688e6f8f1840',
  UPDATE_DESCRIPTION: '6b0f25b7-b6ca-49a1-8549-943e9d982a34',
  UPDATE_PRIORITY: '9a912bef-9892-4c8d-b386-8d571b237a63',
  UPDATE_COLUMN: 'cd3b678c-7af5-482f-a16b-d425793334c8'
} as const;
type CreateTicketReducerType =
  (typeof CreateTicketReducerType)[keyof typeof CreateTicketReducerType];

interface CreateTicketReducerAction {
  type: CreateTicketReducerType;
  payload: string;
}

export function createTicketReducer(
  state: Partial<ITicket>,
  action: CreateTicketReducerAction
): Partial<ITicket> {
  switch (action.type) {
    case CreateTicketReducerType.UPDATE_NAME:
      return { ...state, ticketName: action.payload };
    case CreateTicketReducerType.UPDATE_DESCRIPTION:
      return { ...state, description: action.payload };
    case CreateTicketReducerType.UPDATE_PRIORITY:
      return { ...state, priority: action.payload as Priority };
    case CreateTicketReducerType.UPDATE_COLUMN:
      return { ...state, column: JSON.parse(action.payload) };
    default:
      throw new Error('Unknown reducer type');
  }
}

export function updateName(name: string): CreateTicketReducerAction {
  return { type: CreateTicketReducerType.UPDATE_NAME, payload: name };
}

export function updateDescription(
  description: string
): CreateTicketReducerAction {
  return {
    type: CreateTicketReducerType.UPDATE_DESCRIPTION,
    payload: description
  };
}

export function updatePriority(priority: Priority): CreateTicketReducerAction {
  return { type: CreateTicketReducerType.UPDATE_PRIORITY, payload: priority };
}

export function updateColumn(columnId: IColumn): CreateTicketReducerAction {
  return {
    type: CreateTicketReducerType.UPDATE_COLUMN,
    payload: JSON.stringify(columnId)
  };
}
