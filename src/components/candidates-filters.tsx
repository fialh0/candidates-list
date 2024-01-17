import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

const candidatesFiltersSchema = z.object({
  id: z.string(),
  firstName: z.string(),
});

type CandidatesFiltersSchema = z.infer<typeof candidatesFiltersSchema>;

export function CandidatesFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");
  const firstName = searchParams.get("firstName");

  const { register, handleSubmit } = useForm<CandidatesFiltersSchema>({
    resolver: zodResolver(candidatesFiltersSchema),
    values: {
      id: id ?? "",
      firstName: firstName ?? "",
    },
  });

  function handleFilterCandidates({ id, firstName }: CandidatesFiltersSchema) {
    setSearchParams((state) => {
      if (id) {
        state.set("id", id);
      } else {
        state.delete("id");
      }

      return state;
    });

    setSearchParams((state) => {
      if (firstName) {
        state.set("firstName", firstName);
      } else {
        state.delete("firstName");
      }

      return state;
    });
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilterCandidates)}
      className="flex flex-col lg:flex-row items-center gap-2"
    >
      <Input placeholder="ID do candidate" {...register("id")} />
      <Input placeholder="Name do candidate" {...register("firstName")} />

      <Button type="submit" variant="link">
        <Search className="size-4 mr-2" />
        Filtrar resultados
      </Button>
    </form>
  );
}
