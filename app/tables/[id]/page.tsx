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
  active: z.boolean(),
});

const TableForm = () => {
  const { guiches, adicionarGuiche, editarGuiche } = useAppData();
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const guiche = guiches.find((g) => String(g.id) === id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: guiche?.name || "",
      active: guiche ? guiche.status === "Ativo" : true,
    },
  });

  React.useEffect(() => {
    if (guiche) {
      form.reset({
        name: guiche.name,
        active: guiche.status === "Ativo",
      });
    }
  }, [guiche]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (guiche) {
      editarGuiche(guiche.id, {
        name: values.name,
        status: values.active ? "Ativo" : "Desativado",
      });
    } else {
      adicionarGuiche({
        id: Date.now(),
        name: values.name,
        status: values.active ? "Ativo" : "Desativado",
      });
    }
    router.push("/tables");
  }

  return (
    <div className="w-full min-h-screen p-4">
      <div className="w-full max-w-5xl mx-auto">
        <Card className="w-full bg-slate-100 dark:bg-slate-950 dark:border dark:border-white/10 dark:shadow-lg dark:shadow-card-foreground">
          <CardHeader className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <CardTitle className="font-bold text-2xl dark:text-white">
                Guichês
              </CardTitle>
              <CardDescription className="mt-2">
                Cadastro guichê de atendimento
              </CardDescription>
            </div>
            <div className="w-full md:w-auto">
              <Button
                asChild
                className="w-full md:w-auto bg-slate-500 hover:bg-slate-700 hover:text-white dark:bg-white dark:text-black dark:hover:bg-slate-700 dark:hover:text-white"
              >
                <Link href="/tables">
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
                className="grid grid-cols-1 md:grid-cols-4 gap-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="md:col-span-3">
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nome do guichê, exemplo: guichê (x)"
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
                    <FormItem>
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

                <div className="col-span-full mt-4">
                  <Button
                    type="submit"
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-800 dark:bg-white dark:text-black dark:hover:bg-slate-700 dark:hover:text-white font-bold py-2 px-4 rounded"
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
