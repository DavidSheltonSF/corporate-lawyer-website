export const CASE_CREATED = 'CASE_CREATED';

export type CaseCreatedEvent = {
  caseId: string;
  caseTitle: string;
  clientId: string;
  lawyerId: string;
};
