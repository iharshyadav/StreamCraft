import { onAuthenticateUser } from '@/actions/user'
import { redirect } from 'next/navigation'
import { FC } from 'react'

interface pageProps {
  
}

const page: FC<pageProps> = async ({}) => {

  const auth = await onAuthenticateUser()
  // console.log(auth)
  // console.log(auth.user?.workspace)
  if (auth.status === 200 || auth.status === 201)
    return redirect(`/dashboard/${auth.user?.workspace[0].id}`)

  if (auth.status === 400 || auth.status === 500 || auth.status === 404) {
    return redirect('/auth/sign-in')
  }

  return <div>page</div>
}

export default page