import { EditIcon } from '@/components/icons/EditIcon';
import { CardAction, CardActionType } from './types';
import { DeleteIcon } from '@/components/icons/DeleteIcon';

export const CARD_ACTION_CONFIG = {
  [CardActionType.EDIT]: { label: 'Alterar', Icon: EditIcon },
  [CardActionType.DELETE]: { label: 'Remover', Icon: DeleteIcon },
} satisfies Record<CardActionType, Omit<CardAction, 'action'>>;
