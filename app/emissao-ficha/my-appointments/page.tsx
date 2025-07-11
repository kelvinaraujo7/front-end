"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { CircleDot, XCircle, Clock } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

function MyDatePicker() {
  const [selected, setSelected] = React.useState<Date | undefined>();

  const modifiers = {
    scheduled: new Date(2025, 6, 13),
    cancelled: new Date(2025, 6, 17),
    passed: { before: new Date() },
    today: new Date(),
  };

  

  const modifiersClassNames = {
    scheduled: "bg-green-500 text-white",
    cancelled: "bg-red-500 text-white",
    passed: "bg-gray-500 text-white",
    selected: " bg-yellow-400  font-bold rounded-full",
    today: " text-yellow-400 font-bold "

  };

  return (
    <div className="bg-[#3c4349] dark:bg-black rounded-2xl p-4 w-full mx-auto shadow-md dark:border dark:border-white/10 dark:bg-slate-950 dark:border dark:border-white/10 dark:shadow-md dark:shadow-card-foreground">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
        className="text-white [&_.rdp-caption]:text-white [&_.rdp-head_abbr]:text-white  [&_.rdp-nav_button]:text-white [&_.rdp-nav_button_svg]:stroke-[#fcd32a] [&_.rdp-nav_button_svg]:stroke-[2]"
      />
      <p className="mt-3 text-sm text-center text-white">
        {selected
          ? `Data selecionada: ${selected.toLocaleDateString("pt-BR")}`
          : "Escolha um dia disponível:"}
      </p>
    </div>
  );
}

const Myappointments = () => {
  const router = useRouter();

  const agendamentos = [
    {
      dia: 13,
      data: "13/07/2025",
      horaInicio: "08:00",
      horaFim: "09:30",
      departamento: "Atendimento",
      assunto: "Atualização cadastral",
      cor: "text-green-500",
      situacao: "Aguardando na fila"
    },
    {
      dia: 17,
      data: "17/07/2025",
      horaInicio: "10:00",
      horaFim: "11:20",
      departamento: "Atendimento",
      assunto: "Consulta de profissionais inscritos",
      cor: "text-red-500",
      situacao: "Não compareceu"
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#eeeeee] dark:bg-slate-950 text-white px-4 py-6 md:px-10 lg:px-20 ">
      <div className="w-full max-w-screen-2xl mx-auto">
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
          <CardTitle className="text-3xl font-bold text-[#2d485a] dark:text-white">
            Meus agendamentos
          </CardTitle>
          <Button
            className="bg-[#597183] text-white hover:bg-[#6b8ca1] font-semibold py-2 px-4 rounded-md dark:bg-white dark:text-black dark:hover:bg-slate-800 dark:hover:text-white"
            onClick={() => router.push("../emissao-ficha")}
          >
            Realizar agendamento
          </Button>
        </div>

        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>

        {/* Card de fundo com calendário e lista */}
        <Card className="bg-[#f5f5f5] rounded-3xl  p-6 sm:p-10 dark:bg-slate-950 dark:border dark:border-white/10 dark:shadow-lg dark:shadow-card-foreground">
          <div className="flex flex-col xl:flex-row gap-8">
            
            {/* Calendário */}
            <div className="w-full max-w-full sm:max-w-[420px] xl:max-w-[420px] md:max-w-[100%] mx-auto items-center gap-6">
              <MyDatePicker />
              <div className="text-[#2e404e] text-sm w-full dark:text-white">
                <h4 className="text-lg font-semibold mb-2">Sumário de cores:</h4>
                <div className="flex items-center gap-2 text-lg">
                  <CircleDot className="text-green-500" size={16} />
                  <span>Agendado</span>
                </div>
                <div className="flex items-center gap-2 text-lg">
                  <XCircle className="text-red-500" size={16} />
                  <span>Cancelado</span>
                </div>
                <div className="flex items-center gap-2 text-lg">
                  <Clock className="text-gray-500" size={16} />
                  <span>Passado</span>
                </div>
              </div>
            </div>

            {/* Lista de agendamentos  */}
            <div className="w-full lg:w-2/3">
              <div className="bg-[#d7d7d7]  rounded-xl p-6 dark:bg-slate-950 dark:border dark:border-white/10 dark:shadow-lg dark:shadow-card-foreground">
                <h3 className="text-2xl font-semibold mb-4 text-[#2e404e] dark:text-white">
                  Lista de agendamentos:
                </h3>

                <div className="space-y-4 ">
                  {agendamentos.map((item, i) => (
                    <div
                      key={i}
                      className="bg-[#3c4349] dark:bg-slate-900 p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow "
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 ">
                        <div className={`text-4xl font-bold w-12 text-center  ${item.cor}`}>
                          {item.dia}
                        </div>
                        <div className="text-white/90 text-base md:text-lg ">
                          <p><strong>Estado:</strong> Rio Grande do Norte</p>
                          <p><strong>Unidade:</strong> Natal</p>
                          <p><strong>Departamento:</strong> {item.departamento}</p>
                        </div>
                      </div>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="bg-[#597183] hover:bg-[#6b8ca1] hover:text-white text-white font-semibold px-3 py-2 rounded-md dark:bg-white dark:text-black dark:hover:bg-slate-800 dark:hover:text-white"
                          >
                            Ver mais informações
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="dark:bg-slate-950 dark:border dark:border-white/10 dark:shadow-lg dark:shadow-card-foreground bg-[#d7d7d7]">
                          <DialogHeader>
                            <DialogTitle className="text-bold">Detalhes do Agendamento</DialogTitle>
                            <DialogDescription className="text-md text-muted-foreground mt-4 space-y-2 text-bold">
                              <p><strong>Data:</strong> {item.data}</p>
                              <p><strong>Hora Inicial:</strong> {item.horaInicio}</p>
                              <p><strong>Hora Final:</strong> {item.horaFim}</p>
                              <p><strong>Departamento:</strong> {item.departamento}</p>
                              <p><strong>Assunto:</strong> {item.assunto}</p>
                              <p><strong>Situação:</strong> {item.situacao}</p>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Myappointments;
