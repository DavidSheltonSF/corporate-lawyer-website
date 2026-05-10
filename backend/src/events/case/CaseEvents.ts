export const CASE_CREATED = 'CASE_CREATED';

export type CaseEventPayload = {
  caseId: string;
  caseTitle: string;
  clientId: string;
  lawyerId: string;
};
