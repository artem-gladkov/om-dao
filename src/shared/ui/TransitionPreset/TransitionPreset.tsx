import { Fragment } from "react"
import { Transition } from "@headlessui/react"

import type { TransitionClasses } from "@headlessui/react"
import type { FC, ReactNode } from "react"
import { isObject } from "../../lib"

type TTransitionsNames = "fade" | "fromRight"
type TTransitionDuration =
  | number
  | {
      enter: number
      leave: number
    }

export interface ITransitionsProps {
  transitionName: TTransitionsNames
  children: ReactNode
  isChild?: boolean
  show?: boolean
  unmount?: boolean
  className?: string
  appear?: boolean
  duration?: TTransitionDuration
}

const BASE_TRANSITION_CLASSES = {
  fade: {
    enter: "transition-opacity duration-300",
    enterFrom: "opacity-0",
    enterTo: "opacity-100",
    leave: "transition-opacity duration-300",
    leaveFrom: "opacity-100",
    leaveTo: "opacity-0",
  },
  fromRight: {
    enter: "transition-transform duration-300",
    enterFrom: "translate-x-full",
    enterTo: "translate-x-0",
    leave: "transition-transform duration-300",
    leaveFrom: "translate-x-0",
    leaveTo: "translate-x-full",
  },
}
const getTransitionClasses = (
  name: TTransitionsNames,
  duration?: TTransitionDuration,
): TransitionClasses => {
  const transitionClasses = BASE_TRANSITION_CLASSES[name]
  const regExp = /(duration-)[0-9]*/

  if (typeof duration === "number") {
    transitionClasses.enter = transitionClasses.enter.replace(
      regExp,
      `$1${duration}`,
    )
    transitionClasses.leave = transitionClasses.leave.replace(
      regExp,
      `$1${duration}`,
    )
  }

  if (isObject(duration) && typeof duration === "object") {
    if (duration.enter) {
      transitionClasses.enter = transitionClasses.enter.replace(
        regExp,
        `$1${duration.enter}`,
      )
    }
    if (duration.leave) {
      transitionClasses.leave = transitionClasses.leave.replace(
        regExp,
        `$1${duration.leave}`,
      )
    }
  }

  return transitionClasses
}

export const TransitionPreset: FC<ITransitionsProps> = ({
  transitionName,
  isChild,
  children,
  show,
  duration,
  ...otherProps
}) => {
  const baseProps = {
    ...getTransitionClasses(transitionName, duration),
    ...otherProps,
  }

  if (isChild) {
    return (
      <Transition.Child as={Fragment} {...baseProps}>
        {children}
      </Transition.Child>
    )
  }

  return (
    <Transition as={Fragment} show={show} {...baseProps}>
      {children}
    </Transition>
  )
}
