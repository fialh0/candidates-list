import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Candidate, createCandidateRequest } from "@/lib/fake-api-candidates";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const createCandidateSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.coerce.number(), // Vou receber como string do front e mandar para o back como number
});

type CreateCandidateSchema = z.infer<typeof createCandidateSchema>;

export function CreateCandidate() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <PlusCircle className="size-4 mr-2" />
            Novo candidate
          </Button>
        </DialogTrigger>

        <DialogContent className="w-full">
          <DialogHeader>
            <DialogTitle>Novo candidate</DialogTitle>
            <DialogDescription>
              Adicionar um novo candidate no sistema
            </DialogDescription>
          </DialogHeader>

          <CandidateForm isComplete={(state) => state && setOpen(false)} />

          <DialogFooter>
            <DialogClose className="w-full" asChild>
              <Button type="button" variant="outline" className="w-full">
                Cancelar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <PlusCircle className="size-4 mr-2" />
          Novo candidate
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Novo candidate</DrawerTitle>
          <DrawerDescription>
            Adicionar um novo candidate no sistema
          </DrawerDescription>
        </DrawerHeader>

        <CandidateForm
          className="px-4"
          isComplete={(state) => state && setOpen(false)}
        />

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

type CandidateFormTypes = {
  className?: React.ReactNode;
  isComplete: (state: boolean) => void;
};

function CandidateForm({ className, isComplete }: CandidateFormTypes) {
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");
  const name = searchParams.get("name");

  const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm<CreateCandidateSchema>({
    resolver: zodResolver(createCandidateSchema),
  });

  const { mutateAsync: createCandidateFn } = useMutation({
    mutationFn: createCandidateRequest,
    onSuccess(responseFromAPI) {
      // const cached = queryClient.getQueryData(["candidates"]); // Items antes de serem atualizados

      queryClient.setQueryData<Candidate[]>(
        ["candidates", id, name],
        (data) => {
          if (!data) {
            return;
          }

          return [...data, responseFromAPI];
        }
      );
    },
  });

  async function handleAddNewCandidate(data: CreateCandidateSchema) {
    try {
      await createCandidateFn({
        firstName: data.firstName,
        lastName: data.lastName,
        age: data.age,
      });

      toast.info("Candidate criado com sucesso");
      isComplete(true);
    } catch (err) {
      isComplete(true);
      toast.error(`Erro ao criar candidate: ${err}`);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleAddNewCandidate)}
      className={cn("space-y-6", className)}
    >
      <div className="grid grid-cols-4 items-center gap-3">
        <Label htmlFor="firstName">Nome</Label>
        <Input
          id="firstName"
          className="col-span-3"
          {...register("firstName")}
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-3">
        <Label htmlFor="lastName">Sobrenome</Label>
        <Input id="lastName" className="col-span-3" {...register("lastName")} />
      </div>

      <div className="grid grid-cols-4 items-center gap-3">
        <Label htmlFor="lastName">Idade</Label>
        <Input id="lastName" className="col-span-3" {...register("age")} />
      </div>

      <Button type="submit" className="w-full">
        Salvar
      </Button>
    </form>
  );
}
