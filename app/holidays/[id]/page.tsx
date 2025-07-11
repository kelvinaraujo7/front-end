"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
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
import { useRouter, useParams } from "next/navigation";
import { z } from "zod";
import { MoveLeft } from "lucide-react";
import React from "react";
import { useAppData } from "../../../context/AppDataContextType ";

const formSchema = z.object({
  name: z
    .string()
    .min(6, { message: "O nome deve ter pelo menos 6 caracteres." })
    .max(16, { message: "O nome deve ter no máximo 16 caracteres." }),
  active: z.boolean(),
  dayoff: z.string().optional(),
});

const TableForm = () => {
  const { holidays, adicionarHoliday, editarHoliday } = useAppData();
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const holiday = holidays.find((h) => String(h.id) === id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      active: holiday ? holiday.active === "Ativo" : true,
      name: holiday?.name ?? "",
      dayoff: holiday?.dayoff ?? "",
    },
  });

  React.useEffect(() => {
    if (holiday) {
      form.reset({
        name: holiday.name,
        dayoff: holiday.dayoff,
        active: holiday.active === "Ativo",
      });
    }
  }, [holiday]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const novoHoliday = {
      name: values.name,
      dayoff: values.dayoff,
      active: values.active ? "Ativo" : "Desativado",
    };

    if (holiday) {
      editarHoliday(holiday.id, novoHoliday);
    } else {
      adicionarHoliday({
        id: Date.now(),
        ...novoHoliday,
      });
    }

    router.push("/pages/holidays");
  }

  return (
    <div className="w-full min-h-screen p-4">
      <div className="w-full max-w-5xl mx-auto">
        <Card className="w-full bg-slate-100 dark:bg-slate-950 dark:border dark:border-white/10 dark:shadow-lg dark:shadow-card-foreground">
          <CardHeader className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <CardTitle className="font-bold text-2xl dark:text-white">Feriados</CardTitle>
              <CardDescription className="mt-2">Gerenciar Feriados:</CardDescription>
            </div>
            <div className="w-full md:w-auto">
              <Button
                asChild
                className="w-full md:w-auto bg-slate-500 hover:bg-slate-700 hover:text-white dark:bg-white dark:text-black dark:hover:bg-slate-700 dark:hover:text-white"
              >
                <Link href="/holidays">
                  <MoveLeft className="mr-2" />
                  Voltar
                </Link>
              </Button>
            </div>
          </CardHeader>

          <Separator className="bg-slate-300 dark:bg-slate-700" />

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Feriado:</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: Dia da Independência"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dayoff"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data:</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          className="w-full text-lg leading-6"
                          style={{ textAlign: "left", fontSize: "14px" }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="active"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2 mt-3 w-full">
                      <FormLabel>Ativo?</FormLabel>
                      <RadioGroup
                        value={field.value ? "T" : "F"}
                        onValueChange={(val) => field.onChange(val === "T")}
                        className="flex items-center space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="T" id="option-t" />
                          <Label htmlFor="option-t">Sim</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="F" id="option-f" />
                          <Label htmlFor="option-f">Não</Label>
                        </div>
                      </RadioGroup>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="md:col-span-2 flex justify-start">
                  <Button
                    type="submit"
                    className="mt-5 w-full md:w-1/6 bg-blue-600 hover:bg-blue-800 dark:bg-slate-500 dark:hover:bg-slate-700 text-white font-bold py-2 px-4 rounded dark:bg-white dark:text-black dark:hover:bg-slate-700 dark:hover:text-white"
                  >
                    Salvar
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TableForm;
