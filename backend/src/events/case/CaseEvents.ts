export const CaseEvent = {
  CASE_CREATED: 'CASE_CREATED',
  CASE_UPDATED: 'CASE_UPDATED',
  CASE_DELETED: 'CASE_DELETED',
};

export type CaseEventPayload = {
  caseId: string;
  caseTitle: string;
  clientId: string;
  lawyerId: string;
};
