import { Types } from 'mongoose';
import { CasesStatus } from '../../types/CasesStatus';

export const mockCaseMongoDocs = [
  {
    id: Types.ObjectId.createFromTime(485855),
    client: Types.ObjectId.createFromTime(45855),
    court: 'STJ',
    courtDivision: 'Família',
    description: 'Fake description',
    lawyers: [Types.ObjectId.createFromTime(488888)],
    processNumber: '2254787-55.5877.1.55.4787', //NNNNNNN-DD.AAAA.J.TR.OOOO,
    status: CasesStatus.open,
    title: 'Case Title',
  },
];
