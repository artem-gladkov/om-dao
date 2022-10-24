import {SwapStatus} from "../types";

export const SWAP_STATUS_LABELS: {[key in SwapStatus]: string} = {
  [SwapStatus.READY]: 'Готов к обмену',
  [SwapStatus.STARTING]: 'Начало обмена',
  [SwapStatus.AWAITING_CONFIRM]: 'Ожидает подтверждения',
  [SwapStatus.AWAITING_BLOCK_MINING]: 'Ожидает добычи блока в сети',
  [SwapStatus.SUCCESS]: 'Обмен успешно завершен',
  [SwapStatus.ERROR]: 'Во время обмена произошла ошибка',
}
