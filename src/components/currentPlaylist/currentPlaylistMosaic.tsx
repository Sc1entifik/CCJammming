import { fetchPlaylistById } from "@/utils/commonFetches";
import { AuthHeader } from "@/utils/fetchInterfaces";
import SpotifyLogo from "../spotifyLogo/page";
import Image from "next/image";

const playlistImageStyle = {
	height: "11rem",
	width: "11rem",
	borderRadius: "5%",
}

export default async function CurrentPlaylistMosaic({ playlistId, authHeader }: { playlistId: string, authHeader: AuthHeader }) {
	const currentPlaylist = await fetchPlaylistById(playlistId, authHeader);

	return (
		<div>
			<SpotifyLogo remSize={12}/>
			<h2 className="text-4xl">{currentPlaylist.name}</h2>
			{currentPlaylist.images && <Image priority={true} alt="Mosaic of playlist album images" src={currentPlaylist.images[0].url} height={5000} width={5000} style={playlistImageStyle} />}
			<p className="mt-4 tracking-wide text-textColor">Scroll To See All Songs</p>
			<p className="tracking-wide text-textColor">Click Track To Remove From Playlist</p>
			<p className="tracking-wide text-textColor">Click Spotify Tag To Play On Spotify</p>
		</div>

	);
}
