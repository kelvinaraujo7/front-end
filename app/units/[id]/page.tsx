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

const Units = () => {
  const { units, adicionarUnit, editarUnit } = useAppData();
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const unit = units.find((u) => String(u.id) === id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: unit?.name || "",
      active: unit ? unit.status === "Ativo" : true,
    },
  });

  React.useEffect(() => {
    if (unit) {
      form.reset({
        name: unit.name,
        active: unit.status === "Ativo",
      });
    }
  }, [unit]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (unit) {
      editarUnit(unit.id, {
        name: values.name,
        status: values.active ? "Ativo" : "Desativado",
      });
    } else {
      adicionarUnit({
        id: Date.now(),
        name: values.name,
        status: values.active ? "Ativo" : "Desativado",
      });
    }
    router.push("/units");
  }

  return (
    <Card className="bg-slate-100 dark:bg-slate-950 mb-4 mx-2 md:ml-72 rounded-sm dark:shadow-lg dark:shadow-card-foreground">
      <CardHeader className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <CardTitle className="font-bold text-2xl dark:text-white">
            Unidades
          </CardTitle>
          <CardDescription className="mt-2">
            Cadastro unidades de atendimento:
          </CardDescription>
        </div>
        <div className="w-full md:w-auto">
          <Button
            asChild
            className="w-full md:w-auto bg-slate-500 hover:bg-slate-700 hover:text-white dark:bg-white dark:text-black dark:hover:bg-slate-700 dark:hover:text-white"
          >
            <Link href="/units">
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
                      placeholder="Nome da unidade, exemplo: Coren (x)"
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

            <div>
              <Button
                type="submit"
                className="mt-2 w-full md:w-4/6 bg-blue-600 hover:bg-blue-800 dark:bg-slate-500 dark:hover:bg-slate-700 text-white font-bold py-2 px-4 rounded dark:bg-white dark:text-black dark:hover:bg-slate-700 dark:hover:text-white"
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

export default Units;
