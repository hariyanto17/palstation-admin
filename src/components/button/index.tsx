import { ButtonHTMLAttributes } from 'react'

const Button = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="rounded-md border bg-[#ff43f9] p-1 text-white hover:cursor-pointer hover:bg-[#ff53fd]"
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
