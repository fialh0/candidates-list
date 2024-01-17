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
import { cn } from "@/lib/utils";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";

export function AddNewCandidate() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Novo candidate</Button>
        </DialogTrigger>

        <DialogContent className="w-full">
          <DialogHeader>
            <DialogTitle>Novo candidate</DialogTitle>
            <DialogDescription>
              Adicionar um novo candidate no sistema
            </DialogDescription>
          </DialogHeader>

          <CandidateForm />

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
        <Button variant="outline">Novo candidate</Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Novo candidate</DrawerTitle>
          <DrawerDescription>
            Adicionar um novo candidate no sistema
          </DrawerDescription>
        </DrawerHeader>

        <CandidateForm className="px-4" />

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function CandidateForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("space-y-6", className)}>
      <div className="grid grid-cols-4 items-center gap-3">
        <Label htmlFor="first-name">Nome</Label>
        <Input type="text" id="first-name" className="col-span-3" />
      </div>

      <div className="grid grid-cols-4 items-center gap-3">
        <Label htmlFor="last-name">Sobrenome</Label>
        <Input type="text" id="last-name" className="col-span-3" />
      </div>

      <Button type="submit" className="w-full">
        Save changes
      </Button>
    </form>
  );
}
