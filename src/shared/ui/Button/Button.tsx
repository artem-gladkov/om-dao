import { ButtonHTMLAttributes, FC } from 'react'
import classNames from 'classnames'

import styles from './Button.module.scss'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{

}

export const Button: FC<ButtonProps> = ({className, children, ...otherProps}) => {
    return (
        <button className={classNames(styles.button, className)} {...otherProps}>
            {children}
        </button>
    )
}

