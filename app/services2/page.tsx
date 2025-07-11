"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  User,
  MessagesSquare,
  PhoneCall,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const acoesCards = [
  {
    text: "Iniciar atendimento",
    icon: MessagesSquare,
    cardClasses: "bg-green-200 hover:bg-green-300 dark:hover:bg-slate-800  dark:bg-slate-950 dark:border dark:border-white/10 dark:shadow-sm dark:shadow-card-foreground",
    iconClasses: "text-green-600",
    textClasses: "text-green-800",
  },
  {
    text: "Chamar novamente",
    icon: PhoneCall,
    cardClasses: "bg-yellow-100 hover:bg-yellow-200  dark:hover:bg-slate-800  dark:bg-slate-950 dark:border dark:border-white/10 dark:shadow-sm dark:shadow-card-foreground",
    iconClasses: "text-yellow-600",
    textClasses: "text-yellow-800",
  },
  {
    text: "Não compareceu",
    icon: User,
    cardClasses: "bg-red-200 hover:bg-red-300  dark:hover:bg-slate-800  dark:bg-slate-950 dark:border dark:border-white/10 dark:shadow-sm dark:shadow-card-foreground",
    iconClasses: "text-red-600",
    textClasses: "text-red-800",
  },
  {
    text: "Encerrar o atendimento",
    icon: CheckCircle,
    cardClasses: "bg-blue-200 hover:bg-blue-300  dark:hover:bg-slate-800  dark:bg-slate-950 dark:border dark:border-white/10 dark:shadow-sm dark:shadow-card-foreground",
    iconClasses: "text-blue-600",
    textClasses: "text-blue-800",
  },
  {
    text: "Encerrar e redirecionar",
    icon: ArrowRight,
    cardClasses: "bg-violet-200 hover:bg-violet-300  dark:bg-slate-950 dark:border dark:border-white/10 dark:shadow-sm dark:shadow-card-foreground dark:hover:bg-slate-800",
    iconClasses: "text-violet-600",
    textClasses: "text-violet-800",
  },
];

const Services = () => {
  return (
    <div className="w-full px-6 md:px-12 max-w-[1280px] mx-auto flex flex-col gap-10">
      {/* Atendimento + Ações */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Atendimento */}
        <Card className="flex-1 max-w-md bg-slate-100 dark:bg-slate-950 dark:border dark:border-white/10 dark:shadow-lg dark:shadow-card-foreground rounded-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold dark:text-white">Atendimento</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button
              variant="outline"
              className="w-72 h-72 flex flex-col items-center justify-center gap-4 dark:bg-slate-950 dark:border dark:border-white/10 dark:shadow-lg dark:shadow-card-foreground rounded-lg"
            >
              <div className="relative w-full flex-1 flex items-center justify-center">
                <MessagesSquare className="absolute size-14 text-blue-400 z-0 mb-16" />
                <User className="absolute size-14 left-6 text-blue-400 z-10 -translate-x-3 mt-12" />
                <User className="absolute size-14 right-6 text-blue-700 z-20 translate-x-3 mt-12" />
              </div>
              <span className="text-blue-700 font-medium mt-3 text-lg">Chamar Próximo</span>
            </Button>
          </CardContent>
        </Card>

        {/* Ações */}
        <Card className="flex-1 max-w-4xl bg-slate-100 dark:bg-slate-950 dark:border dark:border-white/10 dark:shadow-lg dark:shadow-card-foreground rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold dark:text-white">Ações</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-6 justify-start ">
            {acoesCards.map(({ text, icon: Icon, cardClasses, iconClasses, textClasses }) => (
              <div
                key={text}
                className={`${cardClasses} p-6 rounded-xl flex flex-col items-center text-center shadow-md transition min-w-[130px] whitespace-nowrap`}
              >
                <Icon className={`${iconClasses} bg-white rounded-full p-2 w-14 h-14 mb-3`} />
                <span className={`${textClasses} font-semibold text-base leading-snug`}>
                  {text}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Minha Fila */}
      <Card className="bg-slate-100 dark:bg-slate-950 dark:border dark:border-white/10 dark:shadow-lg dark:shadow-card-foreground rounded-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold dark:text-white">Minha fila</CardTitle>
        </CardHeader>
        <CardFooter className="flex flex-wrap gap-8 pt-6 justify-center">
          {[1, 2].map((_, index) => (
            <div
              key={index}
              className="bg-blue-400 hover:bg-blue-500 text-white dark:bg-slate-900 dark:hover:bg-slate-800 rounded-xl px-10 py-6 w-full sm:w-90  dark:bg-slate-950 dark:border dark:border-white/10 dark:shadow-sm dark:shadow-card-foreground"
            >
              <div className="flex gap-5">
                <User className="w-7 h-7 text-orange-300" />
                <div className="flex flex-col">
                  <div className="flex gap-4">
                    <span className="text-xl font-bold">4</span>
                    <span className="text-base font-semibold">
                      {index === 0 ? "Atendimento preferencial" : "Atendimento Normal"}
                    </span>
                  </div>
                  <span className="text-base opacity-90">Renovação</span>
                </div>
              </div>
            </div>
          ))}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Services;
