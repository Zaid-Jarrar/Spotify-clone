import { useRecoilState } from "recoil"
import useSpotify from "../hooks/useSpotify"
import {currentTrackIdState,isPlayingState} from "../atoms/songAtom"
import {millisToMinutesAndSeconds} from "../lib/time"


function Song({order,track}) {
   const spotifyApi = useSpotify()
   const [currentTrackId,setCurrentTrackId] = useRecoilState(currentTrackIdState) 
   const [isPlaying,setIsPlaying] = useRecoilState(isPlayingState)
    
   const playSong = async () => {
    setCurrentTrackId(track.track.id)
    console.log(track)
    console.log(track.track.uri)
    setIsPlaying(true)
    spotifyApi.play ({
        uris:[track.track.uri],

    }).catch((err)=>{
        alert("play spotify app and run a song then you are allowed to change from here")
        console.log(err,"spotify app must run first in the background")
    })

   }

   return (
    <div className=" cursor-pointer grid grid-cols-2 gap-right gap-4 py-4 px-5 rounded-lg
     hover:bg-gray-900 text-gray-500" 
     onClick={playSong}>
        <div className="flex items-center space-x-4 ">
            <p>{order+1}</p>
            <img className="h-10 w-10" src={track.track?.album?.images?.[0].url} alt="track image" />
            <div>
                <p className="w-36 lg:w-64 text-white truncate" >{track.track?.name}</p>
                <p className="w-40" > {track.track?.artists[0].name} </p>
            </div>
        </div>
        <div className="flex items-center  justify-between ml-auto md:ml-0   "> 
            <p className="hidden md:inline w-40" > {track.track?.album.name} </p>
            <p> {millisToMinutesAndSeconds(track.track?.duration_ms)}</p>
        </div>
    </div>
  )
}

export default Song