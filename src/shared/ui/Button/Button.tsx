import {ButtonHTMLAttributes, FC} from 'react'
import classNames from 'classnames'

import styles from './Button.module.scss'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  full?: boolean
}

export const Button: FC<ButtonProps> = ({className,full, children, ...otherProps}) => {
  return (
    <button className={classNames(styles.button, {[styles.full]: !!full}, className)} {...otherProps}>
      {children}
    </button>
  )
}

