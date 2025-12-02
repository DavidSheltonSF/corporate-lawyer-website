import { CaseProps } from '@/types/CaseProps';

export const fakeCases: CaseProps[] = [
  {
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
        description: 'Não houve acordo de nenhumas as partes.',
      },
    ],
    status: 'em_progresso',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
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
    status: 'encerrado',
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    clientId: 'raimundo1',
    lawyerIds: ['carla1'],
    processNumber: '11829374650133-55209',
    title: 'Ação de divórcio consensual',
    description:
      'As partes buscam formalizar o divórcio consensual e definir partilha de bens, guarda e pensão alimentícia. Documentação já anexada e processo segue para homologação.',
    tribunal: 'TJ-SP',
    vara: '3ª Vara de Família',
    documents: [],
    hearings: [
      {
        location: 'Campinas/SP',
        date: new Date('2024-10-02'),
        description: 'Audiência para homologação do acordo.',
      },
    ],
    status: 'em_progresso',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    clientId: 'joao3',
    lawyerIds: ['flavia1', 'carla1'],
    processNumber: '11829374650133-55209',
    title: 'Ação de divórcio consensual',
    description:
      'As partes buscam formalizar o divórcio consensual e definir partilha de bens, guarda e pensão alimentícia. Documentação já anexada e processo segue para homologação.',
    tribunal: 'TJ-SP',
    vara: '3ª Vara de Família',
    documents: [],
    hearings: [
      {
        location: 'Campinas/SP',
        date: new Date('2024-10-02'),
        description: 'Audiência para homologação do acordo.',
      },
    ],
    status: 'em_progresso',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
