import {FC, HTMLProps, SVGProps} from 'react'
import classNames from 'classnames'

import styles from './Arrow.module.scss'

export interface ArrowProps extends SVGProps<SVGSVGElement> {
}

export const Arrow: FC<ArrowProps> = ({className, ...otherProps}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      viewBox="0 0 413.495 413.495"
      xmlSpace="preserve"
      {...otherProps}
    >
      <path
        d="M228.104,407.264c-1.231,3.808-4.763,6.231-8.561,6.231c-0.918,0-1.852-0.142-2.772-0.439  c-7.964-2.577-12.086-2.576-20.047,0c-4.728,1.531-9.803-1.063-11.333-5.792s1.063-9.803,5.792-11.333  c11.492-3.718,19.639-3.718,31.129,0C227.042,397.46,229.634,402.534,228.104,407.264z M354.232,295.334  c-8.704,12.608-23.818,20.134-40.433,20.134c-14.475,0-30.656-7.4-47.788-15.235c-19.447-8.894-39.558-18.09-59.264-18.214  c-19.706,0.124-39.816,9.32-59.264,18.214c-17.131,7.834-33.313,15.235-47.787,15.235c-16.616,0-31.73-7.526-40.432-20.134  c-16.52-23.935-3.796-50.982,7.43-74.846c0,0,58.027-118.688,61.089-125.108c23.779-49.863,38.754-78.358,49.768-86.131  C186.13,3.198,196.226,0,206.747,0c10.522,0,20.617,3.198,29.195,9.248c11.017,7.774,25.992,36.271,49.772,86.138  c3.062,6.418,61.089,125.107,61.089,125.107C358.027,244.355,370.749,271.401,354.232,295.334z M330.515,228.155  c0,0-37.982-78.29-53.27-108.899c-2.003-4.012-4.68-9.624-7.778-16.122c-10.366-21.738-34.643-72.644-43.902-79.179  C220.042,20.06,213.534,18,206.747,18c-6.786,0-13.293,2.06-18.817,5.957c-9.258,6.533-33.533,57.435-43.898,79.171  c-3.1,6.5-61.049,125.022-61.049,125.022c-10.05,21.365-19.543,41.544-8.904,56.959c5.341,7.738,14.918,12.358,25.618,12.358  c10.553,0,25.002-6.608,40.3-13.604c20.207-9.241,43.109-19.715,66.701-19.845c0.017,0,0.033,0,0.049,0s0.033,0,0.049,0  c23.592,0.129,46.494,10.604,66.701,19.845c15.298,6.996,29.748,13.604,40.302,13.604c10.699,0,20.276-4.62,25.619-12.359  C350.054,269.697,340.564,249.518,330.515,228.155z M278.084,362.067c-2.924,7.313-8.648,13.112-15.706,15.909  c-3.161,1.253-6.453,1.877-9.738,1.877c-3.799,0-7.59-0.834-11.162-2.498c-29.214-13.655-40.245-13.655-69.448-0.006  c-6.674,3.105-14.096,3.328-20.912,0.626c-7.057-2.796-12.783-8.596-15.709-15.91c-5.809-14.521,0.591-31.516,14.266-37.883  c44.266-20.691,69.872-20.694,114.147,0C277.496,330.553,283.894,347.547,278.084,362.067z M256.222,340.501  c-0.004-0.001-0.009-0.003-0.013-0.005c-39.291-18.367-59.632-18.367-98.925,0c-5.086,2.368-7.445,9.182-5.163,14.885  c1.113,2.783,3.112,4.865,5.627,5.862c1.535,0.608,3.938,1.066,6.671-0.205c17.006-7.949,29.666-11.924,42.325-11.924  c12.663,0,25.325,3.976,42.341,11.93c2.722,1.267,5.124,0.807,6.659,0.199c2.516-0.997,4.513-3.078,5.626-5.86  C263.654,349.677,261.296,342.864,256.222,340.501z"/>
    </svg>

  )
}

