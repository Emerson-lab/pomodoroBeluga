import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

export type ButtonSize = 'small' | 'medium' | 'large'

interface ButtonProps {
  variant: ButtonVariant;
  size: ButtonSize
}

const buttonSizes = {
  small: '100px',
  medium: '180px',
  large: '220px'
}

const buttonVariants = {
  primary: 'purple',
  secondary: 'orange',
  danger: 'red',
  success: 'green'
}

export const ButtonContainer = styled.button<ButtonProps>`
  ${props => {
    return css`
      width: 100px;
      background:  ${props => props.theme.primary};
      height: 60px;
      background: ${buttonVariants[props.variant]};
      width: ${buttonSizes[props.size]};
    `
  }}
`