import { Chapter } from '@/types'

export const bookInfo = {
  title: "O Desejo Não Morre — Ele É Mal Cuidado",
  subtitle: "Um guia direto, humano e terapêutico para reconstruir a intimidade no relacionamento",
  author: "Rafael Monteiro",
  authorTitle: "Terapeuta de Relacionamentos e Sexualidade"
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
  // ... Continue com os demais capítulos (copie do seu HTML)
]

// Adicione todos os capítulos do seu HTML aqui