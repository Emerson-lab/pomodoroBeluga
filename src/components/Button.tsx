import { ButtonHTMLAttributes } from 'react';
import { ButtonContainer, ButtonVariant } from './Button.styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
}

export default function Button({ variant = 'primary', ...props }: Partial<ButtonProps>) {
  return (
    <ButtonContainer
      variant={variant}
      {...props}
    >
      button
    </ButtonContainer>
  )
}