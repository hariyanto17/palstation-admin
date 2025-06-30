import { ButtonHTMLAttributes } from 'react'

const Button = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="btn-primary w-full rounded-lg text-lg font-semibold transition-transform duration-200"
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
