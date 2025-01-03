import { fetchTracksByName } from "@/utils/commonFetches";
import SpotifyTracks from "./spotifyTracks";
import { parseAuthHeaderFromCookieStore } from "@/utils/helper";
import { cookies } from "next/headers";

export default async function Songs({songName}: {songName: string}) {
	const accessHeader = parseAuthHeaderFromCookieStore(await cookies());
	const songFetch = await fetchTracksByName(songName, accessHeader);

	return (
	<div className="flex flex-col items-center font-tropiLand gap-4">
		<h3 className="font-bounce tracking-widest">Click Song To Add To Playlist</h3>
		<SpotifyTracks tracks={songFetch} albumCoverSize={90} />
	</div>
	)
}
