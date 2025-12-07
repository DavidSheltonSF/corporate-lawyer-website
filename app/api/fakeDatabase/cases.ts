import { CaseProps, CaseStatusEnum } from '@/types/CaseProps';
import { WithId } from '@/types/WithId';

export const fakeCases: WithId<CaseProps>[] = [
  {
    id: 'case1',
    clientId: 'raimundo1',
    lawyerIds: ['flavia1', 'carla1'],
    processNumber: '01119418441616-44156',
    title: 'Ação de indenização por danos morais',
    description:
      'O cliente busca reparação por danos morais decorrentes de uma cobrança indevida realizada pela empresa X. O processo está em fase de instrução, aguardando audiência para oitiva de testemunhas.',
    tribunal: 'STJ',
    vara: '5ª Vara Cívil',
    documents: [],
    hearings: [
      {
        location: 'Rio de Janeiro/RJ',
        date: new Date('2024-08-08'),
        description: 'Não houve acordo de nenhuma das partes.',
      },
    ],
    status: CaseStatusEnum.em_andamento,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'case2',
    clientId: 'raimundo1',
    lawyerIds: ['flavia1', 'carla1'],
    processNumber: '00293847320244-88211',
    title: 'Ação trabalhista por horas extras',
    description:
      'A cliente alega que trabalhou além da jornada contratada sem receber o devido pagamento pelas horas extras. O processo está aguardando apresentação de contestação pela empresa.',
    tribunal: 'TRT-1',
    vara: '12ª Vara do Trabalho',
    documents: [],
    hearings: [
      {
        location: 'São Paulo/SP',
        date: new Date('2024-09-15'),
        description: 'Audiência inicial para tentativa de conciliação.',
      },
    ],
    status: CaseStatusEnum.encerrado,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // 🔥 NEW UNIQUE CASES BEGIN HERE
  {
    id: 'case3',
    clientId: 'raimundo1',
    lawyerIds: ['carla1'],
    processNumber: '55329184722017-11422',
    title: 'Ação de usucapião urbano',
    description:
      'O cliente busca o reconhecimento de posse prolongada de um imóvel urbano utilizado há mais de 15 anos ininterruptos.',
    tribunal: 'TJ-RJ',
    vara: '7ª Vara de Registros Públicos',
    documents: [],
    hearings: [
      {
        location: 'Rio de Janeiro/RJ',
        date: new Date('2024-11-10'),
        description: 'Audiência para apresentação de testemunhas sobre posse.',
      },
    ],
    status: CaseStatusEnum.em_andamento,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'case4',
    clientId: 'raimundo1',
    lawyerIds: ['carla1'],
    processNumber: '77193840255120-66821',
    title: 'Ação de cobrança por inadimplência contratual',
    description:
      'A parte autora busca receber valores devidos referentes a um contrato de prestação de serviços não pago.',
    tribunal: 'TJ-SP',
    vara: '2ª Vara Cível',
    documents: [],
    hearings: [
      {
        location: 'São Paulo/SP',
        date: new Date('2024-12-05'),
        description: 'Audiência de conciliação e apresentação de proposta.',
      },
    ],
    status: CaseStatusEnum.encerrado,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'case5',
    clientId: 'raimundo1',
    lawyerIds: ['carla1'],
    processNumber: '91283746501923-44177',
    title: 'Ação de danos materiais por acidente de trânsito',
    description:
      'O cliente busca ressarcimento pelos danos causados ao seu veículo após colisão envolvendo terceiro.',
    tribunal: 'TJ-SP',
    vara: '14ª Vara Cível',
    documents: [],
    hearings: [
      {
        location: 'Campinas/SP',
        date: new Date('2025-01-20'),
        description: 'Audiência de instrução com perito e testemunhas.',
      },
    ],
    status: CaseStatusEnum.aberto,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'case6',
    clientId: 'raimundo1',
    lawyerIds: ['carla1'],
    processNumber: '44129837465100-99283',
    title: 'Ação de reconhecimento e dissolução de união estável',
    description:
      'A autora busca o reconhecimento da união estável e definição da partilha de bens.',
    tribunal: 'TJ-SP',
    vara: '1ª Vara de Família',
    documents: [],
    hearings: [
      {
        location: 'Campinas/SP',
        date: new Date('2024-11-22'),
        description: 'Audiência inicial para oitiva das partes.',
      },
    ],
    status: CaseStatusEnum.aberto,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'case7',
    clientId: 'raimundo1',
    lawyerIds: ['carla1'],
    processNumber: '66293847100182-33700',
    title: 'Ação de obrigação de fazer — plano de saúde',
    description:
      'A parte autora requer que o plano de saúde autorize procedimento médico que foi indevidamente negado.',
    tribunal: 'TJ-SP',
    vara: '6ª Vara Cível',
    documents: [],
    hearings: [
      {
        location: 'São Paulo/SP',
        date: new Date('2025-02-14'),
        description: 'Audiência de urgência para análise da tutela antecipada.',
      },
    ],
    status: CaseStatusEnum.esperando_documentos,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'case8',
    clientId: 'raimundo1',
    lawyerIds: ['carla1'],
    processNumber: '10028374655192-66752',
    title: 'Ação de pensão alimentícia',
    description:
      'A mãe da criança solicita fixação de pensão alimentícia conforme necessidade do menor e capacidade do responsável.',
    tribunal: 'TJ-SP',
    vara: '9ª Vara de Família',
    documents: [],
    hearings: [
      {
        location: 'Campinas/SP',
        date: new Date('2025-03-03'),
        description: 'Audiência de conciliação e tentativa de acordo.',
      },
    ],
    status: CaseStatusEnum.em_andamento,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Last one — different client
  {
    id: 'case9',
    clientId: 'joao3',
    lawyerIds: ['flavia1', 'carla1'],
    processNumber: '77192837465111-88721',
    title: 'Ação de revisão contratual bancária',
    description:
      'O autor afirma que o banco aplicou juros abusivos em contrato de empréstimo e solicita revisão das cláusulas.',
    tribunal: 'TJ-SP',
    vara: '4ª Vara Cível',
    documents: [],
    hearings: [
      {
        location: 'São Paulo/SP',
        date: new Date('2025-01-10'),
        description: 'Audiência para apresentação de cálculos revisados.',
      },
    ],
    status: CaseStatusEnum.em_andamento,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
