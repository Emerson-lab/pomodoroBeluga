import {ButtonContainer, ButtonVariant} from './Button.styles'

interface ButtonProps {
  variant: ButtonVariant;
}

export default function Button({variant = 'primary'}: Partial<ButtonProps>) {
  return (
    <ButtonContainer variant={variant}>button</ButtonContainer>
  )
}