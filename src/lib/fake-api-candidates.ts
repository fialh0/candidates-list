import candidates from "@/data/candidates";

export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
}

interface GetCandidateFilters {
  id: string | null;
  name: string | null;
}

export async function getCandidates({ id, name }: GetCandidateFilters) {
  // Delay de 1s para simular a chamada de uma API
  await new Promise((resolve) => setTimeout(resolve, 1000));

  let candidatesData = candidates;

  if (id) {
    candidatesData = candidates.filter((candidate) =>
      candidate.id.includes(id)
    );
  }

  if (name) {
    const firstNameData = candidates.filter((candidate) =>
      candidate.firstName.includes(name)
    );

    if (firstNameData.length > 0) {
      candidatesData = firstNameData;
    }

    const lastNameData = candidates.filter((candidate) =>
      candidate.lastName.includes(name)
    );

    if (lastNameData.length > 0) {
      candidatesData = lastNameData;
    }
  }

  return candidatesData;
}

interface CreateCandidateRequest {
  firstName: string;
  lastName: string;
  age: number;
}

export async function createCandidateRequest(data: CreateCandidateRequest) {
  // Delay de 1s para simular a chamada de uma API
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    id: crypto.randomUUID(),
    firstName: data.firstName,
    lastName: data.lastName,
    age: data.age,
  };
}
