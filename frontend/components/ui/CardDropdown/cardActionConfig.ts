import { EditIcon } from '@/components/icons/EditIcon';
import { CardAction, CardActionType } from './types';
import { DeleteIcon } from '@/components/icons/DeleteIcon';
import { CalendarIcon } from '@/components/icons/CalendarIcon';
import { DocumentIcon } from '@/components/icons/DocumentIcon';

export const CARD_ACTION_CONFIG = {
  [CardActionType.EDIT]: { label: 'Alterar', Icon: EditIcon },
  [CardActionType.DELETE]: { label: 'Remover', Icon: DeleteIcon },
  [CardActionType.CHECK_DEADLINES]: { label: 'Ver prazos', Icon: CalendarIcon },
  [CardActionType.CHECK_FILES]: { label: 'Ver arquivos', Icon: DocumentIcon },
} satisfies Record<CardActionType, Omit<CardAction, 'action'>>;
