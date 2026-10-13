# Plano de Implementação: Cálculo e Seleção de Frete no Checkout (PAC & Sedex)

Com base nas suas escolhas:
1. **Modelo de frete:** Tabela regional com PAC e Sedex (cálculo instantâneo baseado no estado/UF e faixa de CEP retornada pelo ViaCEP, sem custos de API ou quedas de serviço).
2. **Localização:** Exibido diretamente na etapa de endereço do Checkout, logo após o cliente digitar o CEP.
3. **Sem frete grátis:** Cobrança efetiva da modalidade escolhida pelo cliente (PAC econômico ou Sedex expresso).

---

## 1. Módulo de Cálculo de Frete (`src/utils/shipping.ts`)
- Criar utilitário com matriz de tarifas por região do Brasil (Sul, Sudeste, Centro-Oeste, Nordeste, Norte), cobrindo todos os estados:
  - **PAC (Econômico):** Exemplo: SP/RJ/MG/PR/SC/RS (R$ 18,90 a R$ 24,90, 4 a 7 dias úteis); Nordeste/Centro-Oeste (R$ 29,90 a R$ 34,90, 7 a 11 dias úteis); Norte (R$ 38,90 a R$ 44,90, 10 a 15 dias úteis).
  - **Sedex (Expresso):** Valores e prazos menores (ex: SP/Sul 1 a 3 dias úteis; demais regiões 3 a 6 dias úteis).
  - Adicional inteligente leve por quantidade de frascos no carrinho (peso proporcional).

---

## 2. Interface de Seleção no Checkout (`CheckoutModal.tsx`)
- Ao digitar o CEP (já integrado com ViaCEP), identificar a UF/cidade e calcular automaticamente as opções disponíveis:
  - Card visual estilo Mercado Livre para escolha:
    - 📦 **PAC / Entrega Padrão**: Valor + Estimativa de dias (ex: *Chegará em 4 a 7 dias úteis*).
    - ⚡ **Sedex / Entrega Expressa**: Valor + Estimativa mais rápida (ex: *Chegará em 1 a 3 dias úteis*).
- Seleção com botão de rádio interativo e destaque visual na opção escolhida.
- Se o CEP ainda não foi digitado ou for inválido, exibir mensagem instrutiva (*"Digite seu CEP acima para calcular o frete e prazo"*).

---

## 3. Atualização Dinâmica de Totais e Persistência
- Atualizar o resumo do pedido:
  - `Subtotal`
  - `Frete selecionado (PAC ou Sedex)`
  - `Desconto do PIX (5% aplicado sobre o subtotal)`
  - `Total Final com Frete`
- Enviar a modalidade de frete (`shippingMethod: 'PAC' | 'Sedex'`) e o custo real de frete para:
  - Criação de pagamento PIX do Mercado Pago (`/api/mercadopago/create-pix`).
  - Criação de pagamento Cartão de Crédito (`/api/mercadopago/process-credit-card`).
  - Criação do pedido salvo no Firebase Firestore (`shipping`, `shippingMethod`, `total`).
  - Mensagem automática gerada para confirmação via WhatsApp.

---

## 4. Testes e Validação
- Testar cálculo com CEPs de diferentes regiões do Brasil (SP, RJ, BA, AM, RS, DF).
- Verificar se a seleção de PAC altera o total final imediatamente e se o Sedex recalcula com precisão.
- Validar se o valor do frete chega correto na cobrança do Mercado Pago e no pedido do painel de administração.
