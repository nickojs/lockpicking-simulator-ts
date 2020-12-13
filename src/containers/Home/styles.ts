import styled, { css } from 'styled-components';
import backgrund from '../../assets/image/home.jpg';
import { Container as C } from '../../generalStyles';

interface StyledProps {
  isMenuOpen: boolean;
}

const blur = css`
  filter: blur(10px);
`;

export const Container = styled(C)`
  justify-content: flex-start;
  flex-direction: column;
  text-align: center;
  
  transition: filter .5s ease-out;
  ${({ isMenuOpen }: StyledProps) => (isMenuOpen ? blur : null)}
  
  color: white;
  background-image: url(${backgrund});
`;
