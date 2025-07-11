"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MoveLeft } from "lucide-react";

import { useAppData } from "../../../context/AppDataContextType ";

const formSchema = z.object({
  name: z
    .string()
    .min(6, { message: "O nome deve ter pelo menos 6 caracteres." })
    .max(16, { message: "O nome deve ter no máximo 16 caracteres." }),
  active: z.boolean(),
  startServiceMorning: z.string().optional(),
  endServiceMorning: z.string().optional(),
  startServiceAfternoon: z.string().optional(),
  endServiceAfternoon: z.string().optional(),
  exceptionDay: z.string().optional(),
  serviceTime: z.string().optional(),
});

const TableForm = () => {
  const { departments, adicionarDepartment, editarDepartment } = useAppData();
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const department = departments.find((d) => String(d.id) === id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: department?.name || "",
      active: department ? department.status === "Ativo" : true,
      startServiceMorning: department?.startServiceMorning ?? "",
      endServiceMorning: department?.endServiceMorning ?? "",
      startServiceAfternoon: department?.startServiceAfternoon ?? "",
      endServiceAfternoon: department?.endServiceAfternoon ?? "",
      exceptionDay: department?.exceptionDay ?? "",
      serviceTime: department?.serviceTime ?? "",
    },
  });

  React.useEffect(() => {
    if (department) {
      form.reset({
        name: department.name,
        active: department.status === "Ativo",
        startServiceMorning: department.startServiceMorning,
        endServiceMorning: department.endServiceMorning,
        startServiceAfternoon: department.startServiceAfternoon,
        endServiceAfternoon: department.endServiceAfternoon,
        exceptionDay: department.exceptionDay,
        serviceTime: department.serviceTime,
      });
    }
  }, [department]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newDepartment = {
      id: department?.id ?? Date.now(),
      name: values.name,
      status: values.active ? "Ativo" : "Desativado",
      startServiceMorning: values.startServiceMorning,
      endServiceMorning: values.endServiceMorning,
      startServiceAfternoon: values.startServiceAfternoon,
      endServiceAfternoon: values.endServiceAfternoon,
      exceptionDay: values.exceptionDay,
      serviceTime: values.serviceTime,
    };

    if (department) {
      editarDepartment(department.id, newDepartment);
    } else {
      adicionarDepartment(newDepartment);
    }

    router.push("/departments");
  }

  return (
    <div className="w-full min-h-screen p-4 md:pl-[250px]">
      <Card className="bg-slate-100  shadow-lg w-full dark:bg-slate-950 dark:border dark:border-white/10 dark:shadow-lg dark:shadow-card-foreground">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex-1">
            <CardTitle className="text-xl sm:text-2xl font-bold dark:text-white">
              Departamentos
            </CardTitle>
            <CardDescription className="text-sm mt-1">
              Cadastro de departamentos para atendimento:
            </CardDescription>
          </div>
          <Button
            asChild
            className="bg-slate-600 hover:bg-slate-800 text-white whitespace-nowrap"
          >
            <Link href="/departments" className="flex items-center gap-2 dark:bg-white dark:text-black">
              <MoveLeft className="w-4 h-4" />
              Voltar
            </Link>
          </Button>
        </CardHeader>

        <Separator className="bg-slate-300 dark:bg-slate-700" />

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
            >
              {/* Nome */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-1 sm:col-span-2 md:col-span-4">
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nome do departamento, ex: Atendimento"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Horários */}
              {[
                ["startServiceMorning", "Hora Inicial manhã"],
                ["endServiceMorning", "Hora Final manhã"],
                ["startServiceAfternoon", "Hora Inicial tarde"],
                ["endServiceAfternoon", "Hora Final tarde"],
              ].map(([name, label]) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name as keyof z.infer<typeof formSchema>}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} className="text-center text-sm" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              {/* Dia de exceção */}
              <FormField
                control={form.control}
                name="exceptionDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dia De Exceção</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} className="text-center text-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tempo de Serviço */}
              <FormField
                control={form.control}
                name="serviceTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tempo de Serviço</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} className="text-center text-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Ativo */}
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="col-span-1 mt-2">
                    <FormLabel>Ativo?</FormLabel>
                    <RadioGroup
                      value={field.value ? "T" : "F"}
                      onValueChange={(val) => field.onChange(val === "T")}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="T" id="active-t" />
                        <Label htmlFor="active-t">Sim</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="F" id="active-f" />
                        <Label htmlFor="active-f">Não</Label>
                      </div>
                    </RadioGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Botão */}
              <div className="col-span-full mt-4">
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-800 dark:bg-slate-500 dark:hover:bg-slate-700 text-white font-bold px-6 py-2 dark:bg-white dark:text-black"
                >
                  Salvar
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TableForm;
