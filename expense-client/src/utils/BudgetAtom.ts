import { atomWithStorage } from "jotai/utils";

interface Budget {
  uid: string;
  budget: number;
}

export const BudgetAtom = atomWithStorage<Budget>("budget", {
  uid: "",
  budget: 0,
});
