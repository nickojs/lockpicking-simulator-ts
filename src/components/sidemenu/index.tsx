import React from 'react';
import * as S from './styles';
import Hint from '../../components/hint';
import { MenuArray, MenuItem } from '../../containers/Auth';

interface SideMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
  items: MenuArray;
}

export default ({ items, index, ...props }: SideMenuProps) => (
  <S.Container {...props}>
    <Hint>
      Use the WASD keys (or arrows) to control the menu
      {' '}
      <br />
      Press D (or left arrow) to open the selected menu
    </Hint>
    <S.SideMenu>
      <S.SideItems>
        {items.map((item: MenuItem) => (
          <S.Item
            key={item.id}
            active={index === item.id ? 1 : 0}
          >
            {item.name}
          </S.Item>
        ))}
      </S.SideItems>
    </S.SideMenu>
  </S.Container>
);
