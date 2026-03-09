export class CaseNotFoundError extends Error {
  constructor(caseId: string) {
    super(`Case with id '${caseId}' was not found`);
    this.name = CaseNotFoundError.name;
  }
}
