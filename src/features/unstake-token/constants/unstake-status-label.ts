import { OperationStatus } from "../../../shared/types";

export const UNSTAKE_STATUS_LABELS: { [key in OperationStatus]: string } = {
  [OperationStatus.READY]: "Готов к выводу",
  [OperationStatus.STARTING]: "Начало вывода из стейкинга",
  [OperationStatus.AWAITING_CONFIRM]: "Ожидает подтверждения",
  [OperationStatus.AWAITING_BLOCK_MINING]: "Ожидает добычи блока в сети",
  [OperationStatus.SUCCESS]: "Вывод из стейкинга успешно завершен",
  [OperationStatus.ERROR]: "Во время вывода произошла ошибка",
};
