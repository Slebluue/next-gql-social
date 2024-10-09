'use client'

/** Dependency */
import { useEffect } from 'react'
import { useQuery, gql } from '@apollo/client' 
import styled from 'styled-components'

/** Components */
import { Card, Flex } from '@/components/ui/layout'
import { Header, SubHeader, Text } from '@/components/ui/typography'
import Image from 'next/image'
import Link from 'next/link'


interface User {
  id: string
  username: string
  name: string
  description: string
  birthday: string
  birthplace: string
  postCount: string
  friends: [Friend]
}
interface Friend {
  name: string
  id: string
  postCount: string
}
interface Post{
  createdAt: string
  content: string
  author: User
}
interface Props {
  title: string
  user: User
  posts: [Post]
}

const Profile = ({ user, posts, title }: Props) => {
  return (
    <Wrapper>
      <ProfileSection>
        <Link href={`/profile/${user?.id}`}>
          <Card flexDirection='column'>
            <Image src='/stock.png' width={100} height={100} alt='profile' style={{ marginBottom: '8px' }} />
            <Header type='link'>{user?.name}</Header>
            <Text bold>{user?.username}</Text>
            <Text>{user?.birthplace}</Text>
          </Card>
        </Link>
        <Card flexDirection='column'>
          <SubHeader>Friends</SubHeader>
          <Flex>
            {user?.friends?.map((f: Friend, i: number)=> {
              return (
                <Link href={`/profile/${f?.id}`} key={i} >
                  <Flex flexDirection='column' alignItems='center' style={{ marginRight: '8px' }}>
                    <Image src='/stock.png' width={25} height={25} alt='profile'  />
                    <Text type='link'>{f.name.split(' ')[0]}</Text>
                  </Flex>
                </Link>
              )
            })}
          </Flex>
        </Card>
      </ProfileSection>
      <PostSection>
        <Text bold>{title}</Text>
        <hr style={{marginBottom: '8px'}} />
        {posts?.map((p: Post, i: number) => {
          return (
            <Card key={i}>
              <Link href={`/profile/${p?.author?.id}`}>
                <Flex flexDirection='column' alignItems='center' justifyConent='center' style={{ marginRight: '16px', minWidth: '150px' }}>
                  <Image src='/stock.png' width={50} height={50} alt='profile' style={{ marginBottom: '8px' }} />
                  <SubHeader type='link' style={{ textAlign: 'center', marginBottom: 0 }}>{p?.author?.name}</SubHeader>
                </Flex>
              </Link>
              <Flex flexDirection='column'>
                <Text>{p?.content}</Text>
                <Text bold>{new Date(p?.createdAt).toLocaleDateString('en-US')}</Text>
              </Flex>
            </Card>
          )
        })}
      </PostSection>
    </Wrapper>
  )
}

const Wrapper = styled(Flex)`
  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
`
const ProfileSection = styled(Flex)`
  flex-direction: column;
  margin-right: 16px;
  min-width: 300px;

  @media screen and (max-width: 900px) {
    flex: 1;
    margin: 0;
  }
`
const PostSection = styled(Flex)`
  flex-direction: column;
  flex: 1;
`


const GET_CURRENT_USER = gql`
  query getCurrentUser {
    user: currentUser {
      id
      username
      name
      description
      birthday
      birthplace
      postCount
      friends {
        name
        id
        postCount
      }
    }
    recentPosts {
      createdAt
      content
      author {
        id
        name
      }
    }
  }
`
export const CurrentProfile = () => {
  const { data, loading, error } = useQuery(GET_CURRENT_USER)

  useEffect(() => {
    console.log(data, loading, error)
  }, [data, loading, error])

  if (loading) return null
  return (
    <Profile
      title='Recent Posts'
      user={data?.user}
      posts={data?.recentPosts}
    />
  )
}

const GET_USER = gql`
  query getUserQuery($userId: ID!) {
    user(id: $userId) {
      id
      username
      name
      description
      birthday
      birthplace
      postCount
      friends {
        name
        id
        postCount
      }
      posts {
        content
        createdAt
        author {
          id
          name
        }
      }
    }
  }
`
interface UserProfileProps {
  id: string
}
export const UserProfile = ({ id }: UserProfileProps) => {
  const { data, loading, error } = useQuery(GET_USER, { variables: { userId: id } })

  useEffect(() => {
    console.log(data, loading, error)
  }, [data, loading, error])

  if (loading) return null
  return (
    <Profile
      title={`${data?.user?.name.split(' ')[0]}'s Posts`}
      user={data?.user}
      posts={data?.user?.posts}
    />
  )
}

export default Profile