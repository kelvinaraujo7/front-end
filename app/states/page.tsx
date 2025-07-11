"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Power, EditIcon, Trash2Icon } from "lucide-react";
import {
  Button,
} from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useAppData } from "@/context/AppDataContextType ";

const States = () => {
  const { states, editarState, excluirState } = useAppData();

  function alternarStatus(state: { id: number; status: string }) {
    editarState(state.id, {
      status: state.status === "Ativo" ? "Desativado" : "Ativo",
    });
  }

  return (
    <Card className="bg-slate-100 mb-4 ml-4 mr-2 rounded-sm shadow-md dark:bg-slate-950 dark:border dark:border-white/10 dark:shadow-lg dark:shadow-card-foreground">
      <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="w-full md:w-1/2">
          <CardTitle className="font-bold text-2xl dark:text-white whitespace-nowrap">
            Estados
          </CardTitle>
          <CardDescription className="mt-2 text-sm text-muted-foreground">
            Lista dos estados de atendimento:
          </CardDescription>
        </div>
        <div className="w-full md:w-auto">
          <Button
            asChild
            className="w-full md:w-auto bg-slate-500 hover:bg-slate-700 hover:text-white dark:bg-white dark:text-black dark:hover:bg-slate-700 dark:hover:text-white"
          >
            <Link href="/states/new">
              <Plus className="mr-2" />
              Novo estado
            </Link>
          </Button>
        </div>
      </CardHeader>

      <Separator className="bg-slate-300" />

      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[150px]">Nome</TableHead>
              <TableHead className="text-center min-w-[100px]">Status</TableHead>
              <TableHead className="text-center min-w-[140px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {states.map((state) => (
              <TableRow key={state.id}>
                <TableCell className="font-medium">{state.name}</TableCell>
                <TableCell
                  className={`text-center ${
                    state.status === "Ativo"
                      ? "text-green-700 dark:text-slate-50"
                      : "text-red-700 dark:text-slate-500"
                  }`}
                >
                  {state.status}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex flex-col md:flex-row justify-center gap-2">
                    <button
                      className={`px-2 py-2 rounded-md ${
                        state.status === "Ativo"
                          ? "bg-red-700 text-white"
                          : "bg-green-600 text-white"
                      }`}
                      title="Alternar status"
                      onClick={() => alternarStatus(state)}
                    >
                      <Power className="w-4 h-4" />
                    </button>
                    <Button
                      asChild
                      className="bg-blue-500 dark:bg-slate-400 text-white px-2 py-2 rounded-md"
                    >
                      <Link href={`/pages/tables/${state.id}`}>
                        <EditIcon className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button
                      className="bg-red-500 dark:bg-slate-500 text-white px-2 py-2 rounded-md"
                      onClick={() => excluirState(state.id)}
                    >
                      <Trash2Icon className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter></CardFooter>
    </Card>
  );
};

export default States;
