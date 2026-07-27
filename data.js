// ============================================================
// BASE DE DADOS - CTB OPERACIONAL GCM
// Fonte: Lei 9.503/1997 (CTB), texto consolidado até a Lei 15.153/2025.
// Artigos e classificações conferidos contra o texto oficial do
// Capítulo XV (Das Infrações, arts. 161-255) e Capítulo XIX (Dos
// Crimes de Trânsito, arts. 302-312), em 27/07/2026.
// Correção 27/07/2026: arts. 304, 305 e 312 atualizados para o termo
// "sinistro de trânsito" em substituição a "acidente" (Lei nº 14.599/2023).
// Valores-base de multa (art. 258, CTB):
//   Leve R$ 88,38 | Média R$ 130,16 | Grave R$ 195,23 | Gravíssima R$ 293,47
// Uso operacional - conferir sempre a redação vigente antes de autuar.
// ============================================================

const GRAVIDADE_INFO = {
  leve: { label: "Leve", pontos: 3, valor: 88.38, cor: "#3b82f6" },
  media: { label: "Média", pontos: 4, valor: 130.16, cor: "#eab308" },
  grave: { label: "Grave", pontos: 5, valor: 195.23, cor: "#f97316" },
  gravissima: { label: "Gravíssima", pontos: 7, valor: 293.47, cor: "#dc2626" }
};

// competencia: "municipal" = GCM pode autuar diretamente em via urbana municipalizada/conveniada
//              "apoio" = GCM normalmente atua em apoio/constatação; autuação formal costuma ficar
//                        a cargo do órgão estadual (radar, etilômetro certificado, rodovia)

const INFRACOES = [
// ---------------- ESTACIONAR — Art. 181, CTB ----------------
{ art:"181, I", desc:"Estacionar nas esquinas e a menos de 5 metros do bordo do alinhamento da via transversal", infrator:"Condutor", grav:"media", medida:"Remoção do veículo", competencia:"municipal" },
{ art:"181, II", desc:"Estacionar afastado da guia da calçada (meio-fio) de 50 cm a 1 metro", infrator:"Condutor", grav:"leve", medida:"Remoção do veículo", competencia:"municipal" },
{ art:"181, III", desc:"Estacionar afastado da guia da calçada (meio-fio) a mais de 1 metro", infrator:"Condutor", grav:"grave", medida:"Remoção do veículo", competencia:"municipal" },
{ art:"181, IV", desc:"Estacionar em desacordo com as posições estabelecidas no CTB (ex.: transversalmente à via)", infrator:"Condutor", grav:"media", medida:"Remoção do veículo", competencia:"municipal" },
{ art:"181, V", desc:"Estacionar na pista de rolamento de estradas, rodovias, vias de trânsito rápido e vias com acostamento", infrator:"Condutor", grav:"gravissima", medida:"Remoção do veículo", competencia:"apoio" },
{ art:"181, VI", desc:"Estacionar sobre hidrante de incêndio, registro de água ou tampa de galeria subterrânea identificados", infrator:"Condutor", grav:"media", medida:"Remoção do veículo", competencia:"municipal" },
{ art:"181, VII", desc:"Estacionar nos acostamentos, salvo motivo de força maior", infrator:"Condutor", grav:"leve", medida:"Remoção do veículo", competencia:"municipal" },
{ art:"181, VIII", desc:"Estacionar no passeio, sobre faixa de pedestre, ciclovia/ciclofaixa, canteiro ou refúgio", infrator:"Condutor", grav:"grave", medida:"Remoção do veículo", competencia:"municipal", obs:"Alta incidência em área central e comercial — reforçar registro fotográfico." },
{ art:"181, IX", desc:"Estacionar onde houver guia de calçada rebaixada para entrada/saída de veículos", infrator:"Condutor", grav:"media", medida:"Remoção do veículo", competencia:"municipal" },
{ art:"181, X", desc:"Estacionar impedindo a movimentação de outro veículo", infrator:"Condutor", grav:"media", medida:"Remoção do veículo", competencia:"municipal" },
{ art:"181, XI", desc:"Estacionar ao lado de outro veículo em fila dupla", infrator:"Condutor", grav:"grave", medida:"Remoção do veículo", competencia:"municipal" },
{ art:"181, XII", desc:"Estacionar na área de cruzamento de vias, prejudicando a circulação", infrator:"Condutor", grav:"grave", medida:"Remoção do veículo", competencia:"municipal" },
{ art:"181, XIII", desc:"Estacionar sobre local sinalizado como ponto de embarque/desembarque de coletivo (ou nos 10 m antes/depois, sem sinalização)", infrator:"Condutor", grav:"media", medida:"Remoção do veículo", competencia:"municipal" },
{ art:"181, XIV", desc:"Estacionar em viadutos, pontes e túneis", infrator:"Condutor", grav:"grave", medida:"Remoção do veículo", competencia:"municipal" },
{ art:"181, XV", desc:"Estacionar na contramão de direção", infrator:"Condutor", grav:"media", medida:"Remoção do veículo", competencia:"municipal" },
{ art:"181, XVI", desc:"Estacionar em aclive/declive sem calço de segurança (veículo com peso bruto acima de 3.500 kg)", infrator:"Condutor", grav:"grave", medida:"Remoção do veículo", competencia:"apoio" },
{ art:"181, XVII", desc:"Estacionar em desacordo com sinalização de Estacionamento Regulamentado (ex.: Zona Azul)", infrator:"Condutor", grav:"grave", medida:"Remoção do veículo", competencia:"municipal" },
{ art:"181, XVIII", desc:"Estacionar em local/horário proibido pela placa 'Proibido Estacionar'", infrator:"Condutor", grav:"media", medida:"Remoção do veículo", competencia:"municipal" },
{ art:"181, XIX", desc:"Estacionar em local/horário proibido pela placa 'Proibido Parar e Estacionar'", infrator:"Condutor", grav:"grave", medida:"Remoção do veículo", competencia:"municipal" },
{ art:"181, XX", desc:"Estacionar em vaga reservada a pessoa com deficiência ou idoso, sem credencial que comprove a condição", infrator:"Condutor", grav:"gravissima", medida:"Remoção do veículo", competencia:"municipal", obs:"Fiscalização prioritária. Exigir cartão/credencial oficial afixado no veículo antes de autuar." },

// ---------------- PARAR — Art. 182, CTB ----------------
{ art:"182, I", desc:"Parar nas esquinas e a menos de 5 metros do bordo do alinhamento da via transversal", infrator:"Condutor", grav:"media", medida:"—", competencia:"municipal", obs:"Regra dos 5 metros — muito cobrada em fiscalização de rotina." },
{ art:"182, II", desc:"Parar afastado da guia da calçada de 50 cm a 1 metro", infrator:"Condutor", grav:"leve", medida:"—", competencia:"municipal" },
{ art:"182, III", desc:"Parar afastado da guia da calçada a mais de 1 metro", infrator:"Condutor", grav:"media", medida:"—", competencia:"municipal" },
{ art:"182, IV", desc:"Parar em desacordo com as posições estabelecidas no CTB", infrator:"Condutor", grav:"leve", medida:"—", competencia:"municipal" },
{ art:"182, V", desc:"Parar na pista de rolamento de estradas, rodovias, vias de trânsito rápido e vias com acostamento", infrator:"Condutor", grav:"grave", medida:"—", competencia:"apoio" },
{ art:"182, VI", desc:"Parar no passeio ou sobre faixa destinada a pedestres, ilhas, refúgios ou canteiros centrais", infrator:"Condutor", grav:"leve", medida:"—", competencia:"municipal" },
{ art:"182, VII", desc:"Parar na área de cruzamento de vias, prejudicando a circulação", infrator:"Condutor", grav:"media", medida:"—", competencia:"municipal" },
{ art:"182, VIII", desc:"Parar em viadutos, pontes e túneis", infrator:"Condutor", grav:"media", medida:"—", competencia:"municipal" },
{ art:"182, IX", desc:"Parar na contramão de direção", infrator:"Condutor", grav:"media", medida:"—", competencia:"municipal" },
{ art:"182, X", desc:"Parar em local/horário proibido pela placa 'Proibido Parar'", infrator:"Condutor", grav:"media", medida:"—", competencia:"municipal" },
{ art:"182, XI", desc:"Parar sobre ciclovia ou ciclofaixa", infrator:"Condutor", grav:"grave", medida:"—", competencia:"municipal" },
{ art:"183", desc:"Parar o veículo sobre a faixa de pedestres na mudança do sinal luminoso", infrator:"Condutor", grav:"media", medida:"—", competencia:"municipal" },

// ---------------- DOCUMENTAÇÃO / CNH / VEÍCULO ----------------
{ art:"162, I", desc:"Dirigir sem possuir Carteira Nacional de Habilitação (CNH), Permissão para Dirigir (PPD) ou Autorização para Conduzir Ciclomotor (ACC)", infrator:"Condutor", grav:"gravissima", medida:"Retenção do veículo até apresentação de condutor habilitado (mult. x3)", competencia:"apoio", obs:"Se houver imprudência com efetivo perigo de dano, verificar também o crime do art. 309, CTB." },
{ art:"162, II", desc:"Dirigir com CNH, PPD ou ACC cassada ou com suspensão do direito de dirigir", infrator:"Condutor", grav:"gravissima", medida:"Recolhimento do documento e retenção do veículo (mult. x3)", competencia:"apoio", obs:"Verificar se há suspensão por decisão judicial — pode configurar o crime do art. 307, CTB." },
{ art:"162, III", desc:"Dirigir com CNH/PPD de categoria diferente da do veículo conduzido", infrator:"Condutor", grav:"gravissima", medida:"Retenção do veículo até apresentação de condutor habilitado na categoria (mult. x2)" },
{ art:"162, V", desc:"Dirigir com CNH vencida há mais de 30 dias", infrator:"Condutor", grav:"gravissima", medida:"Retenção do veículo até apresentação de condutor habilitado" },
{ art:"163", desc:"Entregar a direção do veículo a pessoa nas condições do art. 162 (sem CNH, cassada, categoria errada etc.)", infrator:"Proprietário/possuidor", grav:"gravissima", medida:"As mesmas do art. 162 conforme o caso" },
{ art:"232", desc:"Conduzir veículo sem os documentos de porte obrigatório (CRLV, CNH físico/digital)", infrator:"Condutor", grav:"leve", medida:"Retenção do veículo até apresentação do documento" },
{ art:"233", desc:"Deixar de efetuar o registro de veículo no prazo de 30 dias junto ao órgão executivo de trânsito", infrator:"Proprietário", grav:"media", medida:"Remoção do veículo" },
{ art:"234", desc:"Falsificar ou adulterar documento de habilitação ou de identificação do veículo (placa, chassi, CRLV)", infrator:"Condutor/Proprietário", grav:"gravissima", medida:"Apreensão e remoção do veículo", obs:"Situação com forte indício de crime (falsificação documental/adulteração de sinal identificador) — comunicar imediatamente a autoridade policial." },
{ art:"238", desc:"Recusar-se a entregar à autoridade de trânsito, mediante recibo, os documentos de habilitação, registro ou licenciamento para averiguação", infrator:"Condutor", grav:"gravissima", medida:"Apreensão e remoção do veículo" },
{ art:"230, IV/V/VI", desc:"Conduzir veículo sem placa, com placa ilegível/sem condições de visibilidade, ou não registrado/licenciado", infrator:"Condutor", grav:"gravissima", medida:"Apreensão e remoção do veículo", obs:"Se houver sinal de violação/falsificação de placa ou chassi (inciso I do mesmo artigo), comunicar apuração de crime." },
{ art:"244, I", desc:"Conduzir motocicleta/motoneta/ciclomotor sem capacete de segurança ou vestuário de proteção regulamentar", infrator:"Condutor", grav:"gravissima", medida:"Retenção do veículo" },
{ art:"244, II", desc:"Conduzir motocicleta transportando passageiro sem capacete, fora do assento suplementar ou do carro lateral", infrator:"Condutor", grav:"gravissima", medida:"Retenção do veículo" },
{ art:"244, V", desc:"Conduzir motocicleta transportando criança menor de 10 anos, ou sem condições de cuidar da própria segurança", infrator:"Condutor", grav:"gravissima", medida:"Retenção do veículo e recolhimento da CNH (suspensão do direito de dirigir)" },

// ---------------- CINTO / CRIANÇA ----------------
{ art:"167", desc:"Deixar o condutor ou passageiro de usar o cinto de segurança", infrator:"Condutor/Passageiro", grav:"grave", medida:"Retenção do veículo até colocação do cinto pelo infrator", competencia:"municipal" },
{ art:"168", desc:"Transportar criança em veículo sem observância das normas de segurança especiais (cadeirinha/bebê-conforto/assento de elevação conforme a idade)", infrator:"Condutor", grav:"gravissima", medida:"Retenção do veículo até que a irregularidade seja sanada", competencia:"municipal", obs:"Verificar idade/altura da criança para exigir o dispositivo correto (bebê-conforto, cadeirinha ou assento de elevação, conforme art. 64/CONTRAN)." },

// ---------------- CELULAR / ATENÇÃO AO VOLANTE ----------------
{ art:"252, VI", desc:"Dirigir usando fone de ouvido conectado a aparelhagem sonora ou falando ao telefone celular sem manuseá-lo", infrator:"Condutor", grav:"media", medida:"—", competencia:"municipal" },
{ art:"252, § único", desc:"Dirigir segurando ou manuseando telefone celular (digitar, ler mensagens, navegar em aplicativos etc.)", infrator:"Condutor", grav:"gravissima", medida:"—", competencia:"municipal", obs:"Infração mais grave que apenas 'falar ao telefone' (art. 252, VI, média) — a diferença é o manuseio ativo do aparelho." },
{ art:"169", desc:"Dirigir sem atenção ou sem os cuidados indispensáveis à segurança", infrator:"Condutor", grav:"leve", medida:"—" },

// ---------------- VELOCIDADE ----------------
{ art:"218, I", desc:"Transitar em velocidade superior à máxima permitida em até 20%", infrator:"Condutor", grav:"media", medida:"—", competencia:"apoio", obs:"Autuação normalmente via equipamento de fiscalização eletrônica homologado." },
{ art:"218, II", desc:"Transitar em velocidade superior à máxima permitida entre 20% e 50%", infrator:"Condutor", grav:"grave", medida:"—", competencia:"apoio" },
{ art:"218, III", desc:"Transitar em velocidade superior à máxima permitida em mais de 50%", infrator:"Condutor", grav:"gravissima", medida:"Suspensão imediata do direito de dirigir e apreensão da CNH (mult. x3 = R$ 880,41)", competencia:"apoio", obs:"Infração autossuspensiva — gera processo de suspensão (2 a 8 meses) independente da pontuação acumulada." },

// ---------------- ÁLCOOL / SUBSTÂNCIA / EXAME TOXICOLÓGICO ----------------
{ art:"165", desc:"Dirigir sob a influência de álcool ou de qualquer substância psicoativa que determine dependência", infrator:"Condutor", grav:"gravissima", medida:"Recolhimento da CNH e retenção do veículo (mult. x10 = R$ 2.934,70) e suspensão do direito de dirigir por 12 meses", competencia:"apoio", obs:"Se houver concentração de álcool igual/superior a 0,3 mg/L de ar alveolar (ou sinais de alteração), comunicar autoridade policial — pode configurar CRIME (art. 306, CTB)." },
{ art:"165-A", desc:"Recusar-se a se submeter a teste de alcoolemia, exame clínico, perícia ou outro procedimento previsto no art. 277", infrator:"Condutor", grav:"gravissima", medida:"Recolhimento da CNH e retenção do veículo (mult. x10) e suspensão do direito de dirigir por 12 meses", competencia:"apoio", obs:"A recusa gera as mesmas penalidades do art. 165. Registrar sinais físicos de embriaguez observados, pois podem embasar o crime do art. 306, §2º (a prova pode ser testemunhal/em vídeo)." },
{ art:"165-B", desc:"Dirigir veículo sem realizar o exame toxicológico periódico exigido (categorias/atividades sujeitas ao art. 148-A), após 30 dias do vencimento do prazo", infrator:"Condutor", grav:"gravissima", medida:"Multa (mult. x5 = R$ 1.467,35); reincidência em 12 meses: mult. x10 (R$ 2.934,70) + suspensão do direito de dirigir", competencia:"apoio" },
{ art:"165-C", desc:"Dirigir veículo tendo obtido resultado positivo no exame toxicológico do art. 148-A", infrator:"Condutor", grav:"gravissima", medida:"Multa (mult. x5); reincidência em 12 meses: mult. x10 + suspensão do direito de dirigir", competencia:"apoio" },
{ art:"166", desc:"Confiar ou entregar a direção do veículo a pessoa que, mesmo habilitada, por seu estado físico/psíquico, não esteja em condições de dirigir com segurança", infrator:"Proprietário/possuidor", grav:"gravissima", medida:"—" },

// ---------------- DIREÇÃO PERIGOSA / RACHA / MANOBRA ----------------
{ art:"173", desc:"Disputar corrida (racha) na via pública", infrator:"Condutor", grav:"gravissima", medida:"Recolhimento da CNH e remoção do veículo (mult. x10, dobro em reincidência em 12 meses) + suspensão do direito de dirigir + apreensão do veículo", competencia:"apoio", obs:"Configura também o CRIME do art. 308, CTB. Acionar apoio policial imediatamente — evitar abordagem individual em via de alta velocidade." },
{ art:"174", desc:"Promover, na via, competição, evento organizado, exibição ou demonstração de perícia em manobra, ou dela participar como condutor, sem autorização da autoridade de trânsito", infrator:"Condutor/Organizador", grav:"gravissima", medida:"Recolhimento da CNH e remoção do veículo (mult. x10) + suspensão do direito de dirigir + apreensão", competencia:"apoio", obs:"Penalidade aplicável tanto aos promotores/organizadores quanto aos condutores participantes." },
{ art:"175", desc:"Utilizar o veículo para demonstrar ou exibir manobra perigosa: arrancada brusca, derrapagem ou frenagem com deslizamento/arrastamento de pneus ('cavalo de pau', 'cantar pneu')", infrator:"Condutor", grav:"gravissima", medida:"Recolhimento da CNH e remoção do veículo (mult. x10, dobro em reincidência) + suspensão do direito de dirigir", competencia:"apoio", obs:"Frequentemente associado a filmagens/exibicionismo — preservar registro de imagem como prova." },
{ art:"191", desc:"Forçar passagem entre veículos que, em sentidos opostos, estejam na iminência de se cruzar durante ultrapassagem", infrator:"Condutor", grav:"gravissima", medida:"Suspensão do direito de dirigir (mult. x10, dobro em reincidência)" },
{ art:"206", desc:"Executar operação de retorno em local proibido pela sinalização, em curva/aclive/declive/ponte/viaduto/túnel, ou com prejuízo à livre circulação", infrator:"Condutor", grav:"gravissima", medida:"—", competencia:"municipal" },
{ art:"207", desc:"Executar conversão à direita ou à esquerda em local proibido pela sinalização", infrator:"Condutor", grav:"grave", medida:"—", competencia:"municipal" },
{ art:"208", desc:"Avançar o sinal vermelho do semáforo ou o de parada obrigatória", infrator:"Condutor", grav:"gravissima", medida:"—", competencia:"municipal" },
{ art:"210", desc:"Transpor, sem autorização, bloqueio viário policial", infrator:"Condutor", grav:"gravissima", medida:"Apreensão do veículo, suspensão do direito de dirigir e recolhimento da CNH", competencia:"flagrante", obs:"Situação de risco imediato à equipe — priorizar segurança e, se possível, identificar o veículo para abordagem posterior." },
{ art:"214, I/II/III", desc:"Deixar de dar preferência de passagem a pedestre ou veículo não motorizado na faixa a ele destinada, com travessia não concluída, ou a pessoa com deficiência, criança, idoso ou gestante", infrator:"Condutor", grav:"gravissima", medida:"—", competencia:"municipal" },
{ art:"192", desc:"Deixar de guardar distância de segurança lateral e frontal em relação aos demais veículos", infrator:"Condutor", grav:"grave", medida:"—" },
{ art:"253", desc:"Bloquear a via com o veículo", infrator:"Condutor", grav:"gravissima", medida:"Apreensão e remoção do veículo" },
{ art:"253-A", desc:"Usar veículo para, deliberadamente, interromper, restringir ou perturbar a circulação na via, sem autorização (ex.: protesto/buzinaço organizado em via pública)", infrator:"Condutor/Organizador", grav:"gravissima", medida:"Remoção do veículo (mult. x20 para participantes e x60 para organizadores) + suspensão do direito de dirigir por 12 meses", competencia:"apoio", obs:"Diferente do racha (art. 173/174/175) — aqui o objetivo é interromper o trânsito (manifestação, bloqueio coletivo), não competir ou exibir manobra." },

// ---------------- SOM / EQUIPAMENTOS ----------------
{ art:"228", desc:"Usar no veículo equipamento de som em volume/frequência não autorizado pelo CONTRAN", infrator:"Condutor", grav:"grave", medida:"Retenção do veículo para regularização", competencia:"municipal" },
{ art:"229", desc:"Usar indevidamente alarme ou equipamento que produza sons/ruídos perturbando o sossego público", infrator:"Condutor", grav:"media", medida:"Apreensão e remoção do veículo", competencia:"municipal" },
{ art:"230, III", desc:"Conduzir o veículo com dispositivo anti-radar", infrator:"Condutor", grav:"gravissima", medida:"Apreensão e remoção do veículo" },
{ art:"230, XIV", desc:"Conduzir com registrador instantâneo de velocidade/tempo (tacógrafo) viciado, defeituoso, quando exigido", infrator:"Condutor", grav:"grave", medida:"Retenção do veículo para regularização" },
{ art:"230, XXII", desc:"Conduzir com defeito no sistema de iluminação/sinalização ou com lâmpadas queimadas", infrator:"Condutor", grav:"media", medida:"Retenção do veículo para regularização" },
{ art:"223", desc:"Transitar com farol desregulado ou com facho de luz alta perturbando a visão de outro condutor", infrator:"Condutor", grav:"grave", medida:"Retenção do veículo para regularização" },
{ art:"224", desc:"Fazer uso de farol alto em vias providas de iluminação pública", infrator:"Condutor", grav:"leve", medida:"—" },

// ---------------- PEDESTRE / CICLISTA ----------------
{ art:"254, I", desc:"Pedestre permanecer ou andar nas pistas de rolamento, exceto para cruzá-las onde permitido", infrator:"Pedestre", grav:"leve", medida:"Multa de 50% do valor da infração leve", competencia:"municipal" },
{ art:"254, V", desc:"Pedestre andar fora da faixa própria, passarela, passagem aérea ou subterrânea, quando existentes", infrator:"Pedestre", grav:"leve", medida:"Multa de 50% do valor da infração leve", competencia:"municipal" },
{ art:"255", desc:"Conduzir bicicleta em passeio onde não seja permitida a circulação, ou de forma agressiva", infrator:"Ciclista", grav:"media", medida:"Remoção da bicicleta mediante recibo", competencia:"municipal" },

// ---------------- CARGA / TRANSPORTE ----------------
{ art:"231, II", desc:"Transitar derramando, lançando ou arrastando sobre a via carga, combustível/lubrificante ou objeto que possa causar risco de sinistro", infrator:"Condutor", grav:"gravissima", medida:"Retenção do veículo para regularização" },
{ art:"231, IV", desc:"Transitar com dimensões ou carga superiores aos limites legais/sinalizados, sem autorização", infrator:"Condutor", grav:"grave", medida:"Retenção do veículo para regularização" },
{ art:"231, V", desc:"Transitar com excesso de peso (tolerância conforme CONTRAN)", infrator:"Condutor", grav:"media", medida:"Retenção do veículo e transbordo da carga excedente; multa progressiva por faixa de excesso" },
{ art:"235", desc:"Conduzir pessoas, animais ou carga nas partes externas do veículo, salvo autorização", infrator:"Condutor", grav:"grave", medida:"Retenção do veículo para transbordo" },
{ art:"245", desc:"Utilizar a via para depósito de mercadorias, materiais ou equipamentos, sem autorização do órgão de trânsito", infrator:"Responsável", grav:"grave", medida:"Remoção da mercadoria/material", competencia:"municipal" },
{ art:"246", desc:"Deixar de sinalizar obstáculo à livre circulação ou obstaculizar a via indevidamente", infrator:"Responsável", grav:"gravissima", medida:"Multa agravada em até 5 vezes conforme o risco", competencia:"municipal" }
];

// ---------------- CRIMES DE TRÂNSITO (arts. 302 a 312, CTB) ----------------
const CRIMES = [
{ art:"302", nome:"Homicídio culposo na direção de veículo automotor", tipificacao:"Praticar homicídio culposo na direção de veículo automotor.", pena:"Detenção de 2 a 4 anos + suspensão/proibição de dirigir. Aumentada de 1/3 à metade nas hipóteses do §1º (sem CNH, faixa de pedestre/calçada, deixar de prestar socorro, em serviço de transporte de passageiros). Pena de reclusão de 5 a 8 anos se resultar de racha, embriaguez ou velocidade excessiva (>50 km/h acima do limite), conforme §3º.", procedimento:"Isolar e preservar o local (não mover veículos ou vítima salvo risco). Acionar SAMU/Corpo de Bombeiros e autoridade policial civil imediatamente. Não liberar o condutor. Colher dados de testemunhas. Se possível, verificar sinais de embriaguez e solicitar teste de alcoolemia. Elaborar registro fotográfico do local antes de qualquer remoção." },
{ art:"303", nome:"Lesão corporal culposa na direção de veículo automotor", tipificacao:"Praticar lesão corporal culposa na direção de veículo automotor.", pena:"Detenção de 6 meses a 2 anos (ação pública incondicionada). Aumento de pena nas mesmas hipóteses do art. 302, §1º; pena de reclusão de 2 a 5 anos se resultar de racha, embriaguez ou velocidade excessiva (§2º).", procedimento:"Prestar/priorizar socorro à vítima. Preservar local e vestígios. Identificar condutor e veículo. Comunicar autoridade policial para lavratura de TCO ou apuração conforme gravidade da lesão." },
{ art:"304", nome:"Omissão de socorro em sinistro de trânsito", tipificacao:"Deixar o condutor do veículo, na ocasião do sinistro, de prestar imediato socorro à vítima, ou, não podendo fazê-lo diretamente por justa causa, deixar de solicitar auxílio da autoridade pública. (Redação dada pela Lei nº 14.599/2023, que substituiu 'acidente' por 'sinistro de trânsito' no texto do CTB.)", pena:"Detenção de 6 meses a 1 ano, ou multa, se o fato não constituir elemento de crime mais grave.", procedimento:"Registrar se o condutor permaneceu no local e prestou/tentou prestar socorro. A fuga do local por si só não configura este crime se o condutor buscou ajuda por outro meio — apurar cuidadosamente as circunstâncias. Lembrar que o art. 301, CTB, dispensa flagrante/fiança a quem prestar pronto e integral socorro à vítima." },
{ art:"305", nome:"Fuga do local do sinistro (evasão)", tipificacao:"Afastar-se o condutor do veículo do local do sinistro, para fugir à responsabilidade penal ou civil que lhe possa ser atribuída. (Redação dada pela Lei nº 14.599/2023.)", pena:"Detenção de 6 meses a 1 ano.", procedimento:"Buscar identificar veículo (placa, marca/modelo, cor) e condutor por câmeras, testemunhas ou rastreamento. Comunicar imediatamente à autoridade policial para instauração de inquérito/TCO." },
{ art:"306", nome:"Dirigir sob influência de álcool ou substância psicoativa", tipificacao:"Conduzir veículo automotor com capacidade psicomotora alterada em razão de álcool (concentração igual/superior a 6 decigramas por litro de sangue, ou 0,3 mg/L de ar alveolar) ou outra substância psicoativa que determine dependência, comprovada por teste, exame clínico, perícia, vídeo, prova testemunhal ou outro meio admitido.", pena:"Detenção de 6 meses a 3 anos, multa e suspensão/proibição de dirigir.", procedimento:"Solicitar teste do bafômetro; em caso de recusa, registrar sinais clínicos de embriaguez (fala alterada, odor etílico, equilíbrio, coordenação) e testemunhas — a lei admite prova testemunhal e em vídeo além do teste técnico. Conduzir à autoridade policial para lavratura de flagrante ou TCO conforme fluxo local. Reter CNH e veículo administrativamente (art. 165/165-A)." },
{ art:"307", nome:"Violar suspensão ou proibição de dirigir imposta por decisão judicial", tipificacao:"Violar a suspensão ou a proibição de se obter a permissão ou a habilitação para dirigir veículo automotor imposta com fundamento no CTB.", pena:"Detenção de 6 meses a 1 ano e multa, com nova imposição de idêntico prazo de suspensão/proibição.", procedimento:"Consultar sistema (RENACH/Detran) para confirmar suspensão judicial vigente. Encaminhar à autoridade policial e reter o veículo." },
{ art:"308", nome:"Participar de corrida, disputa ou competição não autorizada (racha)", tipificacao:"Participar, na direção de veículo automotor, em via pública, de corrida, disputa ou competição automobilística, de exibição ou demonstração de perícia em manobra, não autorizada pela autoridade competente, gerando situação de risco à incolumidade pública ou privada.", pena:"Reclusão de 6 meses a 3 anos, multa e suspensão/proibição de dirigir. Se resultar lesão grave ou morte, aplicam-se as penas dos arts. 302/303 com aumento.", procedimento:"Preservar e registrar em imagem/vídeo a conduta (essencial para a prova). Acionar apoio policial imediatamente por se tratar de crime em andamento — evitar abordagem individual em via de alta velocidade sem suporte. Identificar veículos e condutores envolvidos." },
{ art:"309", nome:"Dirigir sem habilitação gerando perigo de dano", tipificacao:"Dirigir veículo automotor, em via pública, sem a devida permissão para dirigir ou habilitação, ou com o direito cassado, gerando perigo de dano.", pena:"Detenção de 6 meses a 1 ano ou multa.", procedimento:"Diferencia-se da infração administrativa do art. 162 pela existência de efetivo perigo de dano (direção perigosa, imprudência). Avaliar contexto: se apenas ausência documental sem perigo concreto, trata-se de infração administrativa; havendo risco, comunicar autoridade policial." },
{ art:"310", nome:"Entregar veículo a pessoa não habilitada ou sem condições", tipificacao:"Permitir, confiar ou entregar a direção de veículo automotor a pessoa não habilitada, com habilitação cassada/suspensa, ou que, por seu estado de saúde física/mental ou embriaguez, não esteja em condições de conduzi-lo com segurança.", pena:"Detenção de 6 meses a 1 ano ou multa.", procedimento:"Aplicável ao proprietário/possuidor que entrega o veículo, não apenas ao condutor. Registrar quem autorizou a condução." },
{ art:"311", nome:"Trafegar em velocidade incompatível com segurança em local específico", tipificacao:"Trafegar em velocidade incompatível com a segurança nas proximidades de escolas, hospitais, estações de embarque/desembarque, logradouros estreitos, ou onde haja grande movimentação de pessoas, gerando perigo de dano.", pena:"Detenção de 6 meses a 1 ano ou multa.", procedimento:"Diferente da infração administrativa de excesso de velocidade (art. 218) — aqui exige-se situação concreta de perigo em local sensível. Fundamental descrever no relato o contexto (proximidade de escola/hospital, movimento de pedestres)." },
{ art:"312", nome:"Inovar artificiosamente em local de sinistro com vítima", tipificacao:"Inovar artificiosamente, em caso de sinistro de trânsito com vítima, na pretensão de segurar direito ou eximir-se de dever, o estado de lugar, de coisa ou de pessoa, a fim de induzir a erro o agente policial, o perito ou o juiz. (Redação dada pela Lei nº 14.599/2023.)", pena:"Detenção de 6 meses a 1 ano, ou multa.", procedimento:"Atenção para alteração de posição de veículos/objetos no local antes da chegada da perícia — orientar envolvidos a não mexer em nada até liberação da autoridade competente." }
];

// ---------------- PROCEDIMENTOS OPERACIONAIS PADRÃO (POPs) DE OCORRÊNCIA ----------------
const PROCEDIMENTOS = [
{
  titulo: "Sinistro de trânsito com vítima",
  passos: [
    "Sinalizar e isolar o local (cones/fita) para proteger vítimas e equipe do fluxo de veículos.",
    "Acionar SAMU (192) e, se necessário, Corpo de Bombeiros (193) imediatamente.",
    "Não remover a vítima, salvo risco iminente (incêndio, novo atropelamento); aguardar equipe de saúde.",
    "Acionar Polícia Civil/Militar quando houver indício de lesão grave, morte ou fuga (arts. 302 a 305, CTB).",
    "Preservar o local: não mover veículos, destroços ou objetos até a perícia ou liberação da autoridade — alterar a cena pode configurar o crime do art. 312.",
    "Identificar condutores, veículos (placa) e testemunhas presentes.",
    "Observar sinais de embriaguez ou alteração psicomotora nos condutores envolvidos.",
    "Registrar imagens do local, posição dos veículos e sinalização viária antes de qualquer remoção.",
    "Elaborar/instruir o Boletim de Ocorrência e Relatório Diário com todos os dados coletados."
  ]
},
{
  titulo: "Suspeita de embriaguez ao volante",
  passos: [
    "Abordar o veículo com segurança, sinalizando a parada com giroflex/lanterna.",
    "Observar sinais objetivos: odor etílico, fala arrastada, olhos avermelhados, desequilíbrio, agressividade.",
    "Solicitar apresentação de CNH e documentos do veículo.",
    "Convidar o condutor para teste de etilômetro (bafômetro), quando a equipe dispuser do equipamento.",
    "Em caso de recusa, registrar minuciosamente os sinais físicos observados (a lei admite prova testemunhal/em vídeo para o crime do art. 306, além do teste técnico).",
    "Se houver indícios de crime (art. 306 — concentração ≥0,3 mg/L de ar alveolar ou sinais evidentes), reter o veículo, recolher a CNH e acionar a autoridade policial competente.",
    "Não permitir que o condutor continue dirigindo; buscar condutor habilitado ou providenciar remoção do veículo.",
    "Registrar tudo em boletim/relatório, incluindo horário da abordagem e do teste."
  ]
},
{
  titulo: "Racha, disputa ou manobra perigosa (arts. 173, 174, 175 e 308, CTB)",
  passos: [
    "Não realizar abordagem isolada em via de alta velocidade ou em movimento — priorizar segurança da equipe.",
    "Acionar apoio (viaturas adicionais, Polícia Militar) antes de qualquer intervenção direta.",
    "Registrar em vídeo/foto a conduta, veículos e placas envolvidos — prova essencial para o crime do art. 308.",
    "Se possível, aguardar os veículos pararem em local seguro para abordagem.",
    "Reter os veículos e conduzir os envolvidos e a ocorrência à autoridade policial.",
    "Descrever no relatório o contexto de risco gerado (via pública, pedestres, velocidade estimada)."
  ]
},
{
  titulo: "Estacionamento/parada irregular (rotina diária)",
  passos: [
    "Verificar a sinalização (placa, faixa, horário) antes de autuar — a existência de sinalização regulamentar é condição para a maioria das infrações dos arts. 181/182.",
    "Fotografar o veículo, a placa e a sinalização do local como prova.",
    "Preencher a notificação de autuação com o artigo correto (ver aba Infrações).",
    "Avaliar necessidade de remoção (reboque) apenas nos casos previstos em lei ou quando o veículo obstruir grave o trânsito.",
    "Tentar localizar o condutor antes de acionar remoção, quando o risco à segurança viária for baixo."
  ]
},
{
  titulo: "Fuga do local do sinistro (evasão)",
  passos: [
    "Registrar imediatamente placa, marca, modelo e cor do veículo evadido, e sentido de fuga.",
    "Verificar câmeras de monitoramento (municipais/particulares) próximas ao local.",
    "Colher depoimento de testemunhas no local antes que se dispersem.",
    "Comunicar a ocorrência à autoridade policial para instauração de inquérito/TCO (art. 305, CTB).",
    "Não perseguir o veículo evadido em alta velocidade sem respaldo e autorização — priorizar segurança."
  ]
},
{
  titulo: "Abordagem de veículo/condutor em fiscalização de rotina",
  passos: [
    "Posicionar a viatura com sinalização visível e local seguro para ambos os lados.",
    "Aproximar-se com atenção, observando o comportamento do condutor e ocupantes.",
    "Solicitar CNH e CRLV; verificar validade, restrições e eventual mandado/ocorrência vinculada à placa.",
    "Em caso de irregularidade documental sem risco (ex.: CRLV vencido), aplicar a medida administrativa cabível (retenção até regularização).",
    "Em caso de indício de crime (adulteração de placa/chassi — art. 234, veículo com queixa de furto/roubo, porte de arma, entorpecentes), isolar o veículo e acionar imediatamente apoio policial."
  ]
}
];
