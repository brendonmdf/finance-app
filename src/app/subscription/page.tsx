'use client';

import Navigation from '@/components/Navigation';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
  icon: React.ReactNode;
}

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Plano Gratuito',
    price: 0,
    description: 'Ideal para começar a organizar suas finanças',
    features: [
      'Até 50 transações por mês',
      'Categorização básica',
      'Relatórios simples',
      'Suporte por email'
    ],
    icon: <Zap className="w-8 h-8 text-primary-500" />
  },
  {
    id: 'pro',
    name: 'Plano Pro',
    price: 19,
    description: 'Recursos avançados para controle total',
    features: [
      'Transações ilimitadas',
      'Categorização avançada',
      'Relatórios detalhados',
      'Análise de IA',
      'Suporte prioritário',
      'Backup automático',
      'Múltiplas contas',
      'Exportação de dados'
    ],
    popular: true,
    icon: <Star className="w-8 h-8 text-warning" />
  },
  {
    id: 'enterprise',
    name: 'Plano Enterprise',
    price: 49,
    description: 'Solução completa para empresas',
    features: [
      'Tudo do plano Pro',
      'Múltiplos usuários',
      'Integração com sistemas',
      'API personalizada',
      'Suporte 24/7',
      'Treinamento da equipe',
      'Relatórios customizados',
      'Compliance e segurança'
    ],
    icon: <Crown className="w-8 h-8 text-primary-400" />
  }
];

export default function SubscriptionPage() {
  const handleSubscribe = (planId: string) => {
    // Aqui você implementaria a lógica de assinatura
    console.log(`Assinando plano: ${planId}`);
  };

  return (
    <div className="min-h-screen bg-dark-950">
      <Navigation activePage="subscription" />
      
      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Escolha seu Plano</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Escolha o plano que melhor se adapta às suas necessidades de gestão financeira
            </p>
          </div>

          {/* Planos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative ${
                  plan.popular 
                    ? 'ring-2 ring-primary-500 bg-gradient-to-br from-dark-800 to-dark-700 border-primary-500' 
                    : 'bg-dark-800 border-dark-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Mais Popular
                    </span>
                  </div>
                )}

                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <div className="flex justify-center mb-4">
                      {plan.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-400 mb-4">{plan.description}</p>
                    
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-white">
                        R$ {plan.price}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-gray-400">/mês</span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-primary-500 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleSubscribe(plan.id)}
                    className={`w-full ${
                      plan.popular
                        ? 'bg-primary-500 hover:bg-primary-600 text-white'
                        : 'bg-dark-700 hover:bg-dark-600 text-white'
                    }`}
                  >
                    {plan.price === 0 ? 'Começar Grátis' : 'Assinar Plano'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Perguntas Frequentes
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-dark-800 border-dark-700">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Posso cancelar a qualquer momento?
                  </h3>
                  <p className="text-gray-300">
                    Sim! Você pode cancelar sua assinatura a qualquer momento sem taxas adicionais.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-dark-800 border-dark-700">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Há período de teste gratuito?
                  </h3>
                  <p className="text-gray-300">
                    Oferecemos 7 dias de teste gratuito para todos os planos pagos.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-dark-800 border-dark-700">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Meus dados estão seguros?
                  </h3>
                  <p className="text-gray-300">
                    Absolutamente! Utilizamos criptografia de ponta a ponta para proteger seus dados.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-dark-800 border-dark-700">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Posso mudar de plano?
                  </h3>
                  <p className="text-gray-300">
                    Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Card className="max-w-2xl mx-auto bg-dark-800 border-dark-700">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Pronto para começar?
                </h3>
                <p className="text-gray-400 mb-6">
                  Junte-se a milhares de usuários que já transformaram suas finanças com o Finance.ai
                </p>
                <Button
                  onClick={() => handleSubscribe('pro')}
                  className="bg-primary-500 hover:bg-primary-600 text-white text-lg px-8 py-3 h-auto"
                >
                  Começar Agora
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
