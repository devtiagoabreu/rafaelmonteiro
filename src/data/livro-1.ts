export const bookInfo = {
  title: "O Desejo Não Morre — Ele É Mal Cuidado",
  subtitle: "Um guia direto, humano e terapêutico para reconstruir a intimidade no relacionamento",
  author: "Rafael Monteiro",
  authorTitle: "Terapeuta de Relacionamentos e Sexualidade"
}

export interface Chapter {
  id: number
  type: 'cover' | 'dedication' | 'preface' | 'toc' | 'chapter' | 'back-cover'
  title: string
  content: string
}

export const chapters: Chapter[] = [
  {
    id: 0,
    type: "cover",
    title: "Capa",
    content: `
      <div class="cover-page">
        <h2>O Desejo Não Morre</h2>
        <p class="subtitle">Ele É Mal Cuidado</p>
        <p>${bookInfo.subtitle}</p>
        <p class="author">${bookInfo.author}<br>${bookInfo.authorTitle}</p>
      </div>
    `
  },
  {
    id: 1,
    type: "dedication",
    title: "Dedicatória",
    content: `
      <div class="dedication-page">
        <p><strong>Para minha esposa amada,</strong></p>
        <p>que me ensinou que desejo não nasce da perfeição,<br>mas da presença.</p>
        <p>Que me mostrou, nos dias bons e nos dias difíceis,<br>que intimidade se constrói quando a gente escolhe ficar,<br>ouvir, cuidar e recomeçar.</p>
        <p>Este livro existe porque existimos juntos.</p>
        <p>Com amor,<br>Rafael</p>
      </div>
    `
  },
  {
    id: 2,
    type: "preface",
    title: "Prefácio",
    content: `
      <div class="preface-page">
        <h2 class="chapter-title">Prefácio</h2>
        <div class="chapter-content">
          <p>Este livro não foi escrito para casais perfeitos.<br>Foi escrito para pessoas reais, com cansaço, rotina, medo de rejeição, vontade de acertar e dificuldade de falar sobre o que sentem.</p>
          <p>Ao longo da minha experiência acompanhando homens e mulheres que amam, mas sofrem em silêncio dentro de seus relacionamentos, percebi um padrão claro:<br>as pessoas não perdem o desejo por falta de amor.<br>Elas perdem por falta de espaço emocional para o desejo existir.</p>
          <p>Falar de sexualidade ainda é tabu.<br>Falar de frustração sexual dentro de um relacionamento parece proibido.<br>E, por isso, muita gente engole incômodos até o desejo virar distância, ressentimento ou indiferença.</p>
          <p>Este livro não traz fórmulas mágicas.<br>Traz consciência emocional, comunicação realista e ferramentas práticas para reconstruir intimidade no mundo adulto, com filhos, trabalho, estresse e vida real.</p>
          <p>Se você sente que o desejo esfriou,<br>se a conexão diminuiu,<br>ou se a relação entrou no modo automático,<br>Este livro é um convite para olhar para o vínculo com mais honestidade e menos culpa.</p>
          <p>Você não está quebrado(a).<br>Seu relacionamento não está condenado.<br>Mas o campo emocional entre vocês pode estar precisando de cuidado.</p>
        </div>
      </div>
    `
  },
  {
    id: 3,
    type: "toc",
    title: "Sumário",
    content: `
      <div class="toc-page">
        <h2 class="toc-title">Sumário Completo</h2>
        <ul class="toc-list" id="tocList">
          <li class="toc-item" data-chapter="0">
            <i class="fas fa-book-open"></i>
            <span>Capa</span>
          </li>
          <li class="toc-item" data-chapter="1">
            <i class="fas fa-book-open"></i>
            <span>Dedicatória</span>
          </li>
          <li class="toc-item" data-chapter="2">
            <i class="fas fa-book-open"></i>
            <span>Prefácio</span>
          </li>
          <li class="toc-item" data-chapter="4">
            <i class="fas fa-book"></i>
            <span>Capítulo 1 — O Desejo Não Morre, Ele É Mal Cuidado</span>
          </li>
          <li class="toc-item" data-chapter="5">
            <i class="fas fa-book"></i>
            <span>Capítulo 2 — Os 5 Erros Que Estão Matando Sua Vida Sexual</span>
          </li>
          <li class="toc-item" data-chapter="6">
            <i class="fas fa-book"></i>
            <span>Capítulo 3 — Desejo Não é Vontade: É Clima</span>
          </li>
          <li class="toc-item" data-chapter="7">
            <i class="fas fa-book"></i>
            <span>Capítulo 4 — Como Você Se Tornou "Invisível" no Relacionamento</span>
          </li>
          <li class="toc-item" data-chapter="8">
            <i class="fas fa-book"></i>
            <span>Capítulo 5 — O Tripé da Atração: Postura, Energia e Presença</span>
          </li>
          <li class="toc-item" data-chapter="9">
            <i class="fas fa-book"></i>
            <span>Capítulo 6 — Como Voltar a Ser Desejado(a) Sem Implorar por Atenção ou Sexo</span>
          </li>
          <li class="toc-item" data-chapter="10">
            <i class="fas fa-book"></i>
            <span>Capítulo 7 — Por Que Falar de Sexo Vira Briga</span>
          </li>
          <li class="toc-item" data-chapter="11">
            <i class="fas fa-book"></i>
            <span>Capítulo 8 — Como Pedir o Que Você Quer na Cama Sem Criar Clima Estranho</span>
          </li>
          <li class="toc-item" data-chapter="12">
            <i class="fas fa-book"></i>
            <span>Capítulo 9 — Cansaço, Rotina e Estresse: Os Maiores Inimigos do Desejo</span>
          </li>
          <li class="toc-item" data-chapter="13">
            <i class="fas fa-book"></i>
            <span>Capítulo 10 — Rejeição na Cama: Como Não Deixar Isso Quebrar Sua Autoestima</span>
          </li>
          <li class="toc-item" data-chapter="14">
            <i class="fas fa-book"></i>
            <span>Capítulo 11 — Quando a Chama Já Apagou: Como Reacender o Desejo Mesmo Depois de Anos Juntos</span>
          </li>
          <li class="toc-item" data-chapter="15">
            <i class="fas fa-book"></i>
            <span>Capítulo 12 — Quando a Confiança Quebra: Como Reconstruir Intimidade Depois da Dor</span>
          </li>
          <li class="toc-item" data-chapter="16">
            <i class="fas fa-book"></i>
            <span>Contracapa</span>
          </li>
        </ul>
      </div>
    `
  },
  {
    id: 4,
    type: "chapter",
    title: "Capítulo 1 — O Desejo Não Morre, Ele É Mal Cuidado",
    content: `
      <h2 class="chapter-title">Capítulo 1 — O Desejo Não Morre, Ele É Mal Cuidado</h2>
      <div class="chapter-content">
        <p>Talvez você esteja lendo isso porque, em algum momento, pensou:<br>
        "Não sinto mais aquele fogo pelo meu parceiro(a)."<br>
        Ou pior:<br>
        "Acho que o amor acabou."</p>
        
        <p>Essa sensação é mais comum do que você imagina.<br>
        E a primeira coisa que preciso te dizer é: <strong>na maioria dos casos, o
        desejo não morreu — ele foi negligenciado.</strong></p>
        
        <p>Desejo não é um botão que liga sozinho para sempre.<br>
        Ele é mais parecido com uma fogueira: se você para de colocar lenha, o
        fogo diminui. Se ignora por tempo suficiente, vira brasa. Mas... <strong>brasa
        ainda é fogo.</strong></p>
        
        <h3>O mito de que "o tempo mata o tesão"</h3>
        
        <p>Existe uma mentira que muita gente compra sem perceber:</p>
        
        <blockquote>"É normal o desejo acabar com o tempo."</blockquote>
        
        <p>Não é bem assim.<br>
        O que acontece com o tempo é que a rotina entra, o estresse aumenta, a
        vida fica pesada... e o relacionamento passa a funcionar no modo
        automático.</p>
        
        <p>Vocês viram uma equipe para pagar contas, cuidar de filhos, resolver
        problemas.<br>
        Mas pararam de ser duas pessoas que se olham com curiosidade, com
        presença, com vontade.</p>
        
        <p>O tesão não some do nada.<br>
        Ele vai sendo empurrado para o fundo da lista de prioridades.</p>
        
        <h3>Como o desejo vai sendo mal cuidado no dia a dia</h3>
        
        <p>Aqui vão alguns exemplos que parecem pequenos, mas fazem um estrago
        silencioso:</p>
        
        <ul>
            <li>Vocês quase não se tocam fora do momento do sexo</li>
            <li>O contato virou funcional: beijo rápido, abraço de "oi"</li>
            <li>As conversas são só sobre problemas, dinheiro e obrigações</li>
            <li>O celular recebe mais atenção do que a pessoa ao seu lado</li>
            <li>O sexo acontece no piloto automático (ou nem acontece)</li>
        </ul>
        
        <p>Nada disso, isoladamente, destrói um relacionamento.<br>
        Mas <strong>a soma disso ao longo do tempo cria distância emocional.</strong><br>
        E sem proximidade emocional, o desejo enfraquece.</p>
        
        <h3>Desejo não é vontade: é clima</h3>
        
        <p>Muita gente espera "dar vontade" para transar.<br>
        Mas o desejo raramente aparece do nada, principalmente em
        relacionamentos longos.</p>
        
        <p>Na prática, o desejo funciona assim:</p>
        
        <p>👉 Primeiro vem o <strong>clima</strong><br>
        👉 Depois vem a <strong>vontade</strong></p>
        
        <p>Clima é:</p>
        
        <ul>
            <li>Atenção</li>
            <li>Presença</li>
            <li>Toque</li>
            <li>Interesse genuíno</li>
            <li>Um pouco de novidade</li>
        </ul>
        
        <p>Quando isso some, a vontade some junto.<br>
        Não porque o parceiro(a) deixou de ser atraente,<br>
        mas porque o ambiente emocional ficou frio.</p>
        
        <h3>O erro de achar que o problema é o parceiro(a)</h3>
        
        <p>É muito comum jogar a culpa no outro:<br>
        "Ele(a) não me procura mais."<br>
        "Ele(a) não se cuida mais."<br>
        "Ele(a) não demonstra interesse."</p>
        
        <p>Às vezes, isso até é verdade.<br>
        Mas quase sempre o problema é <strong>a dinâmica entre vocês</strong>, não uma pessoa só.</p>
        
        <p>Relacionamento não esfria por culpa de alguém.<br>
        Ele esfria por <strong>falta de intenção</strong>.</p>
        
        <p>Falta de intenção em:</p>
        
        <ul>
            <li>Criar momentos</li>
            <li>Quebrar a rotina</li>
            <li>Manter o toque</li>
            <li>Cuidar do clima emocional</li>
        </ul>
        
        <h3>Um pequeno teste de honestidade</h3>
        
        <p>Responda mentalmente, sem se julgar:</p>
        
        <ul>
            <li>Quando foi a última vez que você elogiou seu parceiro(a) sem motivo?</li>
            <li>Quando foi a última vez que você tocou sem esperar sexo em troca?</li>
            <li>Quando foi a última vez que vocês riam juntos de verdade?</li>
        </ul>
        
        <p>Se você teve dificuldade para lembrar, isso não significa que o
        relacionamento acabou.<br>
        Significa que <strong>o desejo está sendo mal cuidado.</strong></p>
        
        <p>E boa notícia:<br>
        O que é mal cuidado pode ser cuidado de novo.</p>
        
        <h3>Exercício prático (simples, mas poderoso)</h3>
        
        <p>Hoje, faça apenas uma coisa diferente:</p>
        
        <p>👉 Toque seu parceiro(a) sem intenção sexual.<br>
        Um abraço mais demorado.<br>
        Um carinho no rosto.<br>
        Um beijo sem pressa.</p>
        
        <p>Sem cobrança.<br>
        Sem expectativa de "agora tem que rolar algo".</p>
        
        <p>O objetivo é <strong>reativar o clima</strong>, não forçar o desejo.</p>
        
        <p>No próximo capítulo, você vai entender <strong>os 5 erros que estão matando
        sua vida sexual sem você perceber</strong> — e como parar de cometê-los ainda
        essa semana.</p>
      </div>
    `
  },
  {
    id: 5,
    type: "chapter",
    title: "Capítulo 2 — Os 5 Erros Que Estão Matando Sua Vida Sexual",
    content: `
      <h2 class="chapter-title">Capítulo 2 — Os 5 Erros Que Estão Matando Sua Vida Sexual (Mesmo Sem Você Perceber)</h2>
      <div class="chapter-content">
        <p>A maioria dos casais acredita que o problema do sexo é falta de tempo,
        cansaço ou estresse.<br>
        Esses fatores influenciam, sim.<br>
        Mas eles não são a raiz do problema.</p>
        
        <p>A raiz quase sempre está em <strong>erros silenciosos de comportamento</strong> que
        vão se acumulando no dia a dia.<br>
        São erros pequenos, repetidos, aparentemente inofensivos — mas que
        mudam completamente o clima emocional do relacionamento.</p>
        
        <p>Você não acorda um dia e pensa:<br>
        "Hoje vou matar o desejo do meu relacionamento."<br>
        Isso acontece no automático.</p>
        
        <h3>Erro 1 — Transformar o parceiro(a) em colega de quarto</h3>
        
        <p>No começo de um relacionamento, existe tensão positiva.<br>
        Vocês se observam, se provocam, se escolhem.</p>
        
        <p>Com o time, muitos casais entram no modo "sociedade doméstica".<br>
        A conversa vira logística.<br>
        O olhar vira neutro.<br>
        O toque vira raro.</p>
        
        <p>O parceiro(a) deixa de ser visto como alguém desejável<br>
        e passa a ser visto apenas como alguém previsível.</p>
        
        <p>Isso mata a polaridade emocional que alimenta o desejo.</p>
        
        <h4>Sinais de que isso está acontecendo:</h4>
        
        <ul>
            <li>Vocês se tratam mais como amigos do que como casal</li>
            <li>Quase não existe flerte</li>
            <li>O outro parece "invisível" no dia a dia</li>
        </ul>
        
        <h4>Por que isso mata o desejo:</h4>
        
        <p>Desejo precisa de <strong>diferença e presença.</strong><br>
        Quando o outro vira apenas parte do cenário da sua rotina, o cérebro
        para de registrar aquela pessoa como algo que merece atenção emocional.</p>
        
        <h4>Como reverter na prática:</h4>
        
        <ul>
            <li>Trate seu parceiro como alguém que você ainda quer conquistar</li>
            <li>Use micro-flerte no dia a dia</li>
            <li>Demonstre interesse sem pedir nada em troca</li>
            <li>Observe o outro como se estivesse conhecendo de novo</li>
        </ul>
        
        <h3>Erro 2 — Fazer do relacionamento um ambiente pesado</h3>
        
        <p>Muitos casais vivem em "modo problema":</p>
        
        <ul>
            <li>Falta dinheiro</li>
            <li>Falta tempo</li>
            <li>Falta energia</li>
            <li>Falta paciência</li>
        </ul>
        
        <p>Tudo isso é real.<br>
        Mas quando o relacionamento vira só um lugar de descarga emocional, o
        desejo não tem espaço para existir.</p>
        
        <p>Desejo é emoção leve, não peso emocional.</p>
        
        <h4>Sinais desse erro:</h4>
        
        <ul>
            <li>Conversas sempre terminam em reclamação</li>
            <li>O clima em casa é tenso</li>
            <li>Vocês se evitam quando estão cansados</li>
        </ul>
        
        <h4>Por que isso esfria o sexo:</h4>
        
        <p>O corpo associa o parceiro(a) a estresse.<br>
        E o corpo evita o que gera estresse.</p>
        
        <h4>Como reverter na prática:</h4>
        
        <ul>
            <li>Crie "zonas livres de problema" (momentos sem falar de dificuldades)</li>
            <li>Resgate conversas que não tenham objetivo</li>
            <li>Traga humor para o dia a dia</li>
            <li>Relembre histórias leves do início da relação</li>
        </ul>
        
        <h3>Erro 3 — Condicionar o toque ao sexo</h3>
        
        <p>Quando o toque só aparece como tentativa de iniciar sexo, ele perde o
        valor emocional.<br>
        O parceiro(a) passa a interpretar qualquer carinho como cobrança.</p>
        
        <p>Com o tempo, a pessoa evita o toque para evitar a expectativa.</p>
        
        <h4>Sinais desse erro:</h4>
        
        <ul>
            <li>O outro se esquiva quando você encosta</li>
            <li>O toque gera tensão, não relaxamento</li>
            <li>Existe medo de "dar abertura"</li>
        </ul>
        
        <h4>Por que isso mata o desejo:</h4>
        
        <p>O toque deveria criar segurança e conexão.<br>
        Quando vira moeda de troca, cria defesa emocional.</p>
        
        <h4>Como reverter na prática:</h4>
        
        <ul>
            <li>Toque sem intenção sexual por alguns dias</li>
            <li>Mostre que o carinho não é uma armadilha</li>
            <li>Recrie o contato físico como algo seguro</li>
            <li>Faça do toque um gesto de presença, não de cobrança</li>
        </ul>
        
        <h3>Erro 4 — Construir um histórico de crítica e desvalorização</h3>
        
        <p>Críticas acumuladas corroem o desejo.<br>
        Não porque o parceiro(a) fica "menos bonito(a)",<br>
        mas porque ele(a) se sente menos seguro emocionalmente.</p>
        
        <p>Ninguém se entrega sexualmente onde se sente julgado.</p>
        
        <h4>Sinais desse erro:</h4>
        
        <ul>
            <li>Ironias frequentes</li>
            <li>Correções constantes</li>
            <li>Pouco reconhecimento</li>
            <li>Sensação de "nada do que eu faço é suficiente"</li>
        </ul>
        
        <h4>Por que isso mata o desejo:</h4>
        
        <p>Desejo precisa de vulnerabilidade.<br>
        Vulnerabilidade precisa de segurança emocional.</p>
        
        <h4>Como reverter na prática:</h4>
        
        <ul>
            <li>Diminua a frequência de críticas</li>
            <li>Aumente a frequência de reconhecimento real</li>
            <li>Troque acusação por pedido</li>
            <li>Observe o impacto do seu tom, não só do seu conteúdo</li>
        </ul>
        
        <h3>Erro 5 — Repetir o mesmo roteiro sexual por anos</h3>
        
        <p>Mesmo quando o sexo ainda acontece, ele pode ter perdido a alma.<br>
        Quando tudo é previsível, o cérebro se desliga.</p>
        
        <p>Não é que o corpo não responda.<br>
        É que ele responde no modo mínimo.</p>
        
        <h4>Sinais desse erro:</h4>
        
        <ul>
            <li>O sexo acontece por hábito</li>
            <li>Falta envolvimento emocional</li>
            <li>Você sente que está "cumprindo tabela"</li>
        </ul>
        
        <h4>Por que isso esfria o desejo:</h4>
        
        <p>O cérebro responde ao novo, ao inesperado, ao presente.<br>
        Repetição excessiva gera anestesia emocional.</p>
        
        <h4>Como reverter na prática:</h4>
        
        <ul>
            <li>Mude pequenos detalhes</li>
            <li>Mude a forma de iniciar</li>
            <li>Mude o ambiente</li>
            <li>Mude o ritmo</li>
            <li>Mude a postura emocional (mais presença, menos pressa)</li>
        </ul>
        
        <h3>Um ponto que quase ninguém fala</h3>
        
        <p>Muitos casais acreditam que o outro é o problema.<br>
        Mas, na maioria das vezes, <strong>o problema é a dança entre os dois.</strong></p>
        
        <p>Quando um muda a música, a dança muda.</p>
        
        <p>Você não controla o comportamento do outro.<br>
        Mas controla o seu.<br>
        E isso já é suficiente para alterar a dinâmica do casal.</p>
        
        <h3>Exercício prático (transformador em 7 dias)</h3>
        
        <p>Escolha <strong>dois erros</strong> desta lista que mais se aplicam ao seu
        relacionamento.</p>
        
        <p>Durante 7 dias:</p>
        
        <ul>
            <li>Observe conscientemente quando você está repetindo esse erro</li>
            <li>Substitua por uma micro-ação diferente</li>
        </ul>
        
        <p>Exemplo:<br>
        Se o erro é "ambiente pesado", por 7 dias você vai:</p>
        
        <ul>
            <li>Evitar reclamações desnecessárias</li>
            <li>Criar um momento leve por dia</li>
        </ul>
        
        <p>Não espere resultado imediato no desejo sexual.<br>
        Espere primeiro mudança no <strong>clima emocional</strong>.<br>
        O desejo vem depois.</p>
        
        <p>No próximo capítulo, você vai aprender <strong>como criar clima mesmo quando a
        vontade não aparece</strong> — e por que isso muda completamente a dinâmica
        do sexo no relacionamento.</p>
      </div>
    `
  },
  {
    id: 6,
    type: "chapter",
    title: "Capítulo 3 — Desejo Não é Vontade: É Clima",
    content: `
      <h2 class="chapter-title">Capítulo 3 — Desejo Não é Vontade: É Clima</h2>
      <div class="chapter-content">
        <p>Um dos maiores erros que os casais cometem é esperar "dar vontade".</p>
        
        <p>Esperar o momento perfeito.<br>
        Esperar o cansaço passar.<br>
        Esperar o fim de semana.<br>
        Esperar o desejo aparecer do nada.</p>
        
        <p>Na prática, isso quase nunca funciona em relacionamentos longos.</p>
        
        <p>O desejo raramente nasce espontâneo depois que a rotina se instala.<br>
        Ele precisa ser <strong>cultivado.</strong></p>
        
        <p>E o primeiro passo para entender isso é separar duas coisas que muita
        gente confunde:<br>
        <strong>vontade</strong> e <strong>clima</strong>.</p>
        
        <h3>Vontade é consequência, não ponto de partida</h3>
        
        <p>No começo do relacionamento, a vontade surge fácil.<br>
        O simples fato de estar perto da pessoa já cria excitação.</p>
        
        <p>Com o tempo, o corpo passa a exigir contexto emocional.</p>
        
        <p>Você pode até amar seu parceiro(a),<br>
        mas se o dia foi pesado, se houve estresse, se houve atrito,<br>
        o corpo entra em modo de proteção.</p>
        
        <p>Ninguém relaxa e se entrega quando está emocionalmente tenso.</p>
        
        <p><strong>Desejo é um estado emocional, não um impulso automático.</strong></p>
        
        <p>Quando você entende isso, para de interpretar a falta de vontade como
        falta de amor ou atração.<br>
        E passa a olhar para o ambiente emocional que está sendo criado entre
        vocês.</p>
        
        <h3>O que realmente cria clima (e o que destrói)</h3>
        
        <p>Clima não é iluminação, música ou vela.<br>
        Isso ajuda, mas é superficial.</p>
        
        <p>O verdadeiro clima é construído por:</p>
        
        <ul>
            <li>Presença real (não estar no celular enquanto o outro fala)</li>
            <li>Atenção (ouvir de verdade, não só esperar sua vez de falar)</li>
            <li>Leveza (humor, brincadeira, descontração)</li>
            <li>Segurança emocional (não ser atacado(a) ou criticado(a))</li>
            <li>Tensão positiva (um pouco de mistério, provocação leve)</li>
        </ul>
        
        <p>E o que destrói o clima?</p>
        
        <ul>
            <li>Discussões mal resolvidas</li>
            <li>Clima de cobrança</li>
            <li>Ironia e desprezo</li>
            <li>Distanciamento emocional</li>
            <li>Indiferença</li>
        </ul>
        
        <p>Muitos casais tentam pular direto para o sexo sem cuidar do clima.<br>
        É como tentar acender uma fogueira jogando fósforo em madeira molhada.</p>
        
        <h3>O erro de "tentar iniciar sexo" do nada</h3>
        
        <p>Quando o clima está frio, qualquer tentativa de iniciar sexo soa
        estranha.<br>
        Pode parecer carência, cobrança ou até pressão.</p>
        
        <p>Isso gera duas reações comuns:</p>
        
        <ul>
            <li>Rejeição direta</li>
            <li>Aceitação sem envolvimento (sexo sem presença)</li>
        </ul>
        
        <p>Nenhuma das duas cria desejo verdadeiro.</p>
        
        <p>O problema não é tentar.<br>
        É tentar <strong>sem preparar o terreno emocional.</strong></p>
        
        <h3>Como criar clima ao longo do dia (não só na hora H)</h3>
        
        <p>Desejo não começa à noite.<br>
        Ele começa no jeito como vocês se tratam ao longo do dia.</p>
        
        <p>Aqui estão formas práticas de criar clima antes de pensar em sexo:</p>
        
        <h4>1️⃣ Micro-conexões</h4>
        
        <p>Pequenos momentos de conexão real:</p>
        
        <ul>
            <li>olhar nos olhos</li>
            <li>perguntar como o outro está e ouvir de verdade</li>
            <li>tocar sem pressa</li>
        </ul>
        
        <h4>2️⃣ Presença emocional</h4>
        
        <p>Estar com o outro sem estar em mil lugares na cabeça.<br>
        Isso cria sensação de importância.</p>
        
        <h4>3️⃣ Leve provocação</h4>
        
        <p>Não é vulgaridade.<br>
        É brincar, criar tensão leve, elogiar com um toque de intenção.</p>
        
        <p>Exemplo de diferença:<br>
        ❌ "Você está bonita hoje."<br>
        ✅ "Você sabe que fica difícil me concentrar quando você fica assim, né?"</p>
        
        <h3>O papel da segurança emocional no desejo</h3>
        
        <p>Muita gente tenta criar desejo pela excitação.<br>
        Mas esquece da base: <strong>segurança emocional.</strong></p>
        
        <p>Você não se entrega de verdade quando:</p>
        
        <ul>
            <li>sente que vai ser julgado(a)</li>
            <li>sente que qualquer coisa vira briga</li>
            <li>sente que precisa se defender</li>
        </ul>
        
        <p>Segurança emocional não é conforto demais.<br>
        É sentir que você pode ser você sem ser atacado(a).</p>
        
        <p>Sem isso, o corpo se fecha.<br>
        E corpo fechado não sente desejo.</p>
        
        <h3>A armadilha da "rotina cansada"</h3>
        
        <p>Quando a rotina vira apenas sobrevivência, o desejo perde prioridade.</p>
        
        <p>Você não cria clima quando:</p>
        
        <ul>
            <li>vive no automático</li>
            <li>chega em casa esgotado(a) e se fecha</li>
            <li>não cria espaços de leveza</li>
        </ul>
        
        <p>Não é falta de amor.<br>
        É falta de intenção.</p>
        
        <p>E intenção não é tempo sobrando.<br>
        É escolha consciente.</p>
        
        <h3>Como criar clima mesmo quando você está cansado(a)</h3>
        
        <p>Esse é o ponto realista.<br>
        Você não vai estar cheio(a) de energia todo dia.</p>
        
        <p>Criar clima não é fazer algo grandioso.<br>
        É mudar <strong>o tom da presença.</strong></p>
        
        <p>Exemplos simples:</p>
        
        <ul>
            <li>5 minutos de atenção real</li>
            <li>Um toque mais consciente</li>
            <li>Um elogio com intenção</li>
            <li>Um convite leve para proximidade</li>
        </ul>
        
        <p>Clima é mais sobre <strong>qualidade emocional</strong> do que sobre quantidade de
        time.</p>
        
        <h3>Exercício prático (mudança visível em poucos dias)</h3>
        
        <p>Durante os próximos 5 dias, faça o seguinte:</p>
        
        <ul>
            <li>Escolha <strong>um momento do dia</strong> para criar micro-clima:<br>
            → Pode ser quando se encontram<br>
            → Pode ser antes de dormir</li>
            <li>Nesse momento, desligue o celular</li>
            <li>Olhe nos olhos</li>
            <li>Toque sem cobrança</li>
            <li>Fale algo que crie leveza ou conexão</li>
        </ul>
        
        <p>O objetivo não é chegar ao sexo.<br>
        O objetivo é <strong>reensinar o corpo do casal a se sentir conectado.</strong></p>
        
        <p>Quando a conexão volta, o desejo encontra espaço para aparecer.</p>
        
        <p>No próximo capítulo, você vai aprender <strong>como você se tornou "invisível"
        no relacionamento sem perceber</strong> — e como recuperar presença e
        magnetismo sem implorar por atenção.</p>
      </div>
    `
  },
  {
    id: 7,
    type: "chapter",
    title: "Capítulo 4 — Como Você Se Tornou 'Invisível' no Relacionamento",
    content: `
      <h2 class="chapter-title">Capítulo 4 — Como Você Se Tornou "Invisível" no Relacionamento (Sem Perceber)</h2>
      <div class="chapter-content">
        <p>Ninguém entra em um relacionamento querendo ser ignorado.<br>
        Ninguém começa um namoro pensando:<br>
        "Daqui a alguns anos, meu parceiro(a) vai me ver como parte do cenário."</p>
        
        <p>Mas é exatamente isso que acontece com muitos casais.</p>
        
        <p>Você não deixa de ser atraente de um dia para o outro.<br>
        Você vai, aos poucos, <strong>deixando de ser percebido(a).</strong></p>
        
        <p>E quando você se torna invisível emocionalmente, o desejo perde um dos
        seus principais combustíveis: <strong>atenção.</strong></p>
        
        <h3>Invisibilidade não é falta de beleza — é falta de presença</h3>
        
        <p>Muita gente acha que perdeu o desejo porque:</p>
        
        <ul>
            <li>engordou</li>
            <li>envelheceu</li>
            <li>mudou o corpo</li>
            <li>não é mais "tão interessante" quanto antes</li>
        </ul>
        
        <p>Essas coisas até influenciam na autoestima.<br>
        Mas, na maioria dos casos, não são elas que tornam alguém invisível no
        relacionamento.</p>
        
        <p>O que torna alguém invisível é:</p>
        
        <ul>
            <li>previsibilidade emocional</li>
            <li>ausência de presença real</li>
            <li>falta de novidade no jeito de se mostrar</li>
            <li>comportamento automático</li>
        </ul>
        
        <p>Você pode estar bonito(a).<br>
        Mas, se está emocionalmente ausente, você some da percepção do outro.</p>
        
        <h3>O processo silencioso da invisibilidade</h3>
        
        <p>A invisibilidade não acontece por um grande erro.<br>
        Ela se constrói por pequenas desistências:</p>
        
        <ul>
            <li>Você para de se expressar para evitar conflito</li>
            <li>Para de se arrumar porque "já não faz diferença"</li>
            <li>Para de falar o que sente</li>
            <li>Para de se mostrar interessante</li>
            <li>Para de cuidar da sua energia emocional</li>
        </ul>
        
        <p>Com o tempo, o outro se acostuma com a sua presença.<br>
        Não no sentido bonito de intimidade,<br>
        mas no sentido anestesiante da previsibilidade.</p>
        
        <p>O cérebro para de registrar você como estímulo emocional.<br>
        E onde não há estímulo, não há desejo.</p>
        
        <h3>O erro de tentar recuperar atenção implorando</h3>
        
        <p>Quando a pessoa percebe que está sendo menos vista,<br>
        muitas vezes reage com carência:</p>
        
        <ul>
            <li>cobra atenção</li>
            <li>reclama que não é desejada</li>
            <li>pressiona por sexo</li>
            <li>pede validação o tempo todo</li>
        </ul>
        
        <p>Isso cria o efeito contrário.</p>
        
        <p>Carência não desperta desejo.<br>
        Carência gera obrigação ou fuga.</p>
        
        <p>O desejo nasce da escolha, não da pressão.</p>
        
        <h3>Como recuperar presença sem virar outra pessoa</h3>
        
        <p>Recuperar magnetismo não é virar alguém artificial.<br>
        É <strong>voltar a ter presença emocional própria.</strong></p>
        
        <p>Presença emocional é:</p>
        
        <ul>
            <li>ter opinião</li>
            <li>ter limites</li>
            <li>ter interesses</li>
            <li>ter energia própria</li>
            <li>não se moldar o tempo todo para agradar</li>
        </ul>
        
        <p>Pessoas com presença não imploram atenção.<br>
        Elas geram curiosidade.</p>
        
        <h3>O papel da sua vida fora do relacionamento</h3>
        
        <p>Quando sua vida gira apenas em torno do relacionamento,<br>
        o outro vira o seu único centro de energia emocional.</p>
        
        <p>Isso pesa.<br>
        E peso emocional não é atraente.</p>
        
        <p>Ter vida própria não afasta o parceiro(a).<br>
        Pelo contrário: cria oxigênio emocional.</p>
        
        <p>Você se torna alguém que:</p>
        
        <ul>
            <li>tem mundo próprio</li>
            <li>tem interesses</li>
            <li>tem movimento</li>
        </ul>
        
        <p>Movimento cria magnetismo.<br>
        Estagnação cria invisibilidade.</p>
        
        <h3>Micro-mudanças que te tiram do modo invisível</h3>
        
        <p>Você não precisa mudar sua personalidade.<br>
        Você precisa mudar <strong>seu nível de presença.</strong></p>
        
        <p>Algumas micro-mudanças práticas:</p>
        
        <ul>
            <li>Se arrumar um pouco mais para si, não para o outro</li>
            <li>Voltar a falar o que você pensa (com respeito)</li>
            <li>Criar pequenos momentos de imprevisibilidade</li>
            <li>Ter um hobby, um projeto, algo que te mova</li>
            <li>Não estar sempre 100% disponível emocionalmente</li>
        </ul>
        
        <p>Não é joguinho.<br>
        É voltar a ser alguém que tem energia própria.</p>
        
        <h3>Um ponto sensível (mas importante)</h3>
        
        <p>Desejo também precisa de <strong>polaridade emocional.</strong><br>
        Quando você se anula para não criar atrito,<br>
        você apaga sua presença.</p>
        
        <p>Conflito saudável não mata desejo.<br>
        Conflito mal resolvido, sim.</p>
        
        <p>Ter opinião, discordar com respeito, se posicionar —<br>
        tudo isso te torna mais visível emocionalmente.</p>
        
        <h3>Exercício prático (recuperando magnetismo em 7 dias)</h3>
        
        <p>Durante os próximos 7 dias:</p>
        
        <ul>
            <li>Faça <strong>uma coisa por dia</strong> que seja só sua<br>
            (algo que te mova, te anime, te faça se sentir vivo(a))</li>
            <li>Em pelo menos um momento do dia,<br>
            se posicione com mais presença (sem agressividade)</li>
            <li>Observe como muda a forma como o outro reage à sua energia</li>
        </ul>
        
        <p>O objetivo não é manipular o parceiro(a).<br>
        É <strong>voltar a ocupar espaço emocional no relacionamento.</strong></p>
        
        <p>No próximo capítulo, você vai aprender <strong>o tripé da atração: postura,
        energia e presença</strong> — e como aplicar isso no dia a dia sem parecer
        artificial.</p>
      </div>
    `
  },
  {
    id: 8,
    type: "chapter",
    title: "Capítulo 5 — O Tripé da Atração: Postura, Energia e Presença",
    content: `
      <h2 class="chapter-title">Capítulo 5 — O Tripé da Atração: Postura, Energia e Presença</h2>
      <div class="chapter-content">
        <p>Muita gente tenta recuperar o desejo no relacionamento mudando "o que
        faz" na cama.<br>
        Mas ignora o que <strong>transmite fora dela</strong>.</p>
        
        <p>A atração não nasce no momento do sexo.<br>
        Ela é construída ao longo do dia pela forma como você se posiciona no
        mundo — e, principalmente, dentro do relacionamento.</p>
        
        <p>Existem três pilares que sustentam a atração a longo prazo:<br>
        <strong>postura, energia e presença.</strong><br>
        Quando um deles cai, o desejo enfraquece.<br>
        Quando os três estão ativos, o magnetismo volta a aparecer.</p>
        
        <h3>Postura: como você se posiciona emocionalmente</h3>
        
        <p>Postura não é só postura corporal.<br>
        É postura emocional.</p>
        
        <p>É a diferença entre:</p>
        
        <ul>
            <li>pedir atenção x se fazer interessante</li>
            <li>implorar por desejo x criar contexto para o desejo surgir</li>
            <li>se diminuir x se respeitar</li>
        </ul>
        
        <p>Postura emocional saudável é:</p>
        
        <ul>
            <li>saber o que você quer</li>
            <li>comunicar sem agressividade</li>
            <li>não se anular para agradar</li>
            <li>não viver em modo de cobrança</li>
        </ul>
        
        <p>Quando você se coloca como alguém que se respeita,<br>
        o outro passa a te respeitar emocionalmente também.<br>
        E respeito é combustível para o desejo.</p>
        
        <h4>O que derruba sua postura:</h4>
        
        <ul>
            <li>carência constante</li>
            <li>medo de desagradar</li>
            <li>evitar conflitos a qualquer custo</li>
            <li>se moldar o tempo todo</li>
        </ul>
        
        <h4>Como fortalecer sua postura:</h4>
        
        <ul>
            <li>expresse seus limites</li>
            <li>peça o que você quer sem humilhar nem implorar</li>
            <li>diga "não" quando for necessário</li>
            <li>não negocie sua dignidade por migalhas de atenção</li>
        </ul>
        
        <h3>Energia: o "clima" que você carrega</h3>
        
        <p>Energia não é misticismo.<br>
        É o estado emocional que você traz para o ambiente.</p>
        
        <p>Você conhece pessoas que entram em um lugar e deixam tudo mais pesado?<br>
        E conhece pessoas que entram e o ambiente fica mais leve?</p>
        
        <p>No relacionamento é igual.</p>
        
        <p>Se você carrega:</p>
        
        <ul>
            <li>reclamação</li>
            <li>vitimização</li>
            <li>tensão</li>
            <li>negatividade</li>
        </ul>
        
        <p>Isso contamina o clima do casal.<br>
        E clima pesado não gera desejo.</p>
        
        <p>Energia atraente é:</p>
        
        <ul>
            <li>leveza</li>
            <li>humor</li>
            <li>curiosidade</li>
            <li>presença</li>
            <li>abertura emocional</li>
        </ul>
        
        <p>Não é fingir felicidade.<br>
        É escolher não viver em modo descarga emocional o tempo todo.</p>
        
        <h4>Como ajustar sua energia no dia a dia:</h4>
        
        <ul>
            <li>perceba o "tom" com que você fala</li>
            <li>traga leveza quando possível</li>
            <li>não transforme todo diálogo em problema</li>
            <li>escolha pequenos momentos de descontração</li>
        </ul>
        
        <h3>Presença: estar inteiro quando está junto</h3>
        
        <p>Você pode estar fisicamente ao lado do seu parceiro(a)<br>
        e emocionalmente em outro planeta.</p>
        
        <p>Presença é:</p>
        
        <ul>
            <li>ouvir sem preparar resposta</li>
            <li>olhar nos olhos</li>
            <li>estar ali de verdade</li>
            <li>não dividir atenção com o celular</li>
        </ul>
        
        <p>Presença faz a outra pessoa se sentir vista.<br>
        E se sentir visto(a) é um dos maiores gatilhos de conexão emocional.</p>
        
        <p>Sem presença, o outro se sente invisível.<br>
        E ninguém deseja se conectar com quem não está ali de verdade.</p>
        
        <h4>O que rouba sua presença:</h4>
        
        <ul>
            <li>celular</li>
            <li>cansaço mental</li>
            <li>viver sempre no futuro</li>
            <li>preocupações constantes</li>
        </ul>
        
        <h4>Como aumentar sua presença:</h4>
        
        <ul>
            <li>crie pequenos rituais de atenção</li>
            <li>escolha momentos sem tela</li>
            <li>pratique escuta real</li>
            <li>esteja ali por alguns minutos com intenção total</li>
        </ul>
        
        <h3>O efeito do tripé no desejo</h3>
        
        <p>Quando postura, energia e presença estão alinhadas,<br>
        você cria uma base emocional que:</p>
        
        <ul>
            <li>gera respeito</li>
            <li>cria leveza</li>
            <li>desperta curiosidade</li>
            <li>facilita a intimidade</li>
        </ul>
        
        <p>Você não precisa ser perfeito(a).<br>
        Precisa ser <strong>intencional.</strong></p>
        
        <p>Relacionamentos não perdem desejo por falta de amor.<br>
        Perdem por falta de presença emocional qualificada.</p>
        
        <h3>Como aplicar o tripé sem parecer artificial</h3>
        
        <p>O erro é tentar "atuar" atração.<br>
        Isso soa falso e cansa.</p>
        
        <p>Aplicar o tripé é ajustar seu estado interno, não seu teatro externo.</p>
        
        <p>Comece pequeno:</p>
        
        <ul>
            <li>1 limite bem colocado</li>
            <li>1 momento de leveza</li>
            <li>1 conversa com presença real</li>
        </ul>
        
        <p>Três micro-mudanças já alteram a dinâmica do casal.</p>
        
        <h3>Exercício prático (mudando a dinâmica em 5 dias)</h3>
        
        <p>Durante os próximos 5 dias:</p>
        
        <ul>
            <li>Escolha <strong>um pilar por dia</strong> para focar</li>
            <li>Dia 1: postura</li>
            <li>Dia 2: energia</li>
            <li>Dia 3: presença</li>
            <li>Dia 4: postura</li>
            <li>Dia 5: energia + presença</li>
        </ul>
        
        <p>Em cada dia, faça pelo menos <strong>uma ação consciente</strong> ligada ao pilar do
        dia.</p>
        
        <p>Exemplo:<br>
        No dia da presença, faça uma conversa de 10 minutos sem celular.<br>
        No dia da postura, coloque um limite com respeito.<br>
        No dia da energia, traga leveza para um momento tenso.</p>
        
        <p>Observe como pequenas mudanças internas mudam o clima externo.</p>
        
        <p>No próximo capítulo, você vai aprender <strong>como voltar a ser desejado(a)
        sem implorar por atenção ou sexo</strong> — e por que "correr atrás" quase
        sempre afasta.</p>
      </div>
    `
  },
  {
    id: 9,
    type: "chapter",
    title: "Capítulo 6 — Como Voltar a Ser Desejado(a) Sem Implorar por Atenção ou Sexo",
    content: `
      <h2 class="chapter-title">Capítulo 6 — Como Voltar a Ser Desejado(a) Sem Implorar por Atenção ou Sexo</h2>
      <div class="chapter-content">
        <p>Quando o desejo esfria, a reação mais comum é correr atrás.</p>
        
        <p>Correr atrás de atenção.<br>
        Correr atrás de carinho.<br>
        Correr atrás de sexo.</p>
        
        <p>Isso é humano.<br>
        Mas, infelizmente, é uma das atitudes que mais <strong>afastam</strong> o desejo do
        outro.</p>
        
        <p>Não porque você não merece atenção,<br>
        mas porque <strong>desejo não nasce de pressão.</strong><br>
        Ele nasce de escolha.</p>
        
        <h3>Por que implorar mata o desejo</h3>
        
        <p>Quando você implora por atenção ou sexo, mesmo que de forma sutil,<br>
        o outro passa a te ver como alguém que precisa — não como alguém que
        escolhe.</p>
        
        <p>Isso muda a dinâmica emocional do casal:</p>
        
        <ul>
            <li>Você fica em posição de carência</li>
            <li>O outro fica em posição de controle</li>
            <li>O desejo vira obrigação</li>
        </ul>
        
        <p>Ninguém deseja por obrigação.<br>
        No máximo, cede.</p>
        
        <p>E ceder não é o mesmo que desejar.</p>
        
        <h3>A diferença entre se aproximar e se humilhar</h3>
        
        <p>Se aproximar é:</p>
        
        <ul>
            <li>criar conexão</li>
            <li>gerar clima</li>
            <li>estar presente</li>
            <li>demonstrar interesse sem pressão</li>
        </ul>
        
        <p>Se humilhar (mesmo sem perceber) é:</p>
        
        <ul>
            <li>cobrar desejo</li>
            <li>usar culpa ("você nunca me procura")</li>
            <li>pressionar</li>
            <li>negociar sexo com favores</li>
            <li>medir seu valor pela resposta do outro</li>
        </ul>
        
        <p>Um cria espaço para o desejo.<br>
        O outro mata o espaço do desejo.</p>
        
        <h3>O poder da retirada estratégica (sem joguinho)</h3>
        
        <p>Quando você para de implorar, algo muda na dinâmica:</p>
        
        <ul>
            <li>Você recupera postura</li>
            <li>O outro sente menos pressão</li>
            <li>O ambiente emocional fica mais leve</li>
        </ul>
        
        <p>Isso não é fazer joguinho.<br>
        É parar de sufocar o espaço onde o desejo poderia nascer.</p>
        
        <p>Desejo precisa de <strong>escolha livre.</strong><br>
        Quando a escolha é pressionada, ela deixa de ser escolha.</p>
        
        <h3>Como voltar a ser desejado(a) na prática</h3>
        
        <p>Não é se afastar por vingança.<br>
        É se posicionar com dignidade emocional.</p>
        
        <p>Aqui estão atitudes práticas:</p>
        
        <h4>1️⃣ Pare de medir seu valor pela resposta do outro</h4>
        
        <p>Seu valor não muda porque o outro está cansado, estressado ou fechado
        emocionalmente.</p>
        
        <h4>2️⃣ Cuide da sua energia antes de buscar desejo</h4>
        
        <p>Pessoas com energia própria são mais atraentes do que pessoas pedindo
        energia.</p>
        
        <h4>3️⃣ Volte a ser interessante para você</h4>
        
        <p>Faça coisas que te deem sensação de movimento, não só de sobrevivência.</p>
        
        <h4>4️⃣ Crie clima, não cobrança</h4>
        
        <p>Clima abre portas.<br>
        Cobrança fecha.</p>
        
        <h4>5️⃣ Não negocie sexo como moeda</h4>
        
        <p>Sexo não é recompensa por bom comportamento.<br>
        É expressão de conexão.</p>
        
        <h3>O erro de "dar gelo" como estratégia</h3>
        
        <p>Algumas pessoas confundem "não implorar" com "dar gelo".</p>
        
        <p>Dar gelo é:</p>
        
        <ul>
            <li>manipulação</li>
            <li>punição emocional</li>
            <li>jogo de poder</li>
        </ul>
        
        <p>Isso destrói confiança e não cria desejo saudável.</p>
        
        <p>O que funciona é <strong>presença sem carência</strong>.<br>
        Você continua acessível, mas não dependente.</p>
        
        <h3>Quando só você quer mudar</h3>
        
        <p>Talvez você esteja fazendo sua parte<br>
        e o outro ainda esteja fechado.</p>
        
        <p>Isso é frustrante.</p>
        
        <p>Mas lembre-se:<br>
        quando uma pessoa muda a postura emocional,<br>
        a dinâmica inteira muda com o tempo.</p>
        
        <p>Você não controla o outro.<br>
        Mas controla o clima que você cria ao redor de você.</p>
        
        <p>E clima muda comportamento.</p>
        
        <h3>Exercício prático (reposicionando sua energia em 7 dias)</h3>
        
        <p>Durante 7 dias:</p>
        
        <ul>
            <li>Observe quando você está cobrando atenção ou desejo</li>
            <li>Substitua cobrança por <strong>presença + leveza + limite</strong></li>
            <li>Faça ao menos <strong>uma coisa por dia que te deixe com sensação de valor
            próprio</strong></li>
            <li>Pare de iniciar qualquer interação com peso emocional</li>
        </ul>
        
        <p>O objetivo não é "conseguir sexo".<br>
        É <strong>mudar sua posição emocional dentro da relação.</strong></p>
        
        <p>Quando sua posição muda, a resposta do outro tende a mudar.</p>
        
        <p>No próximo capítulo, você vai aprender <strong>por que falar de sexo vira
        briga</strong> — e como mudar essa conversa para que ela aproxime, em vez de
        afastar.</p>
      </div>
    `
  },
  {
    id: 10,
    type: "chapter",
    title: "Capítulo 7 — Por Que Falar de Sexo Vira Briga",
    content: `
      <h2 class="chapter-title">Capítulo 7 — Por Que Falar de Sexo Vira Briga (E Como Fazer Essa Conversa Aproximar)</h2>
      <div class="chapter-content">
        <p>Muitos casais não têm problemas com sexo.<br>
        Têm problemas em <strong>falar sobre sexo.</strong></p>
        
        <p>A conversa vira climão.<br>
        Vira defesa.<br>
        Vira ataque.<br>
        Vira silêncio.</p>
        
        <p>E, depois de algumas tentativas frustradas, muita gente simplesmente
        desiste de falar.<br>
        O problema é que o silêncio não resolve.<br>
        Ele só empurra a frustração para debaixo do tapete.</p>
        
        <h3>O que realmente está por trás das brigas sobre sexo</h3>
        
        <p>Quando você fala de sexo, você não está falando só de sexo.<br>
        Você está falando de:</p>
        
        <ul>
            <li>desejo</li>
            <li>rejeição</li>
            <li>insegurança</li>
            <li>autoestima</li>
            <li>medo de não ser suficiente</li>
        </ul>
        
        <p>É por isso que o tema é tão sensível.<br>
        Qualquer frase mal colocada toca em feridas profundas.</p>
        
        <p>Quando alguém ouve:<br>
        "Você nunca me procura",<br>
        o cérebro traduz como:<br>
        "Eu não sou suficiente."</p>
        
        <p>E o corpo entra em modo de defesa.</p>
        
        <h3>Os três gatilhos que transformam conversa em briga</h3>
        
        <h4>1️⃣ Tom de cobrança</h4>
        
        <p>Mesmo frases verdadeiras soam como ataque quando vêm com cobrança.</p>
        
        <p>❌ "Você nunca quer nada."<br>
        ✅ "Sinto falta de me sentir desejado(a) por você."</p>
        
        <h4>2️⃣ Generalizações</h4>
        
        <p>"Nunca" e "sempre" fecham qualquer diálogo.</p>
        
        <p>❌ "Você sempre foge do assunto."<br>
        ✅ "Quando a gente não conversa sobre isso, eu me sinto distante."</p>
        
        <h4>3️⃣ Falar no momento errado</h4>
        
        <p>Tentar falar de sexo no meio de uma briga, no cansaço extremo ou logo
        após uma rejeição cria defesa automática.</p>
        
        <h3>O momento certo muda tudo</h3>
        
        <p>Não existe "hora perfeita",<br>
        mas existe <strong>hora péssima.</strong></p>
        
        <p>Evite falar de sexo quando:</p>
        
        <ul>
            <li>alguém acabou de dizer "não"</li>
            <li>vocês estão estressados</li>
            <li>existe algo mal resolvido na hora</li>
        </ul>
        
        <p>Escolha um momento neutro,<br>
        onde ninguém está se defendendo.</p>
        
        <h3>Como transformar a conversa em conexão</h3>
        
        <p>Aqui entra uma mudança simples e poderosa:</p>
        
        <h4>Fale de você, não do outro</h4>
        
        <p>Quando você acusa, o outro se defende.<br>
        Quando você se expõe, o outro tende a ouvir.</p>
        
        <p>Exemplos:</p>
        
        <p>❌ "Você não se importa com nossa vida sexual."<br>
        ✅ "Eu sinto falta de me sentir mais conectado(a) com você."</p>
        
        <p>❌ "Você nunca me deseja."<br>
        ✅ "Eu fico inseguro(a) quando sinto que não sou desejado(a)."</p>
        
        <p>Isso não é manipulação.<br>
        É comunicação emocional madura.</p>
        
        <h3>O papel da escuta no desejo</h3>
        
        <p>Muitos casais querem ser ouvidos,<br>
        mas não querem ouvir.</p>
        
        <p>Quando o outro fala:</p>
        
        <ul>
            <li>você se defende</li>
            <li>você rebate</li>
            <li>você explica</li>
            <li>você justifica</li>
        </ul>
        
        <p>Pouca gente <strong>escuta.</strong></p>
        
        <p>Escutar não é concordar.<br>
        É permitir que o outro exista emocionalmente sem ser atacado.</p>
        
        <p>Sem escuta, não existe intimidade.<br>
        Sem intimidade, não existe desejo profundo.</p>
        
        <h3>Falando de desejos e limites sem ferir</h3>
        
        <p>Desejos são pessoais.<br>
        Limites também.</p>
        
        <p>O erro é tratar desejo do outro como crítica a você.<br>
        Ou tratar seu desejo como obrigação do outro.</p>
        
        <p>Uma conversa saudável tem dois pilares:</p>
        
        <ul>
            <li>curiosidade</li>
            <li>respeito</li>
        </ul>
        
        <p>Curiosidade para entender o mundo do outro.<br>
        Respeito para aceitar que nem tudo precisa ser igual.</p>
        
        <h3>Roteiro simples de conversa (pra não virar briga)</h3>
        
        <p>Use este formato:</p>
        
        <ol>
            <li>Comece por você<br>
            > "Eu queria te falar algo que é importante pra mim..."</li>
            <li>Fale do sentimento<br>
            > "Tenho sentido falta de me sentir mais conectado(a) com você."</li>
            <li>Fale da necessidade<br>
            > "Pra mim, intimidade é uma forma de conexão."</li>
            <li>Convite o outro<br>
            > "Queria entender como você se sente sobre isso."</li>
        </ol>
        
        <p>Sem acusar.<br>
        Sem generalizar.<br>
        Sem exigir.</p>
        
        <h3>Exercício prático (mudando a qualidade da conversa)</h3>
        
        <p>Durante a próxima semana:</p>
        
        <ul>
            <li>Escolha <strong>um momento neutro</strong></li>
            <li>Use o roteiro acima</li>
            <li>Foque mais em ouvir do que em convencer</li>
            <li>Observe como o tom muda quando você muda a forma</li>
        </ul>
        
        <p>O objetivo não é "ganhar a conversa".<br>
        É <strong>criar espaço emocional para o desejo voltar a existir.</strong></p>
        
        <p>No próximo capítulo, você vai aprender <strong>como pedir o que você quer na
        cama sem criar clima estranho</strong> — e como ouvir o que o outro quer sem
        levar para o lado pessoal.</p>
      </div>
    `
  },
  {
    id: 11,
    type: "chapter",
    title: "Capítulo 8 — Como Pedir o Que Você Quer na Cama Sem Criar Clima Estranho",
    content: `
      <h2 class="chapter-title">Capítulo 8 — Como Pedir o Que Você Quer na Cama Sem Criar Clima Estranho</h2>
      <div class="chapter-content">
        <p>Muita gente não sabe pedir o que quer na cama.<br>
        E não é por falta de desejo — é por medo.</p>
        
        <p>Medo de parecer "demais".<br>
        Medo de parecer "estranho".<br>
        Medo de ferir o outro.<br>
        Medo de ouvir um "não".</p>
        
        <p>Então a pessoa vai engolindo vontades, fantasias, curiosidades...<br>
        até que o sexo fica previsível, automático ou simplesmente some.</p>
        
        <p>Desejo não morre por falta de amor.<br>
        Morre por falta de espaço para existir.</p>
        
        <h3>Por que pedir dá tanto medo?</h3>
        
        <p>Pedir algo na cama é se expor.<br>
        É dizer: "Isso me dá prazer."<br>
        E, por trás disso, está a mensagem emocional:<br>
        "Eu confio em você para conhecer uma parte íntima minha."</p>
        
        <p>Quando o pedido é recebido com deboche, julgamento ou desprezo,<br>
        o cérebro aprende:</p>
        
        <blockquote>"Não é seguro me abrir aqui."</blockquote>
        
        <p>Resultado?<br>
        A pessoa começa a se fechar.<br>
        E o sexo vira repetição sem presença.</p>
        
        <h3>O erro clássico: pedir do jeito errado</h3>
        
        <p>A maioria das pessoas pede de três formas que sabotam tudo:</p>
        
        <p>❌ <strong>No meio do ato, com pressão</strong><br>
        > "Por que você nunca faz isso?"<br>
        Isso vira cobrança.</p>
        
        <p>❌ <strong>Como crítica disfarçada</strong><br>
        > "Meu ex fazia diferente..."<br>
        Isso vira comparação (e mata o clima na hora).</p>
        
        <p>❌ <strong>Como obrigação</strong><br>
        > "Se você me amasse, faria isso."<br>
        Isso vira chantagem emocional.</p>
        
        <p>Nenhuma dessas cria abertura.<br>
        Todas criam defesa.</p>
        
        <h3>O jeito que o desejo gosta de ser convidado</h3>
        
        <p>Desejo não responde bem à pressão.<br>
        Desejo responde a <strong>convite, segurança e curiosidade.</strong></p>
        
        <p>Aqui vai um formato terapêutico simples que funciona:</p>
        
        <h4>1️⃣ Comece pelo clima emocional</h4>
        
        <p>> "Tem uma coisa que eu queria te contar porque me sinto seguro(a) com
        você..."</p>
        
        <h4>2️⃣ Fale do seu desejo sem impor</h4>
        
        <p>> "Uma coisa que me dá muito prazer é..."</p>
        
        <h4>3️⃣ Traga leveza</h4>
        
        <p>> "Não é obrigação, é só algo que eu queria compartilhar contigo."</p>
        
        <p>Quando o pedido vem com respeito,<br>
        o outro não se sente cobrado — se sente convidado.</p>
        
        <h3>E quando o outro não quer?</h3>
        
        <p>Aqui entra maturidade emocional.</p>
        
        <p>Ouvir um "não" não significa:</p>
        
        <ul>
            <li>que você é inadequado(a)</li>
            <li>que seu desejo é errado</li>
            <li>que o relacionamento está condenado</li>
        </ul>
        
        <p>Significa apenas que o desejo do outro é diferente do seu naquele ponto.</p>
        
        <p>Casais saudáveis não são iguais em tudo.<br>
        Eles sabem negociar diferenças sem transformar isso em rejeição pessoal.</p>
        
        <p>Você pode responder assim:</p>
        
        <blockquote>"Obrigado(a) por ser honesto(a). Pra mim é importante poder falar
        disso sem pressão."</blockquote>
        
        <p>Isso mantém o canal aberto para o futuro.<br>
        Pressão fecha portas.<br>
        Respeito mantém portas destrancadas.</p>
        
        <h3>Fantasias: o território mais mal compreendido do casal</h3>
        
        <p>Fantasias não são ordens de serviço.<br>
        São imaginação erótica.</p>
        
        <p>Ter uma fantasia não significa querer realizá-la exatamente como ela é.<br>
        Muitas vezes, a fantasia é só um símbolo de:</p>
        
        <ul>
            <li>poder</li>
            <li>entrega</li>
            <li>novidade</li>
            <li>sensação de ser desejado(a)</li>
        </ul>
        
        <p>O erro é levar tudo ao pé da letra.<br>
        O acerto é perguntar:</p>
        
        <blockquote>"O que nessa fantasia te chama atenção?"</blockquote>
        
        <p>Às vezes, dá para traduzir a essência da fantasia para algo confortável
        para ambos.</p>
        
        <h3>Comunicação erótica é treino, não dom</h3>
        
        <p>Ninguém nasce sabendo falar de sexo.<br>
        Isso é aprendizado.</p>
        
        <p>No começo, pode sair estranho.<br>
        Pode dar risada.<br>
        Pode dar vergonha.</p>
        
        <p>Mas casais que mantêm o desejo vivo não são os que nunca travam —<br>
        são os que <strong>continuam conversando mesmo travando.</strong></p>
        
        <h3>Exercício prático (reconstruindo o diálogo erótico)</h3>
        
        <p>Durante esta semana:</p>
        
        <ul>
            <li>Pense em <strong>uma coisa simples</strong> que você gostaria mais na intimidade</li>
            <li>Escolha um momento fora da cama</li>
            <li>Use o formato:<br>
            - "Queria te contar algo que me dá prazer..."<br>
            - "Não é cobrança, só um desejo meu."<br>
            - "Queria saber como você se sente sobre isso."</li>
        </ul>
        
        <p>Observe:<br>
        não é sobre conseguir tudo o que quer.<br>
        É sobre criar um espaço onde o desejo pode ser falado sem medo.</p>
        
        <p>No próximo capítulo, vou entrar em um tema que quase ninguém aborda
        direito:<br>
        <strong>como o cansaço, rotina e estresse destroem o desejo — e o que
        realmente funciona para reativar a chama no mundo real, sem papo de
        guru.</strong></p>
      </div>
    `
  },
  {
    id: 12,
    type: "chapter",
    title: "Capítulo 9 — Cansaço, Rotina e Estresse: Os Maiores Inimigos do Desejo",
    content: `
      <h2 class="chapter-title">Capítulo 9 — Cansaço, Rotina e Estresse: Os Maiores Inimigos do Desejo (E Como Vencer o Jogo Real)</h2>
      <div class="chapter-content">
        <p>Vamos falar a verdade que ninguém gosta de admitir:<br>
        não é falta de amor que mata o sexo.<br>
        É <strong>vida adulta.</strong></p>
        
        <p>Boleto, trabalho, filho, chefe chato, trânsito, dor nas costas, celular
        vibrando, mente cansada.<br>
        O desejo até quer aparecer...<br>
        mas chega num ambiente onde só tem exaustão emocional.</p>
        
        <p>Desejo precisa de energia psíquica.<br>
        Cansaço drena energia psíquica.</p>
        
        <p>Não é drama.<br>
        É biologia + psicologia + vida real.</p>
        
        <h3>O mito da "falta de tesão"</h3>
        
        <p>Muita gente diz:</p>
        
        <blockquote>"Acho que perdi o tesão em você."</blockquote>
        
        <p>Na maioria das vezes, a tradução honesta é:</p>
        
        <blockquote>"Eu perdi energia para acessar meu próprio desejo."</blockquote>
        
        <p>O corpo até funciona.<br>
        O problema é que a mente está em modo sobrevivência.</p>
        
        <p>Quando o cérebro está ocupado tentando dar conta da vida,<br>
        ele não entra em modo prazer.<br>
        Ele entra em modo tarefa.</p>
        
        <p>E ninguém sente tesão por tarefa.</p>
        
        <h3>Rotina não mata o desejo. O que mata é a ausência de presença.</h3>
        
        <p>Rotina existe em todo relacionamento longo.<br>
        O problema não é repetir dias parecidos.<br>
        É <strong>repetir sem presença emocional.</strong></p>
        
        <p>Sexo automático é igual comer olhando pro celular:<br>
        você até mata a fome,<br>
        mas não sente o sabor.</p>
        
        <p>Presença é o que devolve o gosto.</p>
        
        <h3>O erro clássico: esperar "dar vontade"</h3>
        
        <p>Muita gente espera o desejo surgir para então se aproximar.<br>
        Na vida adulta, isso quase nunca funciona.</p>
        
        <p>O desejo muitas vezes vem <strong>depois do contato</strong>,<br>
        não antes.</p>
        
        <p>Você não espera estar em forma para ir à academia.<br>
        Você vai à academia para entrar em forma.</p>
        
        <p>Com desejo é parecido:<br>
        o corpo desperta no movimento, não na espera.</p>
        
        <h3>Microconexões: o segredo que ninguém vende</h3>
        
        <p>Casais que mantêm a chama acesa não vivem em clima de filme pornô.<br>
        Eles constroem <strong>microconexões ao longo do dia</strong>:</p>
        
        <ul>
            <li>um toque rápido sem intenção de sexo</li>
            <li>um elogio real</li>
            <li>um abraço de 10 segundos</li>
            <li>uma mensagem com cuidado</li>
            <li>um olhar sem pressa</li>
        </ul>
        
        <p>Esses pequenos gestos acumulam <strong>segurança emocional.</strong><br>
        Segurança emocional vira abertura para desejo.</p>
        
        <p>Sem isso, o convite para sexo soa como:<br>
        "Vamos cumprir a função conjugal agora?"</p>
        
        <p>E ninguém sente tesão por obrigação.</p>
        
        <h3>Cansaço não se resolve com discurso. Se resolve com ajustes reais.</h3>
        
        <p>Aqui entra maturidade prática:</p>
        
        <p>Perguntas que mudam o jogo:</p>
        
        <ul>
            <li>O que está drenando mais nossa energia hoje?</li>
            <li>O que pode ser ajustado minimamente?</li>
            <li>Estamos tentando ter vida sexual de solteiro vivendo rotina de
            pai/mãe/trabalho pesado?</li>
        </ul>
        
        <p>Não é sobre criar um cenário perfeito.<br>
        É sobre <strong>criar um cenário possível.</strong></p>
        
        <p>Às vezes, o "momento ideal" é:</p>
        
        <ul>
            <li>luz apagada</li>
            <li>15 minutos</li>
            <li>sem performance</li>
            <li>só presença</li>
        </ul>
        
        <p>E isso já reacende mais que mil promessas de "vamos marcar um dia".</p>
        
        <h3>O desejo responde melhor à leveza do que à cobrança</h3>
        
        <p>Frases que matam o desejo:<br>
        ❌ "A gente nunca mais transa."<br>
        ❌ "Você só pensa em dormir."<br>
        ❌ "Parece que você não me quer mais."</p>
        
        <p>Frases que abrem espaço:<br>
        ✅ "Sinto falta da gente mais perto."<br>
        ✅ "Queria que a gente tivesse mais nossos momentos."<br>
        ✅ "Tem algo que eu possa fazer pra te ajudar a ficar menos cansado(a)?"</p>
        
        <p>Cobrança cria defesa.<br>
        Leveza cria abertura.</p>
        
        <h3>Exercício prático (reativando o desejo no mundo real)</h3>
        
        <p>Durante os próximos 7 dias:</p>
        
        <ul>
            <li>Crie <strong>uma microconexão por dia</strong> sem objetivo sexual</li>
            <li>Pode ser toque, mensagem, elogio, presença</li>
            <li>Observe como o clima muda</li>
            <li>No fim da semana, perceba: o desejo tende a aparecer quando o ambiente
            fica emocionalmente mais seguro</li>
        </ul>
        
        <p>Não é mágica.<br>
        É construção.</p>
        
        <p>No próximo capítulo, vou entrar num território delicado e libertador:<br>
        <strong>como lidar com rejeição sexual sem destruir sua autoestima nem virar
        refém da carência.</strong><br>
        Tema que muda relacionamentos por dentro.</p>
      </div>
    `
  },
  {
    id: 13,
    type: "chapter",
    title: "Capítulo 10 — Rejeição na Cama: Como Não Deixar Isso Quebrar Sua Autoestima",
    content: `
      <h2 class="chapter-title">Capítulo 10 — Rejeição na Cama: Como Não Deixar Isso Quebrar Sua Autoestima (Nem o Relacionamento)</h2>
      <div class="chapter-content">
        <p>Poucas coisas doem tanto no relacionamento quanto a rejeição sexual.<br>
        Você chega com desejo.<br>
        Recebe um "hoje não".<br>
        E, em segundos, a cabeça começa a viajar:</p>
        
        <blockquote>
        "Não sou atraente."<br>
        "Não sou suficiente."<br>
        "Ele(a) não me quer mais."<br>
        "Tem outra pessoa?"
        </blockquote>
        
        <p>A rejeição acontece no corpo,<br>
        mas a ferida nasce na interpretação.</p>
        
        <h3>O erro invisível: transformar um "não" em identidade</h3>
        
        <p>Um "não" não é um diagnóstico sobre quem você é.<br>
        É um recorte de um momento.</p>
        
        <p>Mas quando a pessoa já carrega insegurança antiga,<br>
        o "não" vira prova de algo que ela já tem medo de ser:</p>
        
        <blockquote>"Tá vendo? Eu não sou desejável."</blockquote>
        
        <p>Isso cria um ciclo:</p>
        
        <ul>
            <li>você se aproxima com medo</li>
            <li>recebe um "não"</li>
            <li>se fecha</li>
            <li>começa a evitar tentar</li>
            <li>o desejo do casal esfria</li>
            <li>o distanciamento aumenta</li>
        </ul>
        
        <p>Não é o "não" que destrói.<br>
        É o <strong>significado emocional que você dá a ele.</strong></p>
        
        <h3>O que geralmente está por trás do "não"</h3>
        
        <p>Na maioria das vezes, o "não" não é sobre você.<br>
        É sobre:</p>
        
        <ul>
            <li>cansaço</li>
            <li>estresse</li>
            <li>dor no corpo</li>
            <li>mente lotada</li>
            <li>questões internas do outro</li>
            <li>fases de libido diferentes</li>
        </ul>
        
        <p>Mas quando o casal não conversa sobre isso,<br>
        o silêncio vira fantasia negativa.</p>
        
        <p>E a mente humana é ótima em criar roteiros de abandono.</p>
        
        <h3>Como responder a um "não" não se encolher por dentro</h3>
        
        <p>Você não precisa fingir que não doeu.<br>
        Mas também não precisa transformar isso em ataque.</p>
        
        <p>Respostas que preservam sua autoestima e o vínculo:</p>
        
        <p>✅ "Tudo bem. Quando você quiser, eu tô aqui."<br>
        ✅ "Obrigado(a) por ser honesto(a)."<br>
        ✅ "Tem algo que eu possa fazer por você agora?"</p>
        
        <p>Isso não é submissão.<br>
        É maturidade emocional.</p>
        
        <p>Você honra seu desejo sem transformar o outro em vilão.</p>
        
        <h3>O outro lado: como dizer "não" sem machucar</h3>
        
        <p>Se você é quem recusa com frequência,<br>
        precisa entender:<br>
        o jeito que você diz "não" importa tanto quanto o "não" em si.</p>
        
        <p>❌ "Agora não, para com isso."<br>
        ❌ "Você só pensa nisso."</p>
        
        <p>Isso não é limite saudável.<br>
        É desqualificação emocional.</p>
        
        <p>Formas mais humanas:</p>
        
        <p>✅ "Hoje eu tô muito cansado(a), mas amo quando a gente se conecta."<br>
        ✅ "Não é falta de vontade de você, é falta de energia hoje."</p>
        
        <p>O cuidado no "não" protege o desejo do outro de virar vergonha.</p>
        
        <h3>Rejeição repetida vira ferida emocional</h3>
        
        <p>Se o "não" vira regra e nunca é conversado,<br>
        a pessoa rejeitada começa a:</p>
        
        <ul>
            <li>parar de tentar</li>
            <li>se sentir indesejada</li>
            <li>buscar validação fora (emocional ou sexual)</li>
            <li>ou se fechar afetivamente</li>
        </ul>
        
        <p>Não é traição que começa do nada.<br>
        Muitas vezes começa com <strong>fome de ser desejado(a).</strong></p>
        
        <p>Isso não justifica erro,<br>
        mas explica o terreno emocional onde erros nascem.</p>
        
        <h3>O diálogo que quase ninguém faz (mas deveria)</h3>
        
        <p>Em um momento neutro, fora da cama, vale abrir:</p>
        
        <blockquote>"Queria falar sobre algo sem cobrança.<br>
        Às vezes fico inseguro(a) quando recebo muitos 'nãos'.<br>
        Não é te culpar, é pra gente entender como cuidar melhor disso
        juntos."</blockquote>
        
        <p>Esse tipo de conversa não acusa.<br>
        Ela convida à parceria emocional.</p>
        
        <h3>Exercício prático (ressignificando a rejeição)</h3>
        
        <p>Na próxima vez que ouvir um "não", observe:</p>
        
        <ul>
            <li>O que eu estou contendo para mim mesmo(a) sobre esse "não"?</li>
            <li>Estou tratando isso como um fato momentâneo ou como prova de algo
            sobre mim?</li>
        </ul>
        
        <p>Depois, se for possível, verbalize de forma madura:</p>
        
        <blockquote>"Às vezes eu fico inseguro(a) com isso. Não é cobrança, é só pra você
        entender como bate em mim."</blockquote>
        
        <p>Isso tira a rejeição do campo do ataque<br>
        e coloca no campo da construção de intimidade emocional.</p>
        
        <p>No próximo capítulo, a gente entra num ponto que muda o jogo de vez:<br>
        <strong>como reacender o desejo quando a relação já esfriou — mesmo depois
        de anos juntos.</strong><br>
        Sem promessas mágicas.<br>
        Só estratégia emocional real.</p>
      </div>
    `
  },
  {
    id: 14,
    type: "chapter",
    title: "Capítulo 11 — Quando a Chama Já Apagou: Como Reacender o Desejo Mesmo Depois de Anos Juntos",
    content: `
      <h2 class="chapter-title">Capítulo 11 — Quando a Chama Já Apagou: Como Reacender o Desejo Mesmo Depois de Anos Juntos</h2>
      <div class="chapter-content">
        <p>Vamos começar com uma verdade dura e libertadora:<br>
        se a chama apagou, isso não significa que o amor acabou.<br>
        Significa que o <strong>campo emocional do desejo foi abandonado.</strong></p>
        
        <p>Desejo não se sustenta só em boa intenção.<br>
        Ele precisa de <strong>nutrição emocional, tensão erótica e presença viva.</strong></p>
        
        <p>Casais não perdem o tesão "de repente".<br>
        Eles vão perdendo aos poucos —<br>
        na falta de toque,<br>
        na ausência de curiosidade,<br>
        no excesso de obrigação,<br>
        na repetição sem presença.</p>
        
        <h3>O grande erro: tentar reacender desejo com cobrança</h3>
        
        <p>Quando o desejo some, muita gente tenta reacender com pressão:</p>
        
        <p>❌ "A gente nunca mais transa."<br>
        ❌ "Você não me quer mais."<br>
        ❌ "Você virou outra pessoa."</p>
        
        <p>Isso não cria desejo.<br>
        Cria defesa, culpa e afastamento.</p>
        
        <p>Desejo não nasce em ambiente de cobrança.<br>
        Nasce em ambiente de <strong>segurança + novidade emocional.</strong></p>
        
        <h3>Desejo precisa de distância psicológica (não de afastamento)</h3>
        
        <p>Existe um paradoxo no desejo:</p>
        
        <ul>
            <li>intimidade demais sem mistério mata a tensão erótica</li>
            <li>distância demais mata a conexão</li>
        </ul>
        
        <p>O desejo vive nesse espaço do "te conheço, mas ainda me surpreendo com
        você".</p>
        
        <p>Quando o casal vira só:</p>
        
        <ul>
            <li>pai e mãe</li>
            <li>sócio de conta</li>
            <li>colega de rotina</li>
        </ul>
        
        <p>o erotismo morre por asfixia emocional.</p>
        
        <p>Não porque a pessoa deixou de ser atraente,<br>
        mas porque deixou de ser <strong>percebida como sujeito desejante.</strong></p>
        
        <h3>O reencontro com o "eu desejante"</h3>
        
        <p>Antes de querer ser desejado(a),<br>
        você precisa voltar a se sentir <strong>desejante por você mesmo(a).</strong></p>
        
        <p>Perguntas terapêuticas que mudam tudo:</p>
        
        <ul>
            <li>Quem eu virei depois que entrei nessa relação?</li>
            <li>Onde eu me apaguei?</li>
            <li>Em que momento eu parei de me sentir vivo(a), interessante, sensual?</li>
        </ul>
        
        <p>Muita gente espera que o outro reacenda algo<br>
        que ela mesma abandonou dentro de si.</p>
        
        <p>Desejo começa dentro.<br>
        Depois transborda para o encontro.</p>
        
        <h3>Microerotismo: o que reacende sem assustar</h3>
        
        <p>Esquece performance.<br>
        Esquece "tem que ser uma noite perfeita".</p>
        
        <p>O desejo volta em <strong>microdoses de erotismo:</strong></p>
        
        <ul>
            <li>um toque que não vira sexo</li>
            <li>um olhar mais demorado</li>
            <li>uma mensagem sugestiva no meio do dia</li>
            <li>um elogio menos automático</li>
            <li>uma aproximação sem cobrança de resultado</li>
        </ul>
        
        <p>Isso cria tensão boa.<br>
        Tensão boa é combustível do desejo.</p>
        
        <p>Sem isso, o convite para sexo vira pedido de tarefa.</p>
        
        <h3>Criando novidade sem precisar virar outra pessoa</h3>
        
        <p>Novidade não é só trocar posição na cama.<br>
        Novidade é mudar a <strong>energia do encontro.</strong></p>
        
        <p>Exemplos simples:</p>
        
        <ul>
            <li>mudar o ambiente</li>
            <li>sair do automático</li>
            <li>quebrar padrões previsíveis</li>
            <li>mudar quem inicia</li>
            <li>mudar o ritmo</li>
            <li>mudar o clima emocional</li>
        </ul>
        
        <p>O cérebro responde a diferença.<br>
        O desejo responde ao inesperado seguro.</p>
        
        <h3>O luto do que não volta (e o nascimento do que pode nascer)</h3>
        
        <p>Um erro comum é querer resgatar exatamente o sexo do começo da relação.<br>
        Isso quase nunca funciona.</p>
        
        <p>Vocês não são mais aquelas pessoas.<br>
        A relação não é mais aquela fase.</p>
        
        <p>O desejo que volta é <strong>novo</strong>.<br>
        Mais maduro.<br>
        Menos impulsivo.<br>
        Mais consciente.</p>
        
        <p>Aceitar isso evita frustração.<br>
        Você não está tentando reviver o passado.<br>
        Está construindo um erotismo adulto.</p>
        
        <h3>Conversa que reacende (não a que acusa)</h3>
        
        <p>Um diálogo potente para momentos neutros:</p>
        
        <blockquote>"Eu sinto falta da nossa conexão mais viva.<br>
        Não é cobrança.<br>
        É vontade de reencontrar um lugar bom entre a gente.<br>
        O que você sente que apagou em você ao longo do tempo?"</blockquote>
        
        <p>Essa pergunta muda o foco de:<br>
        "Você não me deseja"<br>
        para<br>
        "Como a gente se perdeu e pode se reencontrar?"</p>
        
        <h3>Exercício terapêutico (reativando o campo do desejo)</h3>
        
        <p>Durante os próximos 14 dias:</p>
        
        <ol>
            <li>Cada um escolhe <strong>uma microatitude erótica por dia</strong><br>
            (não precisa virar sexo)</li>
            <li>Sem cobrar resultado</li>
            <li>Observem como o clima muda</li>
            <li>No final, conversem:<br>
            > "O que fez a gente se sentir mais vivo perto um do outro?"</li>
        </ol>
        
        <p>O objetivo não é transar mais.<br>
        É <strong>recriar o campo emocional onde o desejo nasce.</strong></p>
        
        <h3>Fechamento de ouro do capítulo</h3>
        
        <p>Desejo não é algo que você arranca do outro.<br>
        É algo que você <strong>cultiva no espaço entre vocês.</strong></p>
        
        <p>Quando esse espaço vira seguro, curioso e vivo,<br>
        o corpo responde.</p>
        
        <p>Quando vira cobrança, obrigação e medo,<br>
        o corpo se fecha.</p>
        
        <p>No próximo capítulo, se você quiser, entro em um tema que fecha esse
        primeiro livro com chave de ouro:<br>
        <strong>Como reconstruir intimidade depois de traição, quebra de confiança ou
        feridas profundas.</strong><br>
        Tema pesado, mas transformador.</p>
      </div>
    `
  },
  {
    id: 15,
    type: "chapter",
    title: "Capítulo 12 — Quando a Confiança Quebra: Como Reconstruir Intimidade Depois da Dor",
    content: `
      <h2 class="chapter-title">Capítulo 12 — Quando a Confiança Quebra: Como Reconstruir Intimidade Depois da Dor</h2>
      <div class="chapter-content">
        <p>Nem toda relação acaba quando a confiança quebra.<br>
        Mas toda relação muda.</p>
        
        <p>Traição, mentiras, segredos, decepções profundas...<br>
        isso não destrói só a confiança no outro.<br>
        Mexe na sua <strong>segurança emocional no vínculo.</strong></p>
        
        <p>Depois da quebra, o corpo continua ali,<br>
        mas o coração fica em alerta.</p>
        
        <p>Desejo sem segurança vira ansiedade.<br>
        Intimidade sem confiança vira risco emocional.</p>
        
        <h3>O primeiro luto: aceitar que a relação antiga acabou</h3>
        
        <p>Um erro comum é tentar "voltar ao normal".<br>
        Não existe mais o normal de antes.</p>
        
        <p>Existe a chance de construir <strong>uma nova versão da relação.</strong></p>
        
        <p>Isso exige luto:</p>
        
        <ul>
            <li>luto da inocência</li>
            <li>luto da idealização</li>
            <li>luto da versão antiga do casal</li>
        </ul>
        
        <p>Sem esse luto, tudo vira cobrança para que o outro seja quem ele já não
        é mais.</p>
        
        <p>Reconstrução começa com a aceitação do fim de uma fase.</p>
        
        <h3>Confiança não volta com promessa. Volta com consistência.</h3>
        
        <p>"Eu prometo que nunca mais vai acontecer"<br>
        soa bonito.<br>
        Mas confiança não se reconstrói com discurso.</p>
        
        <p>Se reconstrói com:</p>
        
        <ul>
            <li>previsibilidade</li>
            <li>atitudes repetidas</li>
            <li>transparência</li>
            <li>paciência com o medo do outro</li>
        </ul>
        
        <p>Quem quebrou a confiança precisa entender:<br>
        o outro vai desconfiar por um tempo.<br>
        Isso não é punição.<br>
        É processo de cura.</p>
        
        <h3>O direito de sentir sem ser invalidado</h3>
        
        <p>A pessoa ferida precisa de espaço para sentir:</p>
        
        <ul>
            <li>raiva</li>
            <li>tristeza</li>
            <li>medo</li>
            <li>confusão</li>
        </ul>
        
        <p>O erro de quem feriu é apressar o perdão:</p>
        
        <p>❌ "Você ainda não superou isso?"<br>
        ❌ "Já pedi desculpa, vai ficar nisso pra sempre?"</p>
        
        <p>Perdão não é botão.<br>
        É construção interna.</p>
        
        <p>Quem foi ferido não precisa escolher entre perdoar rápido ou ir embora.<br>
        Ele pode perdoar <strong>no tempo do próprio sistema emocional.</strong></p>
        
        <h3>Intimidade depois da ferida: começa fora da cama</h3>
        
        <p>Depois de uma quebra de confiança,<br>
        tentar "voltar a transar normal" sem reconstruir segurança emocional<br>
        só aumenta o distanciamento.</p>
        
        <p>O corpo precisa sentir:</p>
        
        <ul>
            <li>previsibilidade</li>
            <li>cuidado</li>
            <li>coerência</li>
        </ul>
        
        <p>Intimidade recomeça em:</p>
        
        <ul>
            <li>conversa honesta</li>
            <li>presença</li>
            <li>cuidado emocional</li>
            <li>pequenos gestos confiáveis</li>
        </ul>
        
        <p>Sexo volta quando o corpo deixa de sentir ameaça.</p>
        
        <h3>A diferença entre reconstruir e se humilhar para manter</h3>
        
        <p>Reconstruir é:</p>
        
        <ul>
            <li>assumir responsabilidade</li>
            <li>mudar padrões</li>
            <li>sustentar desconforto</li>
            <li>aceitar limites</li>
        </ul>
        
        <p>Se humilhar é:</p>
        
        <ul>
            <li>implorar migalha</li>
            <li>aceitar falta de respeito</li>
            <li>viver em alerta permanente</li>
            <li>se diminuir para não perder o outro</li>
        </ul>
        
        <p>Reconstrução preserva dignidade.<br>
        Humilhação destrói identidade.</p>
        
        <h3>Quando vale insistir?</h3>
        
        <p>Vale insistir quando existe:</p>
        
        <ul>
            <li>responsabilidade real de quem feriu</li>
            <li>disposição de conversar sem fugir</li>
            <li>mudança de comportamento observável</li>
            <li>abertura para reconstrução mútua</li>
        </ul>
        
        <p>Não vale insistir quando só existe:</p>
        
        <ul>
            <li>discurso sem atitude</li>
            <li>repetição do padrão</li>
            <li>inversão de culpa</li>
            <li>desrespeito emocional contínuo</li>
        </ul>
        
        <p>Relacionamento saudável não é ausência de erro.<br>
        É presença de reparo.</p>
        
        <h3>Exercício terapêutico (recomeço possível)</h3>
        
        <p>Se vocês estão tentando reconstruir:</p>
        
        <ol>
            <li>Façam um acordo de transparência possível</li>
            <li>Criem momentos semanais de conversa sem ataque</li>
            <li>Estabeleçam limites claros</li>
            <li>Observem atitudes, não promessas</li>
            <li>Respeitem o tempo emocional de quem foi ferido</li>
        </ol>
        
        <p>Reconstrução não é rápida.<br>
        Mas quando é real, é profunda.</p>
        
        <h3>Finalizando</h3>
        
        <p>Desejo, sexo e intimidade não morrem por acaso.<br>
        Eles respondem ao <strong>ambiente emocional do vínculo.</strong></p>
        
        <p>Quando existe:</p>
        
        <ul>
            <li>segurança</li>
            <li>escuta</li>
            <li>presença</li>
            <li>respeito</li>
        </ul>
        
        <p>o desejo encontra espaço para existir.</p>
        
        <p>Quando existe:</p>
        
        <ul>
            <li>medo</li>
            <li>cobrança</li>
            <li>silêncio</li>
            <li>ferida sem cuidado</li>
        </ul>
        
        <p>o desejo se fecha.</p>
        
        <p>Você não controla o outro.<br>
        Mas você influencia o campo entre vocês.</p>
        
        <p>E é nesse campo que o erotismo adulto vive.</p>
        
        <h3>Mensagem Final do Autor ao Leitor</h3>
        
        <p>Se você chegou até aqui, provavelmente alguma parte da sua história
        passou por estas páginas.</p>
        
        <p>Talvez você tenha se reconhecido na dor de não se sentir desejado(a).<br>
        Talvez tenha lembrado de conversas que nunca aconteceram.<br>
        Ou talvez tenha percebido que o desejo não sumiu — ele só ficou sem
        espaço para existir.</p>
        
        <p>Quero te dizer algo importante:<br>
        Não existe nada de errado com você por sentir falta de conexão,
        intimidade e presença no seu relacionamento.<br>
        Isso é humano.</p>
        
        <p>Os relacionamentos não esfriam porque as pessoas são fracas.<br>
        Eles esfriam porque ninguém ensinou a cuidar do campo emocional onde o
        desejo vive.</p>
        
        <p>Se este livro te ajudou a enxergar algo novo,<br>
        então ele já cumpriu seu papel.</p>
        
        <p>Mas a jornada não termina aqui.</p>
        
        <p>O desejo é só uma parte da história.<br>
        Por trás dele existem padrões de escolha, inseguranças, medos de perder,
        carência emocional e, muitas vezes, a tendência de se anular para não
        ficar sozinho(a).</p>
        
        <p>É por isso que esta obra faz parte de uma série.<br>
        Cada próximo livro aprofunda uma camada do que nos faz amar do jeito que
        amamos —<br>
        e, muitas vezes, sofrer do jeito que sofremos.</p>
        
        <p>Se você continuar,<br>
        não é para se tornar "perfeito(a)" nos relacionamentos.<br>
        É para se tornar mais consciente, mais inteiro(a) e mais livre
        emocionalmente.</p>
        
        <p>Obrigado por confiar em mim até aqui.<br>
        Cuidar da sua intimidade é um ato de coragem.</p>
        
        <p>Com respeito pela sua história,<br>
        <strong>Rafael Monteiro</strong><br>
        Terapeuta de Relacionamentos e Sexualidade</p>
      </div>
    `
  },
  {
    id: 16,
    type: "back-cover",
    title: "Contracapa",
    content: `
      <div class="back-cover-page">
        <h3>O Desejo Não Morre — Ele É Mal Cuidado</h3>
        <p>Este livro não é sobre técnicas sexuais.<br>É um guia direto, humano e terapêutico sobre como o desejo funciona dentro de relacionamentos reais — com rotina, cansaço, insegurança, rejeição e feridas emocionais.</p>
        <p>Se você sente que:</p>
        <ul>
            <li>o sexo esfriou</li>
            <li>a conexão diminuiu</li>
            <li>as conversas viraram brigas</li>
            <li>ou o relacionamento entrou no modo automático</li>
        </ul>
        <p>Este livro vai te ajudar a entender o que realmente está acontecendo no campo emocional entre vocês — e como reativar a intimidade sem culpa, sem pressão e sem fórmulas mágicas.</p>
        <div class="book-series">
            <h3>Outros livros do autor (continuação da jornada):</h3>
            <ul>
                <li><strong>Livro 2</strong> — Por Que Você Se Atrai Sempre Pelo Mesmo Tipo de Pessoa<br>Padrões inconscientes, carência emocional e escolhas afetivas repetidas.</li>
                <li><strong>Livro 3</strong> — Ciúme, Insegurança e Medo de Perder<br>Como reconstruir segurança emocional sem controle nem dependência.</li>
                <li><strong>Livro 4</strong> — Quando o Amor Vira Dependência<br>A linha invisível entre amar e se anular no relacionamento.</li>
                <li><strong>Livro 5</strong> — Relacionamentos Conscientes: Como Amar Sem Se Perder<br>Construindo vínculos maduros, com desejo, autonomia e respeito emocional.</li>
            </ul>
        </div>
      </div>
    `
  }
]