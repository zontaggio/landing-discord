"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronRight, Users, Sparkles } from "lucide-react"

interface QuizAnswers {
  objetivo: string
  experiencia: string
  produto: string
}

export default function ImportingQuiz() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({
    objetivo: "",
    experiencia: "",
    produto: "",
  })
  const [showResult, setShowResult] = useState(false)

  const questions = [
    {
      id: "objetivo",
      title: "Qual é o seu objetivo ao entrar na comunidade?",
      options: [
        "Comprar artigos de luxo pagando menos",
        "Criar renda extra revendendo produtos importados",
        "Ter contato e tirar dúvidas com pessoas que já importam",
        "Comprar produtos que não encontro no Brasil",
      ],
    },
    {
      id: "experiencia",
      title: "Você já usou o CssBuy ou outro agente de compras?",
      options: ["Já uso o CssBuy", "Já usei outro agente", "Nunca usei agente de compras para comprar na China"],
    },
    {
      id: "produto",
      title: "Qual tipo de produto você mais gostaria de importar?",
      options: ["Roupas", "Calçados", "Bolsas", "Acessórios de luxo", "Eletrônicos", "Outros"],
    },
  ]

  const handleAnswerChange = (value: string) => {
    const questionId = questions[currentStep].id as keyof QuizAnswers
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowResult(true)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentQuestion = questions[currentStep]
  const currentAnswer = answers[currentQuestion.id as keyof QuizAnswers]
  const isLastStep = currentStep === questions.length - 1

  if (showResult) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto animate-scale-in">
          <Card className="border border-border/50 shadow-2xl bg-card/80 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer opacity-30"></div>
            <CardHeader className="text-center pb-6 relative z-10">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-fade-in">
                <Sparkles className="w-10 h-10 text-primary animate-pulse" />
              </div>
              <CardTitle className="text-2xl font-semibold text-foreground mb-2">
                Obrigado pelas suas respostas!
              </CardTitle>
              <CardDescription className="text-muted-foreground text-base leading-relaxed">
                Agora você pode se juntar à nossa comunidade exclusiva de importadores
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0 relative z-10">
              <Button
                className="w-full h-14 text-base font-medium bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg shadow-primary/20 group"
                onClick={() => window.open("https://discord.gg/your-invite-link", "_blank")}
              >
                <Users className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                Entrar no Discord
                <ChevronRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto animate-slide-in-up">
        <div className="mb-8 animate-fade-in">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-muted-foreground font-medium">
              Pergunta {currentStep + 1} de {questions.length}
            </span>
            <span className="text-sm text-primary font-semibold">
              {Math.round(((currentStep + 1) / questions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-700 ease-out shadow-sm"
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <Card className="border border-border/50 shadow-2xl bg-card/80 backdrop-blur-xl relative overflow-hidden animate-scale-in">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50"></div>
          <CardHeader className="pb-6 relative z-10">
            <CardTitle className="text-xl font-semibold text-foreground leading-tight">
              {currentQuestion.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 relative z-10">
            <RadioGroup value={currentAnswer} onValueChange={handleAnswerChange}>
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 rounded-xl hover:bg-muted/30 transition-all duration-300 hover:scale-[1.01] cursor-pointer group border border-transparent hover:border-border/30"
                >
                  <RadioGroupItem
                    value={option}
                    id={`option-${index}`}
                    className="border-2 border-border data-[state=checked]:border-primary data-[state=checked]:bg-primary transition-all duration-200 group-hover:scale-110"
                  />
                  <Label
                    htmlFor={`option-${index}`}
                    className="text-sm text-foreground leading-relaxed cursor-pointer flex-1 group-hover:text-primary transition-colors duration-200"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex gap-4 pt-8">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  className="flex-1 h-12 rounded-xl border-border/50 hover:bg-muted/30 transition-all duration-300 hover:scale-[1.02] bg-transparent backdrop-blur-sm"
                >
                  Anterior
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={!currentAnswer}
                className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-primary/20 group"
              >
                {isLastStep ? "Finalizar" : "Próxima"}
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
