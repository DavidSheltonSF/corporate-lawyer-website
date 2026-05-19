import { CardAction, CardActionType } from './types';
import { CARD_ACTION_CONFIG } from './cardActionConfig';

export function makeCardAction(type: CardActionType, action: () => void): CardAction {
  const config = CARD_ACTION_CONFIG[type];

  if (!config) {
    throw new Error(`Invalid card action: ${type}`);
  }

  return {
    ...config,
    action,
  };
}
