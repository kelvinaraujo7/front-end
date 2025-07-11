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
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { EditIcon, Power, Trash2Icon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useAppData } from "@/context/AppDataContextType ";

const Videos = () => {
  const { videos, editarVideo, excluirVideo } = useAppData();

  function alternarStatus(video: { id: number; active: string }) {
    editarVideo(video.id, {
      active: video.active === "Ativo" ? "Desativado" : "Ativo",
    });
  }

  return (
    <>
      <Card className="bg-slate-100 dark:bg-slate-950 mb-4 ml-4 mr-2 rounded-sm dark:shadow-lg dark:shadow-card-foreground">
        <CardHeader className="flex justify-between">
          <div>
            <CardTitle className="font-bold text-2xl w-1/2 dark:text-white">
              Vídeos
            </CardTitle>
            <CardDescription className="mt-5">
              Lista dos Vídeos a serem exibidos:
            </CardDescription>
          </div>
          <div>
            <Button
              asChild
              className="bg-slate-500 hover:bg-slate-700 hover:text-white dark:bg-white dark:text-black dark:hover:bg-slate-700 dark:hover:text-white"
            >
              <Link href="/videos/new">
                <Plus className="mr-2" />
                Novo vídeo
              </Link>
            </Button>
          </div>
        </CardHeader>
        <Separator className="bg-slate-300" />
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Título </TableHead>
                <TableHead className="text-center">Url</TableHead>
                <TableHead className="text-center">Ordem</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(videos) &&
                videos.map((video) => (
                  <TableRow key={video.id}>
                    <TableCell className="font-medium text-center">
                      {video.description}
                    </TableCell>

                    <TableCell className="font-medium text-center">
                      {video.url}
                    </TableCell>

                    <TableCell className="font-medium text-center">
                      {video.order}
                    </TableCell>

                    <TableCell
                      className={`text-center ${
                        video.active === "Ativo"
                          ? "text-green-700 dark:text-slate-50"
                          : "text-red-700 dark:text-slate-500"
                      }`}
                    >
                      {video.active}
                    </TableCell>

                    <TableCell className="text-center">
                      <div className="flex gap-2 ml-auto w-fit">
                        <button
                          className={`px-2 py-2 rounded-md mr-2 ${
                            video.active === "Ativo"
                              ? "bg-red-700 text-white"
                              : "bg-green-600 text-white"
                          }`}
                          title="Alternar status"
                          onClick={() => alternarStatus(video)}
                        >
                          <Power className="w-4 h-4" />
                        </button>
                        <Button
                          asChild
                          className="bg-blue-500 dark:bg-slate-400 text-white px-2 py-2 rounded-md mr-2"
                        >
                          <Link href={`/videos/${video.id}`}>
                            <EditIcon className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button
                          className="bg-red-500 dark:bg-slate-500 text-white px-2 py-2 rounded-md mr-2"
                          onClick={() => excluirVideo(video.id)}
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

export default Videos;
