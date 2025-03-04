import useFetch from "../hooks/useFetch";
import SpotifyTracks from "./spotifyTracks";

const albumCoverSize = 5.6;

export default function Songs({songName}: {songName: string}) {
	const songFetch = useFetch(songName);

	return (
		<div className="flex flex-col items-center font-tropiLand gap-4 max-h-[80dvh]">
			<h3 className="font-bounce tracking-widest">Click Song To Add To Playlist</h3>
			{songFetch && <SpotifyTracks albumCoverSize={albumCoverSize} tracks={songFetch}/>}
		</div>
	);
}
