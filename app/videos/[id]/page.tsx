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
  description: z
    .string()
    .min(6, { message: "O nome deve ter pelo menos 6 caracteres." })
    .max(16, { message: "O nome deve ter no máximo 16 caracteres." }),
  active: z.string(),
  url: z.string().optional(),
  order: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().optional()
  ),
});

const TableForm = () => {
  const { videos, adicionarVideo, editarVideo } = useAppData();
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const video = videos.find((v) => String(v.id) === id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      active: video ? video.active === "Ativo" : "Desativado",
      description: video?.description ?? "",
      url: video?.url ?? "",
      order: video?.order ?? undefined,
    },
  });

  React.useEffect(() => {
    if (video) {
      form.reset({
        active: video.active === "Ativo",
      });
    }
  }, [video]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const videoData = {
      description: values.description,
      url: values.url,
      order: values.order,
      active: values.active ? "Ativo" : "Desativado",
    };

    if (video) {
      editarVideo(video.id, videoData);
    } else {
      adicionarVideo({ id: Date.now(), ...videoData });
    }

    router.push("/videos");
  }

  return (
    <Card className="bg-slate-100 dark:bg-slate-950 mb-4 mx-4 rounded-sm shadow-lg dark:shadow-card-foreground max-w-screen-md mx-auto">
      <CardHeader className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <CardTitle className="font-bold text-2xl dark:text-white">Vídeos</CardTitle>
          <CardDescription className="mt-2">Vídeos para exibição:</CardDescription>
        </div>
        <div>
          <Button
            asChild
            className="w-full sm:w-auto bg-slate-500 hover:bg-slate-700 hover:text-white dark:bg-white dark:text-black dark:hover:bg-slate-700 dark:hover:text-white"
          >
            <Link href="/videos">
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
              name="description"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Título do vídeo:"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Url - Endereço do vídeo:</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://exemplo.com.br"
                      className="w-full text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ordem de exibição:</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ex: 1"
                      className="w-full text-sm"
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
                <FormItem className="sm:col-span-2 mt-3">
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
                className="mt-5 w-full sm:w-1/4 bg-blue-600 hover:bg-blue-800 dark:bg-slate-500 dark:hover:bg-slate-700 text-white font-bold py-2 px-4 rounded dark:bg-white dark:text-black dark:hover:bg-slate-700 dark:hover:text-white"
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
