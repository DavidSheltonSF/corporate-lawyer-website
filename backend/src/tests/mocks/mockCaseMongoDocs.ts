import { Types } from 'mongoose';
import { CasesStatus } from '../../types/CasesStatus';
import { ICaseModel } from '../../models/CaseModel';
import { City } from '../../types/City';
import { BrazilianState } from '../../types/BrazilianState';
import { WithMongoId } from '../../database/mongoDB/types/WithMongoId';

export const mockCaseMongoDocs: WithMongoId<ICaseModel>[] = [
  {
    _id: Types.ObjectId.createFromTime(485855),
    client: Types.ObjectId.createFromTime(45855),
    court: 'STJ',
    courtDivision: 'Família',
    description: 'Fake description',
    lawyers: [Types.ObjectId.createFromTime(488888)],
    processNumber: '2254787-55.5877.1.55.4787', //NNNNNNN-DD.AAAA.J.TR.OOOO,
    status: CasesStatus.open,
    title: 'Case Title',
    files: [],
    hearings: [],
    localization: {
      state: BrazilianState.RIO_DE_JANEIRO,
      city: City.BELFORD_ROXO,
    },
  },
];
