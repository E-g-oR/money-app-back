enum OperationType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export class CreateOperationDto {
  accountId: number;
  value: number;
  type: OperationType;
  title: string;
  description?: string;
}
