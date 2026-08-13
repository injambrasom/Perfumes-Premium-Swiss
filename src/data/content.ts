import { Testimonial } from '../types';

export const ANNOUNCEMENT_MESSAGES = [
  '✨ Essências premium inspiradas nos maiores clássicos da perfumaria mundial',
  '🇨🇭 Formuladas com extratos das renomadas casas Firmenich (Suíça) e Robertet (França)',
  '📦 Frete Grátis e rápido para todo o Brasil em compras selecionadas',
  '📱 Atendimento humanizado e consultoria olfativa instantânea via WhatsApp'
];

export const DIFFERENTIALS_LIST = [
  {
    title: 'Essências Internacionalmente Renomadas',
    desc: 'Utilizamos matérias-primas provenientes de Firmenich (Suíça) e Robertet (França).',
    iconName: 'Sparkles'
  },
  {
    title: 'Alta Concentração Extrait de Parfum (36%)',
    desc: '36% de essência pura em todos os tamanhos (15ml, 55ml e 100ml) para máxima fixação e rastro marcante.',
    iconName: 'ShieldCheck'
  },
  {
    title: 'Fixação de 8h a 12h+',
    desc: 'Formulação estabilizada para alta retenção na pele e roupas.',
    iconName: 'Clock'
  },
  {
    title: 'Excelente Projeção Olfativa',
    desc: 'Difusão harmônica das notas sem agressão cítrica inicial.',
    iconName: 'Zap'
  },
  {
    title: 'Frascos & Acabamento de Luxo',
    desc: 'Vidro pesado, borrifador de névoa fina e embalagem elegante.',
    iconName: 'Gem'
  },
  {
    title: 'Atendimento Consultivo Humanizado',
    desc: 'Especialistas prontos para indicar a fragrância perfeita para seu perfil.',
    iconName: 'Headphones'
  }
];

export const WHY_CHOOSE_PILLARS = [
  {
    number: '01',
    title: 'Essências de Origem Internacional',
    text: 'Selecionamos essências provenientes das tradicionais casas Firmenich (Suíça) e Robertet (França), reconhecidas mundialmente pela excelência na criação de fragrâncias de alta perfumaria.'
  },
  {
    number: '02',
    title: 'Qualidade Premium & 36% Essência',
    text: 'Cada perfume possui 36% de concentração de essência pura em todos os tamanhos (15ml, 55ml e 100ml), com fixação comprovada de 8h a 12h+ na pele.'
  },
  {
    number: '03',
    title: 'Valores Acessíveis Sem Compromissos',
    text: 'Valores transparentes: 15ml por R$ 35,00, 55ml por R$ 80,00 e 100ml por R$ 130,00. A mesma riqueza de marcas internacionais de R$ 2.000+.'
  },
  {
    number: '04',
    title: 'Atendimento Especializado & Exclusivo',
    text: 'Ajudamos você pessoalmente via WhatsApp (54) 99989-3370 a encontrar a assinatura olfativa ideal para seu perfil e ocasiões marcantes.'
  }
];

export const COMPARISON_DATA = [
  {
    criteria: 'Origem das Essências',
    swiss: 'Casas Importadas (Firmenich Suíça & Robertet França)',
    imported: 'Variada / Grasse & Firmenich',
    highlight: true
  },
  {
    criteria: 'Concentração de Essência',
    swiss: 'Extrait de Parfum (36% de Essência Pura)',
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
    criteria: 'Tempo de Fixação na Pele',
    swiss: '8h a 12h+ na pele',
    imported: '6 a 10 Horas',
    highlight: true
  },
  {
    criteria: 'Atendimento Pós-Venda',
    swiss: 'Atendimento Direto via WhatsApp (54) 99989-3370',
    imported: 'Geralmente Impessoal / Lojas de Departamento',
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
    image: 'https://i.postimg.cc/VvRJRMHP/feedback1.jpg',
    fallbackUrl: 'https://i.postimg.cc/8f7kkFSZ/feedback1.jpg',
    title: 'Feedback Cliente WhatsApp • Fixação e Qualidade',
    tag: 'Cliente Verificado',
    transcript: ''
  },
  {
    id: 'fb-2',
    image: 'https://i.postimg.cc/hvrXrx3q/feedback2.jpg',
    fallbackUrl: 'https://i.postimg.cc/y3D66JHf/feedback2.jpg',
    title: 'Depoimento Perfume Premium Swiss',
    tag: 'Compra Confirmada',
    transcript: ''
  },
  {
    id: 'fb-3',
    image: 'https://i.postimg.cc/mkwPwMpv/feedback3.jpg',
    fallbackUrl: 'https://i.postimg.cc/CnRMMZg7/feedback3.jpg',
    title: 'Avaliação de Desempenho Olfativo',
    tag: '100% Satisfeito',
    transcript: ''
  },
  {
    id: 'fb-4',
    image: 'https://i.postimg.cc/pVY5RbV9/feedback4.jpg',
    fallbackUrl: 'https://i.postimg.cc/dD3Vjfyv/feedback4.jpg',
    title: 'Recomendação de Fragrâncias e Entrega',
    tag: 'Cliente Especial',
    transcript: ''
  },
  {
    id: 'fb-5',
    image: 'https://i.postimg.cc/MZbfq2Zf/feedback5.jpg',
    fallbackUrl: 'https://i.postimg.cc/23yS7tZC/feedback5.jpg',
    title: 'Aprovação de Similaridade e Projeção',
    tag: 'Satisfação Garantida',
    transcript: ''
  },
  {
    id: 'fb-6',
    image: 'https://i.postimg.cc/c1Mt0y1c/feedback6.jpg',
    fallbackUrl: 'https://i.postimg.cc/dD3Vjfy7/feedback6.jpg',
    title: 'Depoimento Real de Entrega & Embalagem',
    tag: 'Atendimento VIP',
    transcript: ''
  },
  {
    id: 'fb-8',
    image: 'https://i.postimg.cc/MZbfq2Zd/feedback8.jpg',
    fallbackUrl: 'https://i.postimg.cc/Yj0CzPWW/feedback8.jpg',
    title: 'Experiência Olfativa Surpreendente',
    tag: 'Cliente Fiel',
    transcript: ''
  },
  {
    id: 'fb-9',
    image: 'https://i.postimg.cc/c1Mt0y15/feedback9.jpg',
    fallbackUrl: 'https://i.postimg.cc/bdrw95tQ/feedback9.jpg',
    title: 'Feedback de Fixação Estendida na Pele',
    tag: 'Extrait de Parfum',
    transcript: ''
  },
  {
    id: 'fb-10',
    image: 'https://i.postimg.cc/T2q5fM24/feedback10.jpg',
    fallbackUrl: 'https://i.postimg.cc/grj2H7ZV/feedback10.jpg',
    title: 'Elogios de Terceiros ao Usar Premium Swiss',
    tag: 'Presença Marcante',
    transcript: ''
  },
  {
    id: 'fb-11',
    image: 'https://i.postimg.cc/SNS2KTjZ/feedback11.jpg',
    fallbackUrl: 'https://i.postimg.cc/c6z49cRY/feedback11.jpg',
    title: 'Avaliação da Coleção Árabe e Nicho',
    tag: 'Coleção Exclusiva',
    transcript: ''
  },
  {
    id: 'fb-12',
    image: 'https://i.postimg.cc/8PpJCKjV/feedback12.jpg',
    fallbackUrl: 'https://i.postimg.cc/9zkF8Bdx/feedback12.jpg',
    title: 'Recompra e Indicação para Amigos',
    tag: 'Indicação Real',
    transcript: ''
  },
  {
    id: 'fb-13',
    image: 'https://i.postimg.cc/m2LzrXtB/feedback13.jpg',
    fallbackUrl: 'https://i.postimg.cc/yWGYQTmb/feedback13.jpg',
    title: 'Qualidade do Borrifador e Concentração',
    tag: 'Padrão Suíço',
    transcript: ''
  },
  {
    id: 'fb-14',
    image: 'https://i.postimg.cc/L69YsCn9/feedback14.jpg',
    fallbackUrl: 'https://i.postimg.cc/w3rTfkXZ/feedback14.jpg',
    title: 'Satisfação Total com a Linha Masculina e Feminina',
    tag: 'Nota 5/5',
    transcript: ''
  },
  {
    id: 'fb-main',
    image: 'https://i.postimg.cc/GtQ4QYSw/feedback.jpg',
    fallbackUrl: 'https://i.postimg.cc/MfnZZcSd/feedback.jpg',
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
    image: 'https://i.postimg.cc/T5bJKMZg/BACCARAT.png',
    title: 'Baccarat Swiss • Concentração Extrait 36% com rastro magnético.',
    likes: '1.420'
  },
  {
    id: 'ig-2',
    image: 'https://i.postimg.cc/hzgP6HB3/Aliem-Swiss-(2).png',
    title: 'Aliem Swiss • Jasmin Sambac exuberante e âmbar branco mineral.',
    likes: '2.180'
  },
  {
    id: 'ig-3',
    image: 'https://i.postimg.cc/NKD79xPk/SALVAGE.png',
    title: 'Salvage Swiss • Bergamota da Calábria e notas amadeiradas de pimenta.',
    likes: '1.950'
  },
  {
    id: 'ig-4',
    image: 'https://i.postimg.cc/n9mGXb6c/ASAD-BOURBON.jpg',
    title: 'Asad Bourbon • Especiarias orientais nobres e baunilha licorosa.',
    likes: '3.040'
  }
];
