import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import spotifyImg from "../public/spotify.png";

function Login({ providers }) {
  return (
    <div className="flex flex-col items-center bg-black justify-center min-h-screen w-full">
      <Image className="w-52 mb-5" src={spotifyImg} alt="spotify img" />
    
      {Object.values(providers).map((provider)=>(
        <div  key={provider.name}>
           <button className="bg-[#18d860] text-white p-5 rounded-full mr-3" 
           // callback is for when i am signed in i will be redirected to home page
            onClick={() => signIn(provider.id, { callbackUrl: "/" })} >
            
            Login with {provider.name}
            </button> 
        </div>
      ))}
    </div>
   
    
  );
}

export default Login;
// runs before the page renders
export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
        providers
    },
  };
}
