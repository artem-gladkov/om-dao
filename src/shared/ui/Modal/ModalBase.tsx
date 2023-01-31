import { Dialog } from "@headlessui/react";
import React, {
  ComponentType,
  FC,
  HTMLProps,
  ReactNode,
  useCallback,
} from "react";
import { TCSSValue, TSizePreset } from "../../types";
import { TransitionPreset } from "../TransitionPreset";

const MODAL_WIDTH: Record<TSizePreset, TCSSValue> = {
  small: "320px",
  medium: "640px",
  large: "920px",
};

interface CustomBaseModalProps {
  /**
   * Указывает, нужно ли использовать затемнение вокруг модального окна.
   * Важно: свойство НЕ отвечает за закрытие модального окна по клику вне его зоны.
   * @default false
   */
  useMask?: boolean;
  /**
   * Отвечает за отображение крестика закрытия в углу модального окна
   * Важно: свойство НЕ отвечает за закрытие модального окна по клику вне его зоны.
   * @default false
   */
  closable?: boolean;
  /**
   * Свойство для создания шапки модального окна.
   * В случае передачи строки обернет ее в h1 тег и будет использован как title
   */
  header?: ReactNode;
  /**
   * Частично стилезованная нижняя часть модального окна.
   * Обычно используется для передачи кнопок
   */
  footer?: ReactNode;
  /**
   * Отвечает за указание ширины модального окна.
   * Принимает как кастомные значения в виде строки ("10%", "10px" и т.д),
   * так и стандартизированные значения с фиксированной шириной (large, medium, small)
   */
  width?: TCSSValue | TSizePreset;
  useOutsideClick?: boolean;
}

export type ExtractProps<T> = T extends ComponentType<infer P> ? P : T;

export type TModalBaseProps = ExtractProps<typeof Dialog> &
  CustomBaseModalProps;

export const ModalBase: FC<TModalBaseProps> = ({
  children,
  onClose,
  header,
  footer,
  closable,
  useMask,
  width = "large",
  open,
  unmount,
  zIndex,
  useOutsideClick,
  ...otherProps
}) => {
  const handleClose = useCallback(() => {
    onClose(false);
  }, [onClose]);

  const isTitle = typeof header === "string";
  //@ts-ignore
  const modalWidth = width in MODAL_WIDTH ? MODAL_WIDTH[width] : width;

  const WrapperComponent = useOutsideClick ? Dialog.Panel : Div;

  return (
    <TransitionPreset transitionName="fade" show={open} unmount={unmount}>
      <Dialog onClose={handleClose} {...otherProps}>
        {useMask && (
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        )}
        <div className="fixed inset-0 grid grid-cols-1 items-center justify-items-center overflow-y-auto p-4 z-10">
          <WrapperComponent
            className="relative grid h-max w-full grid-cols-1 bg-black/75 shadow-dialog"
            style={{ maxWidth: modalWidth }}
          >
            <>
              {closable && (
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 z-10 text-gray-400"
                >
                  X
                </button>
              )}
              {header && (
                <Dialog.Title>
                  <div className="w-full">
                    {isTitle ? (
                      <h1 className="p-4 text-3xl font-bold text-neutral-800">
                        {header}
                      </h1>
                    ) : (
                      header
                    )}
                  </div>
                </Dialog.Title>
              )}
              {children}
              {footer && <div className="w-full bg-gray-100">{footer}</div>}
            </>
          </WrapperComponent>
        </div>
      </Dialog>
    </TransitionPreset>
  );
};

export interface IDivProps extends HTMLProps<HTMLDivElement> {}
const Div: FC<IDivProps> = ({ children, ...otherProps }) => {
  return <div {...otherProps}>{children}</div>;
};
