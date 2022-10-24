import { OperationStatus } from "../types";

export const STAKE_STATUS_LABELS: {[key in OperationStatus]: string} = {
  [OperationStatus.READY]: 'Готов к стейкингу',
  [OperationStatus.STARTING]: 'Начало стейкинга',
  [OperationStatus.AWAITING_CONFIRM]: 'Ожидает подтверждения',
  [OperationStatus.AWAITING_BLOCK_MINING]: 'Ожидает добычи блока в сети',
  [OperationStatus.SUCCESS]: 'Стейкинг успешно завершен',
  [OperationStatus.ERROR]: 'Во время стейкинга произошла ошибка',
}
