import { EditIcon } from '@/components/icons/EditIcon';
import { CardAction, CardActionType } from './types';
import { DeleteIcon } from '@/components/icons/DeleteIcon';
import { CalendarIcon } from '@/components/icons/CalendarIcon';

export const CARD_ACTION_CONFIG = {
  [CardActionType.EDIT]: { label: 'Alterar', Icon: EditIcon },
  [CardActionType.DELETE]: { label: 'Remover', Icon: DeleteIcon },
  [CardActionType.CHECK_DEADLINES]: { label: 'Ver prazos', Icon: CalendarIcon },
} satisfies Record<CardActionType, Omit<CardAction, 'action'>>;
