import { Case } from '../../../entities/Case';
import { WithId } from '../../../types/WithId';

export function mapRowToLawsuit(row: any, lawyers: string[]): WithId<Case> {
  const { id, title, client_id, description, process_number, court, court_division, status } = row;
  return {
    id,
    title,
    client: client_id,
    description,
    processNumber: process_number,
    court,
    courtDivision: court_division,
    lawyers,
    status,
  };
}
