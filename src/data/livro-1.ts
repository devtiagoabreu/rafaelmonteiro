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
  }
  // ADICIONE AQUI OS CAPÍTULOS 5 ATÉ 16 DO SEU HTML ORIGINAL
  // Copie exatamente o conteúdo dos capítulos 2 a 12 e contracapa
]