'use client'

import { useState } from 'react'

interface FaqItem {
  question: string
  answer: string
  icon: string
}

const faqData: FaqItem[] = [
  {
    icon: '🔐',
    question: 'Como acesso meus livros após a compra?',
    answer: 'Após a confirmação do pagamento, você receberá um email com instruções para criar sua senha. Depois, basta fazer login no portal e acessar seus livros no dashboard.'
  },
  {
    icon: '💳',
    question: 'Quais formas de pagamento são aceitas?',
    answer: 'Aceitamos cartões de crédito, débito, boleto bancário e PIX. O processamento é feito pelo Mercado Pago, garantindo total segurança na sua transação.'
  },
  {
    icon: '📱',
    question: 'Posso acessar os livros pelo celular?',
    answer: 'Sim! Nosso portal é totalmente responsivo e funciona perfeitamente em smartphones, tablets e computadores. Você pode ler onde e quando quiser.'
  },
  {
    icon: '💡',
    question: 'Preciso criar senha no primeiro acesso?',
    answer: 'Sim. Após a compra, você receberá um email para criar sua senha. No primeiro acesso, basta clicar em "Primeiro acesso" e seguir as instruções.'
  },
  {
    icon: '🔄',
    question: 'Como funciona o pacote completo?',
    answer: 'O pacote completo dá acesso a todos os 4 livros da série com um super desconto. Após a compra, todos os livros são liberados automaticamente no seu dashboard.'
  },
  {
    icon: '❓',
    question: 'E se eu tiver problemas com o acesso?',
    answer: 'Entre em contato pelo nosso WhatsApp ou email. Nossa equipe está pronta para ajudar com qualquer dúvida ou problema técnico.'
  }
]

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="faq-section">
      <div className="container">
        <h2>❓ Perguntas Frequentes</h2>
        <p className="section-description">
          Tire suas dúvidas sobre o portal, compras e acesso aos livros
        </p>

        <div className="faq-grid">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleFaq(index)}
            >
              <div className="faq-question">
                <span className="icon">{item.icon}</span>
                <h3>{item.question}</h3>
              </div>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}