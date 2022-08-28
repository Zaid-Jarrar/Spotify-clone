import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/Sidebar'
import Center from '../components/Center'
import { getSession, GetSessionParams } from 'next-auth/react'


const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotify</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main className="flex">
        <Sidebar/>
        <Center/>

      </main>
      <div>  player </div>
    </div>
  )
}

export default Home

// pre-render the user on the server which will give us the access key before we hit the client
// this is used to solved the bug of having no pic when refreshing the page
export async function getServerSideProps(context: GetSessionParams | undefined){
  const session = await getSession(context);
  return {
    props:{
      session,
    }
  }

}