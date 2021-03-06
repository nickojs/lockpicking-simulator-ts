import React from 'react';
import * as S from './styles';

const Dialog: React.FC = ({ children }) => (
  <S.OptionsContainer>
    <S.OptionsInner>
      {children}
    </S.OptionsInner>
  </S.OptionsContainer>
);

export default Dialog;
