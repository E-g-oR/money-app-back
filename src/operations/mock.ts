import { Operation, OperationType } from "@prisma/client";
import * as A from "fp-ts/ReadonlyArray";

function getRandomNumberInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const titlesList = ["Еда", "Чифан", "Буфет", "Магазин"] as const;
const descriptionsList = [
  "Кола",
  "Чипсы, сок",
  "Булочка, сок, кола",
  "2 синнабона",
] as const;

const incomeDays = [21, 5, 14] as const;

const getMockOperation =
  (type: OperationType) =>
  (index: number): Operation => ({
    type,
    userId: 1,
    description: descriptionsList[getRandomNumberInRange(0, 3)],
    title: titlesList[getRandomNumberInRange(0, 3)],
    value:
      type === OperationType.EXPENSE
        ? getRandomNumberInRange(2, 100)
        : getRandomNumberInRange(50, 200),
    id: index,
    accountId: 4,
    created_at: new Date(
      2023,
      7,
      type === OperationType.EXPENSE
        ? (index + 1) * 2
        : incomeDays[getRandomNumberInRange(0, 2)],
    ),
    updated_at: new Date(
      2023,
      7,
      type === OperationType.EXPENSE
        ? (index + 1) * 2
        : incomeDays[getRandomNumberInRange(0, 2)],
    ),
  });

export const getMockOperations = (amount: number, type: OperationType) =>
  A.makeBy(amount, getMockOperation(type));

export const MOCKED_EXPENSES = getMockOperations(13, OperationType.EXPENSE);
export const MOCKED_INCOMES = getMockOperations(5, OperationType.INCOME);
