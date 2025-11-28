import { ProfessionalCardProps } from '@/components/ProfessionalCard';

export const professionalsInfo: ProfessionalCardProps[] = [
  {
    imagePath: 'photos/carla-224px.webp',
    imageAlternativeText: 'Dra. Carla Medeiros, advogada, sorrindo em sua mesa',
    title: 'Dr. Carla Medeiros',
    description: `Profissional dedicada à defesa dos direitos do trabalhador e do segurado, atuando com precisão em causas previdenciárias e trabalhistas. Sempre comprometida em garantir benefícios, solucionar conflitos e oferecer orientação clara e humanizada.`,
    specializations: ['trabalhista', 'previdenciario'],
    email: '#',
    whatsAppNumber: '#',
  },
  {
    imagePath: 'photos/flavia-224px.webp',
    imageAlternativeText: 'Dr. Flávia Santiago, advogada, sorrindo em sua mesa',
    title: 'Dr. Flávia Santiago',
    description: `Especialista em Direito de Família e Direito Cível, com foco em resolver conflitos de forma sensível, estratégica e eficiente. Atua em divórcios, guarda, pensão, contratos e questões patrimoniais, sempre priorizando o bem-estar e a segurança jurídica do cliente.`,
    specializations: ['familia', 'civil'],
    email: '#',
    whatsAppNumber: '#',
  },
];
