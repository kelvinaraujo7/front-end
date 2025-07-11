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
  Users2,
  MessageSquareText,
} from "lucide-react";

const acoesCards = [
  {
    text: "Iniciar atendimento",
    icon: MessagesSquare,
    cardClasses: "bg-green-200   dark:hover:bg-slate-800  hover:bg-green-300 dark:bg-slate-950 dark:border dark:border-white/10 dark:shadow-sm dark:shadow-card-foreground  ",
    iconClasses: "text-green-600 dark:bg-slate-900 ",
    textClasses: "  text-green-700 text-green-800",
  },
  {
    text: "Chamar novamente",
    icon: PhoneCall,
    cardClasses: "bg-yellow-100 hover:bg-yellow-200  dark:hover:bg-slate-800   dark:hover:bg-slate-800  hover:bg-green-300 dark:bg-slate-950 dark:border dark:border-white/10 dark:shadow-sm dark:shadow-card-foreground ",
    iconClasses: "text-yellow-600 dark:bg-slate-900 ",
    textClasses: "text-yellow-800",
  },
  {
    text: "Não compareceu",
    icon: User,
    cardClasses: "bg-red-200 hover:bg-red-300  dark:hover:bg-slate-800  dark:hover:bg-slate-800  hover:bg-green-300 dark:bg-slate-950 dark:border dark:border-white/10 dark:shadow-sm dark:shadow-card-foreground",
    iconClasses: "text-red-600 dark:bg-slate-900 ",
    textClasses: "text-red-800",
  },
  {
    text: "Encerrar o atendimento",
    icon: CheckCircle,
    cardClasses: "bg-blue-200 hover:bg-blue-300 dark:bg-slate-950 dark:hover:bg-slate-800  dark:hover:bg-slate-800  hover:bg-green-300 dark:bg-slate-950 dark:border dark:border-white/10 dark:shadow-sm dark:shadow-card-foreground ",
    iconClasses: "text-blue-600 dark:bg-slate-900 ",
    textClasses: "text-blue-800",
  },
  {
    text: "Encerrar e redirecionar",
    icon: ArrowRight,
    cardClasses: "bg-violet-200 hover:bg-violet-300 dark:bg-slate-950 dark:hover:bg-slate-800  dark:hover:bg-slate-800  hover:bg-green-300 dark:bg-slate-950 dark:border dark:border-white/10 dark:shadow-sm dark:shadow-card-foreground ",
    iconClasses: "text-violet-600 dark:bg-slate-900 ",
    textClasses: "text-violet-800",
  },
];

const Services = () => {
  return (
    <div className="flex flex-col gap-6 w-full">

      {/* Atendimento + Ações */}
      <div className="flex w-350 gap-4 items-stretch flex-wrap md:flex-nowrap ">
        
        {/* Atendimento */}
        <Card className="flex-1 p-4 bg-slate-100  dark:bg-slate-950 dark:border dark:border-white/10 dark:shadow-lg dark:shadow-card-foreground
                0 rounded-xl min-w-[280px] h-100">
          <CardHeader>
            <CardTitle className="font-semibold text-2xl dark:text-white " >Atendimento</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button
              variant="outline"
              className="w-56 h-56 flex flex-col items-center justify-center hover:bg-blue-200 gap-2 shadow-md  dark:bg-slate-950
                 dark:hover:bg-slate-800  hover:bg-green-300 dark:bg-slate-950 dark:border dark:border-white/10 dark:shadow-sm dark:shadow-card-foreground "
            >
                <div className="relative w-full flex-1 flex items-center justify-center">
              <MessagesSquare className="absolute w-16 h-16 text-blue-400 z-0 mb-10 size-10" /> 

             
              <User className="absolute size-12  left-7 text-blue-400 z-10 -translate-x-4 mt-7 translate-y-2" />
              <User className="absolute size-12  right-7 text-blue-700 z-20 translate-x-4 mt-7 translate-y-2" />
            </div>
              <span className=" font-medium mt-2 text-blue-700  ">
                Chamar Próximo
              </span>
            </Button>
          </CardContent>
        </Card>

        {/* Ações */}
        <Card className="flex-[2] p-6 bg-slate-100 dark:bg-slate-950 dark:border dark:border-white/10 dark:shadow-lg dark:shadow-card-foreground rounded-xl 
         w-120 h-100 items-center  ">
          <CardHeader>
            <CardTitle>Ações:</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-4  w-160 h-70 ">
            {acoesCards.map(({ text, icon: Icon, cardClasses, iconClasses, textClasses }) => (
              <div
                key={text}
                className={`${cardClasses} p-4 rounded-xl flex flex-col items-center shadow-md transition`}
              >
                <Icon className={`${iconClasses} bg-white rounded-full p-1 w-10 h-10 mb-2`} />
                <span className={`${textClasses} font-medium text-center`}>
                  {text}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Minha Fila */}
      <Card className="bg-slate-100 dark:bg-slate-950 rounded-md shadow-xl mt-20 w-350 h-90 p-6 dark:bg-slate-950 dark:border dark:border-white/10 dark:shadow-lg dark:shadow-card-foreground rounded-xl    ">
        <CardHeader>
          <CardTitle className="font-semibold text-2xl dark:text-white">
            Minha fila
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex flex-wrap gap-4 justify-start pt-4   ">
          {[1, 2].map((_, index) => (
            <div
              key={index}
              className="  dark:bg-slate-950 dark:hover:bg-slate-800   flex items-center gap-3 hover:bg-blue-300 bg-blue-400 bg-opacity-80 rounded-xl px-5 py-4 w-72 shadow transition
               rounded-xl ring-1 ring-slate-100/30 
              hover:ring-blue-400/50 shadow-lg shadow-blue-500/10  transition
               dark:hover:bg-slate-800  hover:bg-green-300 dark:bg-slate-950 dark:border dark:border-white/10 dark:shadow-sm dark:shadow-card-foreground"
            >
              <User className="w-6 h-6 text-orange-300" />
              <div className="flex flex-col  ">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-white">4</span>
                  <span className="text-sm font-semibold text-white">
                    {index === 0
                      ? "Atendimento preferencial"
                      : "Atendimento Normal"}
                  </span>
                </div>
                <span className="text-sm opacity-90 text-white">Renovação</span>
              </div>
            </div>
          ))}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Services;
