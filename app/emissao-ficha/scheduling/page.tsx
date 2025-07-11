"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Headset, ZoomIn, Scale } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { isBefore, startOfDay } from "date-fns";

const schema = z.object({
  nome: z.string().min(2, "Nome obrigatório").regex(/^[A-Za-zÀ-ÿ\s]+$/, "Apenas letras são permitidas"),
  email: z.string().email("E-mail inválido"),
  cpf: z.string().min(14, "CPF incompleto").regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
  horario: z.string().min(1, "Selecione um horário"),
  servico: z.string().min(1, "Selecione um tipo de serviço"),
});

type FormData = z.infer<typeof schema>;

const horariosDisponiveis = [
  "08:00", "09:00", "10:00", "11:00",
  "13:00", "14:00", "15:00", "16:00"
];

const acoesCards = [
  { text: "Atendimento", icon: Headset },
  { text: "Fiscalização", icon: ZoomIn },
  { text: "Jurídico", icon: Scale },
];

function MyDatePicker({ selected, setSelected, onDateClick }: {
  selected: Date | undefined;
  setSelected: (date: Date | undefined) => void;
  onDateClick?: () => void;
}) {
  const modifiers = {
    passed: (date: Date) => isBefore(date, startOfDay(new Date())),
  };

  return (
    <div className="w-full">
      <div className="bg-[#3c4349] text-white rounded-xl px-2 sm:px-4 py-3 overflow-x-auto max-w-full dark:bg-slate-950 dark:shadow-sm dark:border-white/10 rounded-lg dark:shadow-lg dark:border">
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={(date) => {
            setSelected(date);
            onDateClick?.();
          }}
          className="w-full max-w-full [&_.rdp-nav_button_svg]:stroke-[#fcd32a] [&_.rdp-nav_button_svg]:stroke-[2]"
          modifiers={modifiers}
          modifiersClassNames={{
            scheduled: "bg-green-500 text-white",
            cancelled: "bg-red-500 text-white",
            passed: "bg-gray-500 text-white",
            selected: " text-yellow-400 font-bold rounded-full",
            today: " text-yellow-400 font-bold rounded-full",
          }}
        />
      </div>
      <p className="mt-2 text-sm text-center text-[#2e404e] font-semibold dark:text-white">
        {selected ? `Data selecionada: ${selected.toLocaleDateString("pt-BR")}` : "Escolha um dia disponível:"}
      </p>
    </div>
  );
}

const SchedulingPage = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedHorario, setSelectedHorario] = React.useState<string>("");
  const [servicoSelecionado, setServicoSelecionado] = React.useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    console.log("Dados validados:", { ...data, dataSelecionada: selectedDate });
    router.push("../emissao-ficha/my-appointments");
  };

  return (
    <div className="min-h-screen w-full bg-[#eeeeee] text-[#2c3e50] dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex justify-end mb-4" />
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-2">
          <h1 className="text-3xl font-bold text-[#2d485a] dark:text-white">Agendamento</h1>
          <button
            onClick={() => router.push("../emissao-ficha/my-appointments")}
            className="bg-[#3c4349] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#6b8ca1] transition dark:bg-white dark:text-black"
          >
            Meus agendamentos
          </button>
        </div>

        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>

        <div className="bg-[#f5f5f5] rounded-3xl p-6 sm:p-8 dark:bg-slate-950 dark:shadow-xl shadow-card-foreground dark:border dark:border-white/10">
          <h2 className="text-2xl mb-6 text-[#2d485a] font-semibold dark:text-white">Realizar agendamento</h2>

          {/* Modal Horário */}
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogContent className="max-w-2xs w-full dark:bg-slate-950 dark:border dark:border-white/10 dark:shadow-lg dark:shadow-card-foreground">
              <DialogHeader>
                <DialogTitle>Escolha um horário:</DialogTitle>
              </DialogHeader>
              <motion.div
                className="grid grid-cols-2 gap-4 mt-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {horariosDisponiveis.map((hora) => (
                  <button
                    key={hora}
                    onClick={() => {
                      setSelectedHorario(hora);
                      setValue("horario", hora);
                      setModalOpen(false);
                    }}
                    className="bg-[#3c4349] text-white py-2 rounded-lg hover:bg-[#6b8ca1] transition dark:bg-slate-950 dark:border dark:border-white/10 dark:shadow-lg"
                  >
                    {hora}
                  </button>
                ))}
              </motion.div>
            </DialogContent>
          </Dialog>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">

              {/* Local e Serviço */}
              <div className="bg-[#d7d7d7] p-6 rounded-xl dark:bg-slate-950 dark:border dark:border-white/10 dark:shadow-lg dark:shadow-card-foreground">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Local e serviço:</h3>

                <label className="mb-1 font-semibold dark:text-white">Escolha um Estado:</label>
                <select className="w-full p-2 rounded-md mb-6 text-black bg-[#f1f5f8]">
                  <option>Selecione um estado</option>
                </select>

                <label className="mb-1 font-semibold dark:text-white">Escolha uma unidade:</label>
                <select className="w-full p-2 rounded-md mb-6 text-black bg-[#f1f5f8]">
                  <option>Selecione uma unidade</option>
                </select>

                <label className="mb-2 font-semibold dark:text-white block">Escolha um Departamento:</label>
                <div className="flex gap-3 flex-wrap justify-center mb-2">
                  {acoesCards.map(({ text, icon: Icon }, index) => (
                    <button
                      type="button"
                      key={index}
                      onClick={() => {
                        setValue("servico", text);
                        setServicoSelecionado(text);
                      }}
                      className={`p-5 rounded-full w-24 h-24 flex flex-col items-center justify-center transition text-xs font-medium select-none
                        ${
                          servicoSelecionado === text
                            ? "bg-[#6b8ca1] text-white dark:bg-slate-800"
                            : "bg-[#3c4349] text-white dark:bg-white dark:text-black hover:bg-[#6b8ca1]"
                        }`}
                    >
                      <Icon className="w-6 h-6 mb-1" />
                      {text}
                    </button>
                  ))}
                </div>
                <br />
                <label className=" font-semibold dark:text-white">Escolha um tipo de serviço:</label>
                <select className="w-full p-2 rounded-md mb-6 text-black bg-[#f1f5f8]">
                  <option>Selecione um tipo de serviço </option>
                </select>
                {errors.servico && (
                  <p className="text-[#ff4d4d] text-sm mt-1 text-center">{errors.servico.message}</p>
                )}
              </div>

              {/* Data e Hora */}
              <div className="bg-[#d7d7d7] p-6 rounded-xl dark:bg-slate-950 dark:border dark:border-white/10 dark:shadow-lg dark:shadow-card-foreground">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Data e hora:</h3>
                <MyDatePicker
                  selected={selectedDate}
                  setSelected={setSelectedDate}
                  onDateClick={() => setModalOpen(true)}
                />
                <div className="mt-6">
                  <label htmlFor="horario" className="font-semibold mb-1 dark:text-white">
                    Horário selecionado:
                  </label>
                  <input
                    type="text"
                    id="horario"
                    {...register("horario")}
                    value={selectedHorario}
                    readOnly
                    className="w-full p-2 mt-1 rounded-md text-white bg-[#3c4349] dark:bg-white dark:text-black focus:outline-none"
                  />
                  {errors.horario && (
                    <p className="text-[#ff4d4d] text-sm mt-1">{errors.horario.message}</p>
                  )}
                </div>
              </div>

              {/* Dados Pessoais */}
              <div className="bg-[#d7d7d7] p-6 rounded-xl dark:bg-slate-950 dark:border dark:border-white/10 dark:shadow-lg dark:shadow-card-foreground">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Dados pessoais:</h3>

                <label htmlFor="nome" className="font-semibold dark:text-white mb-3">Nome:</label>
                <input
                  id="nome"
                  {...register("nome")}
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-zÀ-ÿ\s]/g, "");
                  }}
                  placeholder="Digite seu nome"
                  className="w-full p-2 rounded-md mb-7 text-black bg-[#f1f5f8]"
                />
                {errors.nome && <p className="text-[#ff4d4d] text-sm mb-2">{errors.nome.message}</p>}

                <label htmlFor="email" className="font-semibold dark:text-white mb-2">Email:</label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="Digite seu e-mail"
                  className="w-full p-2 rounded-md mb-7 text-black bg-[#f1f5f8]"
                />
                {errors.email && <p className="text-[#ff4d4d] text-sm mb-2">{errors.email.message}</p>}

                <label htmlFor="cpf" className=" font-semibold dark:text-white mb-2">CPF:</label>
                <input
                  id="cpf"
                  {...register("cpf")}
                  placeholder=" CPF, exemplo: 000.000.000-00"
                  className="w-full p-2 rounded-md text-black bg-[#f1f5f8]"
                />
                {errors.cpf && <p className="text-[#ff4d4d] text-sm mt-1">{errors.cpf.message}</p>}
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                type="submit"
                disabled={!isValid}
                className={`px-7 py-3 rounded-xl font-semibold transition-colors dark:bg-white dark:text-black ${
                  isValid
                    ? "bg-[#3c4349] text-white hover:bg-[#6b8ca1]"
                    : "bg-[#7f9ebe] text-white opacity-50 cursor-not-allowed"
                }`}
              >
                Confirmar Agendamento
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SchedulingPage;
