import { Testimonial } from '../types';

export const ANNOUNCEMENT_MESSAGES = [
  '✨ Essências importadas inspiradas nos maiores ícones da perfumaria mundial',
  '🇨🇭 36% de Concentração Extrait de Parfum em todos os frascos',
  '📦 Frete rápido e seguro para todo o Brasil',
  '📱 Consultoria olfativa individual via WhatsApp'
];

export const DIFFERENTIALS_LIST = [
  {
    title: 'Essências Importadas',
    desc: 'Matérias-primas provenientes de fornecedores especializados em perfumaria internacional.',
    iconName: 'Sparkles'
  },
  {
    title: '36% de Concentração',
    desc: 'Alta concentração de fragrância na formulation em todos os tamanhos (15ml, 55ml e 100ml).',
    iconName: 'ShieldCheck'
  },
  {
    title: 'Fixação Estimada: 8h a 12h',
    desc: 'Desenvolvimento olfativo marcante na pele e tecidos.',
    iconName: 'Clock'
  },
  {
    title: 'Projeção Envolvente',
    desc: 'Difusão harmônica das notas com presença sofisticada.',
    iconName: 'Zap'
  },
  {
    title: 'Produto Real',
    desc: 'Fotografias e embalagens fiéis aos produtos entregues em sua residência.',
    iconName: 'Gem'
  },
  {
    title: 'Atendimento Humano',
    desc: 'Consultores olfativos dedicados a orientar a escolha ideal para o seu perfil.',
    iconName: 'Headphones'
  }
];

export const WHY_CHOOSE_PILLARS = [
  {
    number: '01',
    title: '36% DE CONCENTRAÇÃO',
    text: 'Alta concentração de fragrância na formulacão em todos os tamanhos. Presença olfativa marcante e envolvente.'
  },
  {
    number: '02',
    title: 'ESSÊNCIAS IMPORTADAS',
    text: 'Utilizamos matérias-primas provenientes de fornecedores especializados em perfumaria internacional de alta qualidade.'
  },
  {
    number: '03',
    title: 'PRODUTO REAL',
    text: 'Garantia de que as fotografias e apresentações visuais correspondem com fidelidade ao produto comercializado e entregue.'
  },
  {
    number: '04',
    title: 'ATENDIMENTO HUMANO',
    text: 'Consultoria olfativa individual via WhatsApp para auxiliar na escolha das fragrâncias perfeitas para o seu estilo e ocasiões.'
  }
];

export const COMPARISON_DATA = [
  {
    criteria: 'Origem das Essências',
    swiss: 'Matérias-primas de Perfumaria Internacional',
    imported: 'Variada / Marcas de Grife',
    highlight: true
  },
  {
    criteria: 'Concentração de Essência',
    swiss: 'Extrait de Parfum (36% de Concentração)',
    imported: 'Eau de Parfum / Toilette (12% a 18%)',
    highlight: true
  },
  {
    criteria: 'Tamanhos & Opções',
    swiss: '15ml, 55ml e 100ml',
    imported: 'Apenas 50ml ou 100ml',
    highlight: true
  },
  {
    criteria: 'Tabela de Preços',
    swiss: '15ml: R$ 35,00 • 55ml: R$ 80,00 • 100ml: R$ 130,00',
    imported: 'R$ 1.800,00 a R$ 3.500,00',
    highlight: true
  },
  {
    criteria: 'Fixação Estimada',
    swiss: '8h a 12h na pele',
    imported: '6h a 10h',
    highlight: true
  },
  {
    criteria: 'Atendimento',
    swiss: 'Atendimento Direto via WhatsApp com Consultor',
    imported: 'Atendimento Padronizado de Varejo',
    highlight: false
  }
];

export interface RealFeedbackPrint {
  id: string;
  image: string;
  fallbackUrl: string;
  title: string;
  tag: string;
  transcript: string;
}

export const REAL_FEEDBACK_PRINTS: RealFeedbackPrint[] = [
  {
    id: 'fb-1',
    image: '/images/feedbacks/feedback1.webp',
    fallbackUrl: '/images/feedbacks/feedback1.jpg',
    title: 'Feedback Cliente WhatsApp • Fixação e Qualidade',
    tag: 'Cliente Verificado',
    transcript: ''
  },
  {
    id: 'fb-2',
    image: '/images/feedbacks/feedback2.webp',
    fallbackUrl: '/images/feedbacks/feedback2.jpg',
    title: 'Depoimento Perfume Premium Swiss',
    tag: 'Compra Confirmada',
    transcript: ''
  },
  {
    id: 'fb-3',
    image: '/images/feedbacks/feedback3.webp',
    fallbackUrl: '/images/feedbacks/feedback3.jpg',
    title: 'Avaliação de Desempenho Olfativo',
    tag: '100% Satisfeito',
    transcript: ''
  },
  {
    id: 'fb-4',
    image: '/images/feedbacks/feedback4.webp',
    fallbackUrl: '/images/feedbacks/feedback4.jpg',
    title: 'Recomendação de Fragrâncias e Entrega',
    tag: 'Cliente Especial',
    transcript: ''
  },
  {
    id: 'fb-5',
    image: '/images/feedbacks/feedback5.webp',
    fallbackUrl: '/images/feedbacks/feedback5.jpg',
    title: 'Aprovação de Similaridade e Projeção',
    tag: 'Satisfação Garantida',
    transcript: ''
  },
  {
    id: 'fb-6',
    image: '/images/feedbacks/feedback6.webp',
    fallbackUrl: '/images/feedbacks/feedback6.jpg',
    title: 'Depoimento Real de Entrega & Embalagem',
    tag: 'Atendimento VIP',
    transcript: ''
  },
  {
    id: 'fb-8',
    image: '/images/feedbacks/feedback8.webp',
    fallbackUrl: '/images/feedbacks/feedback8.jpg',
    title: 'Experiência Olfativa Surpreendente',
    tag: 'Cliente Fiel',
    transcript: ''
  },
  {
    id: 'fb-9',
    image: '/images/feedbacks/feedback9.webp',
    fallbackUrl: '/images/feedbacks/feedback9.jpg',
    title: 'Feedback de Fixação Estendida na Pele',
    tag: 'Extrait de Parfum',
    transcript: ''
  },
  {
    id: 'fb-10',
    image: '/images/feedbacks/feedback10.webp',
    fallbackUrl: '/images/feedbacks/feedback10.jpg',
    title: 'Elogios de Terceiros ao Usar Premium Swiss',
    tag: 'Presença Marcante',
    transcript: ''
  },
  {
    id: 'fb-11',
    image: '/images/feedbacks/feedback11.webp',
    fallbackUrl: '/images/feedbacks/feedback11.jpg',
    title: 'Avaliação da Coleção Árabe e Nicho',
    tag: 'Coleção Exclusiva',
    transcript: ''
  },
  {
    id: 'fb-12',
    image: '/images/feedbacks/feedback12.webp',
    fallbackUrl: '/images/feedbacks/feedback12.jpg',
    title: 'Recompra e Indicação para Amigos',
    tag: 'Indicação Real',
    transcript: ''
  },
  {
    id: 'fb-13',
    image: '/images/feedbacks/feedback13.webp',
    fallbackUrl: '/images/feedbacks/feedback13.jpg',
    title: 'Qualidade do Borrifador e Concentração',
    tag: 'Padrão Suíço',
    transcript: ''
  },
  {
    id: 'fb-14',
    image: '/images/feedbacks/feedback14.webp',
    fallbackUrl: '/images/feedbacks/feedback14.jpg',
    title: 'Satisfação Total com a Linha Masculina e Feminina',
    tag: 'Nota 5/5',
    transcript: ''
  },
  {
    id: 'fb-main',
    image: '/images/feedbacks/feedback.webp',
    fallbackUrl: '/images/feedbacks/feedback.jpg',
    title: 'Atendimento e Consultoria Personalizada',
    tag: 'Atendimento Humanizado',
    transcript: ''
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    author: 'Dra. Helena Mendonça',
    city: 'São Paulo - SP',
    verified: true,
    rating: 5,
    text: 'Sinceramente inacreditável. Eu uso Baccarat Rouge original há anos e comprei o Rouge Cristal 540 sem muita expectativa. Fiquei chocada com a semelhança e com o desempenho na minha pele. Fixou mais de 16 horas!',
    perfumeChosen: 'SWISS NO. 03 • ROUGE CRISTAL 540',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: '2',
    author: 'Rodrigo Alcantara',
    city: 'Rio de Janeiro - RJ',
    verified: true,
    rating: 5,
    text: 'O Swiss No. 01 (Bleu) e o No. 02 (Aventus) viraram minhas marcas registradas no escritório. Onde quer que eu vá as pessoas perguntam qual perfume estou usando. A embalagem é impecável.',
    perfumeChosen: 'SWISS NO. 01 & NO. 02',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: '3',
    author: 'Camila Rossi',
    city: 'Curitiba - PR',
    verified: true,
    rating: 5,
    text: 'O toque de lichia e rosa no Rose Royale (Delina) é perfeito. Não dá aquela sensação sintética de perfumes baratos. Dá para sentir o padrão de essência europeia desde o primeiro borrifo.',
    perfumeChosen: 'SWISS NO. 05 • ROSE ROYALE',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: '4',
    author: 'Gabriel Siqueira',
    city: 'Belo Horizonte - MG',
    verified: true,
    rating: 5,
    text: 'Atendimento impecável no WhatsApp. Tiraram todas as minhas dúvidas e me ajudaram a escolher. Chegou em 2 dias em BH com uma embalagem que parecia presente de joalheria.',
    perfumeChosen: 'SWISS NO. 06 • ÂMBAR ÁRABE KHALIFA',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    image: '/images/BACCARAT.webp',
    title: 'Baccarat Swiss • Concentração Extrait 36% com rastro magnético.',
    likes: '1.420'
  },
  {
    id: 'ig-2',
    image: '/images/Aliem-Swiss-(2).webp',
    title: 'Aliem Swiss • Jasmin Sambac exuberante e âmbar branco mineral.',
    likes: '2.180'
  },
  {
    id: 'ig-3',
    image: '/images/SALVAGE.webp',
    title: 'Salvage Swiss • Bergamota da Calábria e notas amadeiradas de pimenta.',
    likes: '1.950'
  },
  {
    id: 'ig-4',
    image: '/images/ASAD-BOURBON.webp',
    title: 'Asad Bourbon • Especiarias orientais nobres e baunilha licorosa.',
    likes: '3.040'
  }
];
