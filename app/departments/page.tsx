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
import { Plus, Power, Trash2Icon, EditIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useAppData } from "@/context/AppDataContextType ";

const Departments = () => {
  const { departments, editarDepartment, excluirDepartment } = useAppData();

  function alternarStatus(department: { id: number; status: string }) {
    editarDepartment(department.id, {
      status: department.status === "Ativo" ? "Desativado" : "Ativo",
    });
  }

  return (
    <div className="p-4 w-full overflow-x-auto">
      <Card className="bg-slate-100   w-full dark:bg-slate-950 dark:border dark:border-white/10 dark:shadow-lg dark:shadow-card-foreground">
        <CardHeader className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <CardTitle className="text-xl sm:text-2xl dark:text-white">
              Departamentos
            </CardTitle>
            <CardDescription className="text-sm sm:text-base mt-2">
              Lista dos departamentos de atendimento:
            </CardDescription>
          </div>
          <Button
            asChild
            className="bg-slate-600 hover:bg-slate-800 text-white whitespace-nowrap"
          >
            <Link href="/departments/new" className="flex items-center gap-2 dark:bg-white dark:text-black dark:hover:bg-slate-700">
              <Plus size={16} />
              Novo departamento
            </Link>
          </Button>
        </CardHeader>

        <Separator className="bg-slate-300 dark:bg-slate-700" />

        <CardContent className="overflow-x-auto">
          <Table className="w-full min-w-[1000px]">
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="text-center">Hora Inicial Manhã</TableHead>
                <TableHead className="text-center">Hora Final Manhã</TableHead>
                <TableHead className="text-center">Hora Inicial Tarde</TableHead>
                <TableHead className="text-center">Hora Final Tarde</TableHead>
                <TableHead className="text-center">Dia de Exceção</TableHead>
                <TableHead className="text-center">Tempo de Serviço</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {Array.isArray(departments) &&
                departments.map((department) => (
                  <TableRow key={department.id}>
                    <TableCell>{department.name}</TableCell>
                    <TableCell className="text-center">
                      {department.startServiceMorning}
                    </TableCell>
                    <TableCell className="text-center">
                      {department.endServiceMorning}
                    </TableCell>
                    <TableCell className="text-center">
                      {department.startServiceAfternoon}
                    </TableCell>
                    <TableCell className="text-center">
                      {department.endServiceAfternoon}
                    </TableCell>
                    <TableCell className="text-center">
                      {department.exceptionDay}
                    </TableCell>
                    <TableCell className="text-center">
                      {department.serviceTime}
                    </TableCell>
                    <TableCell
                      className={`text-center font-semibold ${
                        department.status === "Ativo"
                          ? "text-green-700 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {department.status}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          className={`p-2 rounded-md ${
                            department.status === "Ativo"
                              ? "bg-red-600"
                              : "bg-green-600"
                          } text-white`}
                          onClick={() => alternarStatus(department)}
                          title="Alternar status"
                        >
                          <Power className="w-4 h-4" />
                        </button>
                        <Button
                          asChild
                          className="p-2 bg-blue-600 text-white"
                        >
                          <Link href={`/departments/${department.id}`}>
                            <EditIcon className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button
                          className="p-2 bg-red-500 text-white"
                          onClick={() => excluirDepartment(department.id)}
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

        <CardFooter />
      </Card>
    </div>
  );
};

export default Departments;
