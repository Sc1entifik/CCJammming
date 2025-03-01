//import SpotifyTracks from "./spotifyTracks";
import useFetch from "../hooks/useFetch";
import { fetchTracksByName } from "@/utils/commonFetches";

//const albumCoverSize = 5.6;

export default function Songs({songName}: {songName: string}) {
	const songFetch = useFetch(fetchTracksByName, songName);

	return (
		<div className="flex flex-col items-center font-tropiLand gap-4">
			<h3 className="font-bounce tracking-widest">Click Song To Add To Playlist</h3>
			<p>WTF</p>
		</div>
	);
}
