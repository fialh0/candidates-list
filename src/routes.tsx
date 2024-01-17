import { Candidates } from "@/pages/candidates";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Candidates />,
  },
]);
