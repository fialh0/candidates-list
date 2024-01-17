import { CandidatesFilters } from "@/components/candidates-filters";
import { CreateCandidate } from "@/components/create-candidate";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCandidates } from "@/data/candidates";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export function Candidates() {
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");
  const firstName = searchParams.get("firstName");

  const { data: candidates, isLoading: candidatesLoading } = useQuery({
    queryKey: ["candidates", id, firstName],
    queryFn: () =>
      getCandidates({
        id,
        firstName,
      }),
  });

  return (
    <div className="p-6 max-w-screen-xl mx-auto space-y-4">
      <h1 className="text-5xl font-bold">Candidates</h1>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
        <CandidatesFilters />

        <CreateCandidate />
      </div>

      {candidatesLoading ? (
        <div>
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="w-[23%] h-[40px] " />
            <Skeleton className="w-[23%] h-[40px] " />
            <Skeleton className="w-[23%] h-[40px] " />
            <Skeleton className="w-[23%] h-[40px] " />
          </div>

          <div className="flex flex-col gap-4">
            <Skeleton className="w-[100%] h-[37px] " />
            <Skeleton className="w-[100%] h-[37px] " />
            <Skeleton className="w-[100%] h-[37px] " />
            <Skeleton className="w-[100%] h-[37px] " />
            <Skeleton className="w-[100%] h-[37px] " />
            <Skeleton className="w-[100%] h-[37px] " />
          </div>
        </div>
      ) : (
        <div className="border rounded p-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Sobrenome</TableHead>
                <TableHead>Idade</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {candidates?.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell>{candidate.id}</TableCell>
                  <TableCell>{candidate.firstName}</TableCell>
                  <TableCell>{candidate.lastName}</TableCell>
                  <TableCell>{candidate.age}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
