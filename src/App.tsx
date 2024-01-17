import { Search } from "lucide-react";
import { AddNewCandidate } from "./components/AddNewCandidate";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";

function App() {
  return (
    <div className="p-6 max-w-screen-xl mx-auto space-y-4">
      <h1 className="text-5xl font-bold">Candidates</h1>

      <div className="flex items-center justify-between">
        <form className="flex items-center gap-2">
          <Input name="id" placeholder="ID do candidate" />
          <Input name="name" placeholder="Name do candidate" />

          <Button type="submit" variant="link">
            <Search className="w-4 h-4 mr-2" />
            Filtrar resultados
          </Button>
        </form>

        <AddNewCandidate />
      </div>

      <div className="border rounded p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Sobrenome</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>01</TableCell>
                <TableCell>Candidate {i}</TableCell>
                <TableCell>Lastname</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default App;
