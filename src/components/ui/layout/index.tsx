'use client'

import styled from 'styled-components'

const Container = styled.div`
  padding-top: 82px;
  padding-bottom: 32px;
  background-color: #f4f2ee;
  min-height: 100svh;
`
const PageContainer = styled.div`
  max-width: 1200px;
  margin: auto;
  margin-top: 32px;
  padding: 0 32px;
`
interface FlexProps {
  flexDirection?: string | undefined
  alignItems?: string | undefined
  justifyConent?: string | undefined
}
const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyConent }) => justifyConent};
`
const Card = styled(Flex)`
  border-radius: 0.8rem;
  background: #ffffff;
  padding: 16px;
  box-shadow: 0px 0px 0px 1px rgb(140 140 140/.2);
  margin: 0 0 8px;
  width:100%;
`
const Nav = styled.div`
  background: #FFFFFF;
  border-bottom: 1px solid rgb(140 140 140/.2);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  display: flex;
`
const NavContainer = styled(Flex)`
  min-width: 1200px;
  margin: auto;
  padding: 16px 32px;
`

export {
  Container,
  PageContainer,
  Flex,
  Card,
  Nav,
  NavContainer
}