/** Component */
import { UserProfile } from '@/components/profile'

interface Query {
  id: string
}
interface Props {
  params: Query
}

const Page: React.FC<Props> = ({ params }) => <UserProfile id={params.id} />

export default Page