import tw from "@/shared/utills/tw"
import { cva } from "class-variance-authority"
import { Ref } from "react"


interface Props{
  placeholder: string,
  ref?: Ref<HTMLInputElement | null>
  size?: 'default' | 'lg'
  className?: string
  onChange?: () => void
}

export const InputClass = cva(
  `px-4 py-1 rounded-lg w-80 bg-white text-primary outline-none placeholder:text-gray-dark`,
  {
    variants: {
      size: {
        default: 'h-10',
        lg:'h-13'
      }
    },
    defaultVariants: {
      size:'default'
    }
  }
)

function Input({placeholder,ref,size,className,onChange,...rest}: Props) {

  return (
    <input
      type="text"
      className={tw(InputClass({ size, className }))}
      placeholder={placeholder}
      ref={ref}
      onChange={onChange}
      {...rest}
    />
  )
}
export default Input