import Link from 'next/link'

export default function ObrigadoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 text-center">
        <div className="text-6xl mb-4">📚</div>
        <h1 className="text-3xl font-bold mb-4">Obrigado!</h1>
        <p className="text-gray-600 mb-6">
          Seu cadastro foi realizado com sucesso!
        </p>
        <p className="text-gray-600 mb-8">
          Após a confirmação do pagamento, você receberá um email para criar sua senha e acessar o portal.
        </p>
        <Link 
          href="/" 
          className="btn-primary inline-block"
        >
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  )
}