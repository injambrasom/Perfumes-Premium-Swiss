import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, ShieldCheck, Truck, CreditCard, RotateCcw, HelpCircle, Lock, Building, CheckCircle2 } from 'lucide-react';

interface PurchasingPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PurchasingPolicyModal: React.FC<PurchasingPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
        {/* Backdrop overlay click */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-[#0e0e11] text-neutral-200 border border-[#C5A059]/40 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-800 bg-[#141419] shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059]">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide uppercase">
                  POLÍTICA DE COMPRAS
                </h2>
                <span className="text-[11px] font-mono tracking-widest text-[#C5A059] uppercase block mt-0.5">
                  SWISS ATELIER • Última atualização: 13 de agosto de 2026
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Document Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-sm leading-relaxed text-neutral-300 font-sans custom-scrollbar">

            {/* Intro Notice */}
            <div className="p-4 rounded-xl bg-[#C5A059]/10 border border-[#C5A059]/20 text-neutral-300 text-xs sm:text-sm leading-relaxed">
              Esta política estabelece os termos e condições para compras realizadas na loja oficial <strong>SWISS ATELIER</strong>. Ao realizar seu pedido conosco, você concorda com os termos descritos abaixo.
            </div>

            {/* Section 1: Sobre a Empresa */}
            <section className="space-y-3 border-b border-neutral-800/80 pb-6">
              <div className="flex items-center gap-2 text-[#C5A059]">
                <Building className="w-4 h-4 shrink-0" />
                <h3 className="font-serif text-base font-bold text-white uppercase tracking-wider">
                  1. SOBRE A EMPRESA
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-neutral-900/60 p-4 rounded-xl border border-neutral-800 text-xs sm:text-sm font-mono">
                <div>
                  <span className="text-neutral-500 block text-[11px] uppercase">Razão Social</span>
                  <span className="text-white font-semibold">Thays Watermann Konig</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[11px] uppercase">CNPJ</span>
                  <span className="text-white font-semibold">49.709.655/0001-22</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[11px] uppercase">E-mail de Contato</span>
                  <a href="mailto:terrestiago@hotmail.com" className="text-[#C5A059] hover:underline">
                    terrestiago@hotmail.com
                  </a>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[11px] uppercase">WhatsApp</span>
                  <a href="https://wa.me/5554999893370" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                    (54) 99989-3370
                  </a>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-neutral-500 block text-[11px] uppercase">Endereço</span>
                  <span className="text-neutral-300">Rua Eduardo Barreto Viana, Nº 293 - Getúlio Vargas - Rio Grande do Sul</span>
                </div>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed pt-1">
                A <strong>SWISS ATELIER</strong> é uma marca especializada em fragrâncias de alta perfumaria, oferecendo essências importadas formuladas com matérias-primas de renomadas casas suíças e francesas. Nossos produtos são fragrâncias inspiradas (contratipos) e não possuem vínculo oficial com as marcas de referência mencionadas em nosso catálogo.
              </p>
            </section>

            {/* Section 2: Formas de Pagamento */}
            <section className="space-y-3 border-b border-neutral-800/80 pb-6">
              <div className="flex items-center gap-2 text-[#C5A059]">
                <CreditCard className="w-4 h-4 shrink-0" />
                <h3 className="font-serif text-base font-bold text-white uppercase tracking-wider">
                  2. FORMAS DE PAGAMENTO
                </h3>
              </div>
              <p>Aceitamos as seguintes formas de pagamento em nossa plataforma:</p>
              <ul className="space-y-2 list-disc list-inside text-neutral-300 text-xs sm:text-sm pl-2">
                <li>
                  <strong className="text-white">Pix:</strong> pagamento instantâneo com aprovação em até 5 minutos e desconto exclusivo concedido no checkout.
                </li>
                <li>
                  <strong className="text-white">Cartão de Crédito:</strong> parcelamento em até 2x sem juros ou até 12x com juros normais da operadora.
                </li>
              </ul>
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-200 text-xs">
                <strong>Atenção:</strong> O pedido só será processado após a confirmação do pagamento. Em caso de pagamento via Pix ou cartão, a confirmação é automática e instantânea.
              </div>
            </section>

            {/* Section 3: Prazos e Custos de Entrega */}
            <section className="space-y-4 border-b border-neutral-800/80 pb-6">
              <div className="flex items-center gap-2 text-[#C5A059]">
                <Truck className="w-4 h-4 shrink-0" />
                <h3 className="font-serif text-base font-bold text-white uppercase tracking-wider">
                  3. PRAZOS E CUSTOS DE ENTREGA
                </h3>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-white text-xs uppercase tracking-wider">3.1 Prazo de Postagem</h4>
                <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-neutral-300">
                  <li>Pedidos confirmados até às <strong>14h</strong> (de segunda a sexta-feira) são postados no mesmo dia.</li>
                  <li>Pedidos confirmados após as 14h ou em finais de semana e feriados são postados no próximo dia útil.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-white text-xs uppercase tracking-wider">3.2 Prazo de Entrega Estimado</h4>
                <p className="text-xs text-neutral-400">O prazo total de entrega varia conforme a região de destino e a modalidade contratada:</p>
                
                {/* Table */}
                <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-900/80">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-neutral-800/80 text-[#C5A059] uppercase text-[11px] font-mono tracking-wider">
                      <tr>
                        <th className="p-3 border-b border-neutral-700">Região</th>
                        <th className="p-3 border-b border-neutral-700">Prazo Estimado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800 text-neutral-200">
                      <tr>
                        <td className="p-3 font-medium">Sudeste (SP, RJ, MG, ES)</td>
                        <td className="p-3 text-emerald-400 font-mono">3 a 10 dias úteis</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">Sul (PR, SC, RS)</td>
                        <td className="p-3 text-emerald-400 font-mono">2 a 5 dias úteis</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">Centro-Oeste (DF, GO, MT, MS)</td>
                        <td className="p-3 text-emerald-400 font-mono">10 a 12 dias úteis</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-[11px] text-neutral-400 italic">
                  *Importante: Os prazos são estimados a partir da data de postagem e podem sofrer variações decorrentes de fatores externos (condições climáticas, greves ou feriados locais).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm pt-2">
                <div className="p-3.5 bg-neutral-900 rounded-xl border border-neutral-800 space-y-1">
                  <h5 className="font-bold text-white uppercase text-[11px] text-[#C5A059]">3.3 Frete</h5>
                  <p className="text-neutral-300">Calculado automaticamente no checkout conforme o CEP de destino e peso do pedido. O risco de transporte é de responsabilidade da transportadora até a entrega.</p>
                </div>
                <div className="p-3.5 bg-neutral-900 rounded-xl border border-neutral-800 space-y-1">
                  <h5 className="font-bold text-white uppercase text-[11px] text-[#C5A059]">3.4 Rastreamento</h5>
                  <p className="text-neutral-300">Após a postagem, o código de rastreamento é enviado via e-mail e/ou WhatsApp para acompanhamento em tempo real no site dos Correios ou transportadora.</p>
                </div>
              </div>
            </section>

            {/* Section 4: Política de Troca e Devolução */}
            <section className="space-y-4 border-b border-neutral-800/80 pb-6">
              <div className="flex items-center gap-2 text-[#C5A059]">
                <RotateCcw className="w-4 h-4 shrink-0" />
                <h3 className="font-serif text-base font-bold text-white uppercase tracking-wider">
                  4. POLÍTICA DE TROCA E DEVOLUÇÃO
                </h3>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-white text-xs uppercase tracking-wider">
                  4.1 Direito de Arrependimento (Lei nº 8.078/1990 — CDC)
                </h4>
                <p className="text-xs sm:text-sm">
                  Você tem o direito de devolver o produto em até <strong>7 (sete) dias corridos</strong> a partir do recebimento, sem necessidade de justificativa, conforme o Código de Defesa do Consumidor.
                </p>
                <div className="bg-neutral-900/90 p-3.5 rounded-xl border border-neutral-800 text-xs space-y-2">
                  <p className="font-semibold text-white">Condições para devolução por arrependimento:</p>
                  <ul className="list-disc list-inside space-y-1 text-neutral-300">
                    <li>O produto deve estar lacrado, na embalagem original e sem sinais de uso</li>
                    <li>A embalagem não pode estar danificada ou rasgada</li>
                    <li>O frasco não pode ter sido aberto, experimentado ou testado</li>
                    <li>O comunicado deve ser feito dentro do prazo de 7 dias corridos</li>
                  </ul>
                  <p className="pt-1 text-neutral-400">
                    <strong>Como solicitar:</strong> Entre em contato via WhatsApp ou e-mail informando o número do pedido. O frete de retorno é por conta do comprador (exceto para produtos com defeito). Após recebimento e conferência, o reembolso integral é efetuado em até 7 dias úteis.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-neutral-900 rounded-xl border border-neutral-800 space-y-1">
                  <h5 className="font-bold text-white uppercase text-[11px] text-[#C5A059]">4.2 Produto com Defeito / Avaria</h5>
                  <p className="text-neutral-300">
                    Solicitações até 30 dias corridos. O custo de devolução é por nossa conta. Mediante envio de fotos/vídeos para análise, efetuamos a troca por um novo item ou o reembolso integral.
                  </p>
                </div>
                <div className="p-3.5 bg-neutral-900 rounded-xl border border-neutral-800 space-y-1">
                  <h5 className="font-bold text-white uppercase text-[11px] text-[#C5A059]">4.3 Produto Errado ou Faltante</h5>
                  <p className="text-neutral-300">
                    Comunique em até 7 dias após o recebimento com foto dos itens recebidos. Arcaremos com todos os custos operacionais e de frete para imediata correção do pedido.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-200 text-xs space-y-1">
                <strong className="block text-red-300 uppercase font-mono text-[11px]">4.4 Produtos Não Elegíveis para Troca/Devolução:</strong>
                <p>
                  Por razões de segurança sanitária, não aceitamos troca ou devolução de produtos que tenham sido abertos, testados, borrifados, sem embalagem original ou danificados por uso inadequado.
                </p>
              </div>
            </section>

            {/* Section 5: Sobre as Fragrâncias Inspiradas */}
            <section className="space-y-3 border-b border-neutral-800/80 pb-6">
              <div className="flex items-center gap-2 text-[#C5A059]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <h3 className="font-serif text-base font-bold text-white uppercase tracking-wider">
                  5. SOBRE AS FRAGRÂNCIAS INSPIRADAS
                </h3>
              </div>
              <p className="text-xs sm:text-sm">
                Nossos produtos são fragrâncias inspiradas (também conhecidas como contratipos ou similares de alta perfumaria). Isso significa que:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-neutral-300 pl-2">
                <li>Nossas fragrâncias são formulações autorais e exclusivas desenvolvidas para evocar as notas olfativas de perfumes de referência internacional.</li>
                <li>Não possuímos vínculo, parceria, representante oficial ou autorização das marcas de referência citadas em nosso catálogo.</li>
                <li>Os nomes das marcas e perfumes de referência são utilizados estritamente para identificação olfativa e orientação ao consumidor.</li>
                <li>Todos os direitos de marca registrada pertencem exclusivamente aos seus respectivos proprietários.</li>
                <li>Nossos frascos, frasqueiras e embalagens possuem identidade visual autêntica da SWISS ATELIER.</li>
              </ul>
            </section>

            {/* Section 6: Privacidade e Proteção de Dados (LGPD) */}
            <section className="space-y-3 border-b border-neutral-800/80 pb-6">
              <div className="flex items-center gap-2 text-[#C5A059]">
                <Lock className="w-4 h-4 shrink-0" />
                <h3 className="font-serif text-base font-bold text-white uppercase tracking-wider">
                  6. PRIVACIDADE E PROTEÇÃO DE DADOS (LGPD)
                </h3>
              </div>
              <p className="text-xs sm:text-sm">
                A <strong>SWISS ATELIER</strong> respeita sua privacidade e protege seus dados pessoais de acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                <div className="bg-neutral-900 p-3.5 rounded-xl border border-neutral-800">
                  <h5 className="font-bold text-white uppercase text-[11px] text-[#C5A059] mb-1">6.1 Coleta Estrita</h5>
                  <p className="text-neutral-300">Coletamos exclusivamente Nome completo, CPF (para emissão de nota), Endereço de entrega, E-mail e Telefone de contato.</p>
                </div>
                <div className="bg-neutral-900 p-3.5 rounded-xl border border-neutral-800">
                  <h5 className="font-bold text-white uppercase text-[11px] text-[#C5A059] mb-1">6.2 Não Compartilhamento</h5>
                  <p className="text-neutral-300">Seus dados são usados unicamente para emissão, envio e suporte. Jamais vendemos ou alugamos seus dados para terceiros.</p>
                </div>
              </div>
              <p className="text-xs text-neutral-400 italic">
                6.3 Segurança: Ambiente protegido por SSL e gateway de pagamento criptografado. Dados bancários/cartão não são armazenados em nossos servidores.
              </p>
            </section>

            {/* Section 7 & 8: Cancelamento & Limitação de Responsabilidade */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-neutral-800/80 pb-6">
              <section className="space-y-2">
                <h3 className="font-serif text-sm font-bold text-white uppercase tracking-wider text-[#C5A059]">
                  7. CANCELAMENTO DE PEDIDO
                </h3>
                <ul className="list-disc list-inside text-xs text-neutral-300 space-y-1">
                  <li><strong>Antes da confirmação:</strong> cancelamento imediato sem custos.</li>
                  <li><strong>Pagamento confirmado (pré-envio):</strong> reembolso processado em até 7 dias úteis.</li>
                  <li><strong>Após postagem:</strong> cancelamento mediante recusa de entrega ou devolução na embalagem lacrada.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="font-serif text-sm font-bold text-white uppercase tracking-wider text-[#C5A059]">
                  8. LIMITAÇÃO DE RESPONSABILIDADE
                </h3>
                <ul className="list-disc list-inside text-xs text-neutral-300 space-y-1">
                  <li>Atrasos decorrentes de greves, desastres naturais ou endereço incorreto fornecido pelo cliente.</li>
                  <li>Reações alérgicas pontuais (recomendamos teste prévio em pequena área de pele).</li>
                  <li>Danos por mau uso ou armazenamento em local inadequado após o recebimento.</li>
                </ul>
              </section>
            </div>

            {/* Section 9: Atendimento ao Cliente */}
            <section className="space-y-3 border-b border-neutral-800/80 pb-6">
              <div className="flex items-center gap-2 text-[#C5A059]">
                <HelpCircle className="w-4 h-4 shrink-0" />
                <h3 className="font-serif text-base font-bold text-white uppercase tracking-wider">
                  9. CANAIS DE ATENDIMENTO AO CLIENTE
                </h3>
              </div>
              <div className="p-4 rounded-xl bg-[#141419] border border-[#C5A059]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1 text-xs sm:text-sm">
                  <p className="text-white font-medium">📱 <strong>WhatsApp Atendimento:</strong> (54) 99989-3370</p>
                  <p className="text-white font-medium">📧 <strong>E-mail:</strong> terrestiago@hotmail.com</p>
                  <p className="text-neutral-400 text-xs">⏰ Horário: Atendimento diário das 7h às 21h</p>
                </div>
                <a
                  href="https://wa.me/5554999893370"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wider uppercase transition-colors shrink-0 text-center"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </section>

            {/* Section 10: Disposições Gerais */}
            <section className="space-y-2 text-xs text-neutral-400">
              <h3 className="font-serif text-sm font-bold text-white uppercase tracking-wider text-[#C5A059]">
                10. DISPOSIÇÕES GERAIS
              </h3>
              <p>
                Ao realizar uma compra em nosso site, você declara que leu, compreendeu e aceita integralmente os termos descritos nesta Política de Compras. Reservamo-nos o direito de alterar esta política a qualquer momento, passando a vigorar imediatamente após sua publicação no site.
              </p>
            </section>

            {/* Copyright Note */}
            <div className="text-center pt-2 text-[11px] font-mono text-neutral-500">
              © 2026 SWISS ATELIER — Todos os direitos reservados.
            </div>

          </div>

          {/* Footer Action Bar */}
          <div className="p-4 bg-[#141419] border-t border-neutral-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>Documento Válido & Protegido</span>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#C5A059] hover:bg-[#b08d46] text-black font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Compreendido
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
