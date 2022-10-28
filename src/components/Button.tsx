import { ButtonHTMLAttributes } from 'react'
import { ButtonContainer, ButtonSize, ButtonVariant } from './Button.styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant
  size: ButtonSize
}

export default function Button({
  variant = 'primary',
  size = 'small',
  ...props
}: Partial<ButtonProps>) {
  return (
    <ButtonContainer variant={variant} size={size} {...props}>
      button
    </ButtonContainer>
  )
}
