import Songs from "../components/Songs"

import { ChevronDownIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import {useState,useEffect} from "react"
import {shuffle} from "lodash"
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import { useRecoilValue,useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";

const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-pink-500",
    "from-purple-500",
]

function Center() {
  const spotifyApi = useSpotify()
  const { data: session } = useSession();
  const [color, setColor] = useState();
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist,setPlaylist] = useRecoilState(playlistState)

  useEffect(() => {
    setColor(shuffle(colors).pop())
    // color changes everytime i select a playlist playlistId
  },[playlistId])

  useEffect(()=>{
    spotifyApi.getPlaylist(playlistId).then((data)=>{
      setPlaylist(data.body)
    }).catch((err)=>{console.log("Something went wrong!! ",err)})
  },[spotifyApi,playlistId])

  // console.log(playlist)


  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
     
      <header className="absolute top-5 right-8">
        <div className={`flex items-center bg-gradient-to-b ${color} to-black space-x-3 
        opacity-90 hover:opacity-80 rounded-full cursor-pointer p-1 pr-2 text-white
        `} onClick={signOut}>
          <img
            className="rounded-full w-10 h-10"
            src={session?.user.image}
            alt="user image"
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section className= {`flex items-end h-80 space-x-7 bg-gradient-to-b ${color} to-black text-white p-8`} >
        
        <img className = " rounded-tr-3xl  h-44 w-44 shadow-2xl" src={playlist?.images?.[0]?.url} alt="playlist image" />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold" >{playlist?.name} </h1>
        </div>



      </section>
      <div>
          <Songs/>
        </div>
    </div>
  );
}

export default Center;
