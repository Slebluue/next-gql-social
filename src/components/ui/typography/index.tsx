'use client'

import styled, { css } from 'styled-components'

const hoverMixin = (type: string | undefined ) =>  css`
  ${type === 'link' && css`
    &:hover {
      cursor: pointer;
      color: #0a66e2;
    }
  `}
`
interface TextProps {
  bold?: boolean | undefined
  type?: string | undefined
}
const Header = styled.h2<TextProps>`
  font-size: 24px;
  ${({ type }) => hoverMixin(type)}
`
const SubHeader = styled.h4<TextProps>`
  font-size: 16px;
  margin-bottom: 8px;
  ${({ type }) => hoverMixin(type)}
`
const Text = styled.p<TextProps>`
  font-size: 12px;
  margin-bottom: 4px;
  font-weight: ${({ bold }) => bold && '600'};
  ${({ type }) => hoverMixin(type)}
`
const NavItem = styled(SubHeader)`
  margin-bottom: 0;
  margin-right: 16px;
`

export {
  Header,
  SubHeader,
  Text,
  NavItem
}