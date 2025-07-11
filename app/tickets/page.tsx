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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { MailOpen, Plus, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

import { z } from "zod";
import { EditIcon, Power, Trash2Icon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useAppData } from "@/context/AppDataContextType ";

const Tickets = () => {
  const { tickets, editarTicket, excluirTicket } = useAppData();

  function alternarStatus(ticket: { id: number; status: string }) {
    editarTicket(ticket.id, {
      status: ticket.status === "Ativo" ? "Desativado" : "Ativo",
    });
  }

  return (
    <>
      <Card className="bg-slate-100 dark:bg-slate-950 mb-4 ml-4 mr-2 dark:rounded-sm dark:shadow-lg dark:shadow-card-foreground">
        <CardHeader className="flex justify-between">
          <div>
            <CardTitle className="font-bold text-2xl w-1/2 dark:text-white">
              Bilhetes
            </CardTitle>
            <CardDescription className="mt-3" >
              Lista dos bilhetes de atendimento:
            </CardDescription>
          </div>
          <div>
            <Button
              asChild
              className="bg-slate-500 hover:bg-slate-700 hover:text-white dark:bg-white dark:text-black dark:hover:bg-slate-700 dark:hover:text-white"
            >
              <Link href="/tickets/new">
                <Plus className="mr-2" />
                Novo bilhete
              </Link>
            </Button>
          </div>
        </CardHeader>
        <Separator className="bg-slate-300" />
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Nome</TableHead>
                <TableHead className="text-center">
                  Data Inicial 
                </TableHead>
                <TableHead className="text-center">
                  Data Final 
                </TableHead>   
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(tickets) &&
                tickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">
                      {ticket.name}
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      {ticket.startDate}
                    </TableCell>

                    <TableCell className="font-medium text-center">
                      {ticket.endDate}
                    </TableCell>

                    <TableCell
                      className={`text-center ${
                        ticket.status === "Ativo"
                          ? "text-green-700 dark:text-slate-50"
                          : "text-red-700 dark:text-slate-500"
                      }`}
                    >
                      {ticket.status}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex gap-2 ml-auto w-fit">
                        <button
                          className={`px-2 py-2 rounded-md mr-2 ${
                            ticket.status === "Ativo"
                              ? "bg-red-700 text-white"
                              : "bg-green-600 text-white"
                          }`}
                          title="Alternar status"
                          onClick={() => alternarStatus(ticket)}
                        >
                          <Power className="w-4 h-4" />
                        </button>
                        <Button
                          asChild
                          className="bg-blue-500 dark:bg-slate-400 text-white px-2 py-2 rounded-md mr-2"
                        >
                          <Link href={`/pages/tickets/${ticket.id}`}>
                            <EditIcon className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button
                          className="bg-red-500 dark:bg-slate-500 text-white px-2 py-2 rounded-md mr-2"
                          onClick={() => excluirTicket(ticket.id)}
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
        <CardFooter>{/* Paginação, se necessário */}</CardFooter>
      </Card>
    </>
  );
};

export default Tickets;
