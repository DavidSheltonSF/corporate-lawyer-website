import { fakeUserDatabase } from './users';
import { CaseStatusEnum } from '../../types/CaseStatusEnum';

export const fakeCases = [
  {
    client: fakeUserDatabase[3]!._id,
    lawyers: [fakeUserDatabase[0]!._id, fakeUserDatabase[1]!._id],
    processNumber: '01119418441616-44156',
    title: 'Ação de indenização por danos morais',
    description:
      'O cliente busca reparação por danos morais decorrentes de uma cobrança indevida realizada pela empresa X. O processo está em fase de instrução, aguardando audiência para oitiva de testemunhas.',
    court: 'STJ',
    courtDivision: '5ª Vara Cívil',
    status: CaseStatusEnum.open,
  },
  {
    client: fakeUserDatabase[3]!._id,
    lawyers: [fakeUserDatabase[0]!._id, fakeUserDatabase[1]!._id],
    processNumber: '55329184722017-11422',
    title: 'Ação de usucapião urbano',
    description:
      'O cliente busca o reconhecimento de posse prolongada de um imóvel urbano utilizado há mais de 15 anos ininterruptos.',
    court: 'TJ-RJ',
    courtDivision: '7ª Vara de Registros Públicos',
    status: CaseStatusEnum.open,
  },
  {
    client: fakeUserDatabase[3]!._id,
    lawyers: [fakeUserDatabase[0]!._id],
    processNumber: '77193840255120-66821',
    title: 'Ação de cobrança por inadimplência contratual',
    description:
      'A parte autora busca receber valores devidos referentes a um contrato de prestação de serviços não pago.',
    court: 'TJ-SP',
    courtDivision: '2ª Vara Cível',
    status: CaseStatusEnum.closed,
  },
  {
    client: fakeUserDatabase[3]!._id,
    lawyers: [fakeUserDatabase[1]!._id],
    processNumber: '91283746501923-44177',
    title: 'Ação de danos materiais por acidente de trânsito',
    description:
      'O cliente busca ressarcimento pelos danos causados ao seu veículo após colisão envolvendo terceiro.',
    court: 'TJ-SP',
    courtDivision: '14ª Vara Cível',
    status: CaseStatusEnum.open,
  },
  {
    client: fakeUserDatabase[3]!._id,
    lawyers: [fakeUserDatabase[0]!._id, fakeUserDatabase[1]!._id],
    processNumber: '91283747777923-44177',
    title: 'Ação de danos morais',
    description: 'O cliente busca ressarcimento pelos danos morais.',
    court: 'TJ-SP',
    courtDivision: '14ª Vara Cível',
    status: CaseStatusEnum.closed,
  },
  {
    client: fakeUserDatabase[2]!._id,
    lawyers: [fakeUserDatabase[0]!._id],
    processNumber: '91244458777923-44177',
    title: 'Ação de danos à imagem',
    description: 'O cliente busca ressarcimento pelos danos causados à sua imagem publica.',
    court: 'TJ-SP',
    courtDivision: '14ª Vara Cível',
    status: CaseStatusEnum.open,
  },
  {
    client: fakeUserDatabase[2]!._id,
    lawyers: [fakeUserDatabase[0]!._id],
    processNumber: '91283585877923-44177',
    title: 'Ação de pensão por morte',
    description: 'O cliente busca pensão pela morte do marido',
    court: 'TJ-SP',
    courtDivision: '14ª Vara Cível',
    status: CaseStatusEnum.closed,
  },
];
