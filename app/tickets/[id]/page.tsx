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
import { useAppData } from "@/context/AppDataContextType ";

const formSchema = z.object({
  name: z
    .string()
    .min(6, {
      message: "O nome deve ter pelo menos 6 caracteres.",
    })
    .max(16, {
      message: "O nome deve ter no máximo 16 caracteres.",
    }),
  startDate: z.string().min(1, { message: "Data inicial obrigatória" }),
  endDate: z.string().min(1, { message: "Data final obrigatória" }),
  active: z.boolean(),
});

const TableForm = () => {
  const { tickets, adicionarTicket, editarTicket } = useAppData();
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const ticket = tickets.find((t) => String(t.id) === id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ticket?.name || "",
      startDate: ticket?.startDate || "",
      endDate: ticket?.endDate || "",
      active: ticket ? ticket.status === "Ativo" : true,
    },
  });

  React.useEffect(() => {
    if (ticket) {
      form.reset({
        name: ticket.name,
        startDate: ticket.startDate,
        endDate: ticket.endDate,
        active: ticket.status === "Ativo",
      });
    }
  }, [ticket]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const ticketData = {
      name: values.name,
      startDate: values.startDate,
      endDate: values.endDate,
      status: values.active ? "Ativo" : "Desativado",
    };

    if (ticket) {
      editarTicket(ticket.id, ticketData);
    } else {
      adicionarTicket({ id: Date.now(), ...ticketData });
    }

    router.push("/pages/tickets");
  }

  return (
    <Card className="bg-slate-100 dark:bg-slate-950 mb-4 mx-4 rounded-sm shadow-lg dark:shadow-card-foreground max-w-screen-md mx-auto">
      <CardHeader className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <CardTitle className="font-bold text-2xl dark:text-white">
            Bilhetes
          </CardTitle>
          <CardDescription className="mt-2">
            Cadastro bilhete de atendimento:
          </CardDescription>
        </div>
        <div>
          <Button
            asChild
            className="bg-slate-500 hover:bg-slate-700 hover:text-white dark:bg-white dark:text-black dark:hover:bg-slate-700 dark:hover:text-white w-full sm:w-auto"
          >
            <Link href="/tickets">
              <MoveLeft className="mr-2" />
              Voltar
            </Link>
          </Button>
        </div>
      </CardHeader>

      <Separator className="bg-slate-300" />

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full sm:col-span-2">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nome do bilhete"
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
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data inicial</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      className="w-full text-sm"
                      style={{ textAlign: "center" }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data final</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      className="w-full text-sm"
                      style={{ textAlign: "center" }}
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
                <FormItem className="sm:col-span-2 mt-2">
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

            <div className="sm:col-span-2 flex justify-start">
              <Button
                type="submit"
                className="mt-3 w-full sm:w-1/4 bg-blue-600 hover:bg-blue-800 dark:bg-slate-500 dark:hover:bg-slate-700 text-white font-bold py-2 px-4 rounded dark:bg-white dark:text-black dark:hover:bg-slate-700 dark:hover:text-white"
              >
                Salvar
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TableForm;
