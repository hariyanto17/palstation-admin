import { ButtonHTMLAttributes } from 'react'

const Button = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="rounded-md border border-none bg-purple-600 p-1 text-white hover:cursor-pointer hover:bg-purple-500"
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
