'use client'

/** Component */
import { Flex, Nav, NavContainer } from '@/components/ui/layout'
import { NavItem } from '../ui/typography'
import Image from 'next/image'
import Link from 'next/link'

const Navigation = () => {
  return (
    <Nav>
      <NavContainer justifyConent='flex-end' alignItems='center'>
        <Flex>
          <NavItem type='link'>Placeholder</NavItem>
          <NavItem type='link'>Placeholder</NavItem>
          <NavItem type='link'>Placeholder</NavItem>
        </Flex>
        <Link href='/'>
          <Image src='/stock.png' width={36} height={36} alt='profile' />
        </Link>
      </NavContainer>
    </Nav>
  )
}

export default Navigation