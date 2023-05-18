import { IDummyExpenses } from "../types/types";
import { newDate } from "./date";

export const DUMMY_EXPENSES: IDummyExpenses[] = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: newDate("2023-05-15"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.29,
    date: newDate("2023-05-14"),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 5.99,
    date: newDate("2023-05-13"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 14.99,
    date: newDate("2023-05-16"),
  },
  {
    id: "e5",
    description: "Another book",
    amount: 18.59,
    date: newDate("2023-05-17"),
  },
  {
    id: "e6",
    description: "A pair of trousers",
    amount: 89.29,
    date: newDate("2023-05-12"),
  },
  {
    id: "e7",
    description: "Some bananas",
    amount: 5.99,
    date: newDate("2023-05-11"),
  },
  {
    id: "e8",
    description: "A book",
    amount: 14.99,
    date: newDate("2023-05-10"),
  },
  {
    id: "e9",
    description: "Another book",
    amount: 18.59,
    date: newDate("2023-05-09"),
  },
];
