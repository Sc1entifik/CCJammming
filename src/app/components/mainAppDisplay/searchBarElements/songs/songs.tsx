import { fetchTracksByName } from "@/utils/commonFetches";
import SpotifyTracks from "./spotifyTracks";
import { parseAuthHeaderFromCookieStore } from "@/utils/helper";
import { cookies } from "next/headers";

const albumCoverSize = 5.6;

export default async function Songs({songName}: {songName: string}) {
	const accessHeader = parseAuthHeaderFromCookieStore(await cookies());
	const songFetch = await fetchTracksByName(songName, accessHeader);

	return (
		<div className="flex flex-col items-center font-tropiLand gap-4 max-h-[84dvh]">
			<h3 className="font-tropiLand text-textColor tracking-widest">Scroll To See All Songs</h3>
			<h3 className="font-tropiLand text-textColor tracking-widest">Click Song To Add To Playlist</h3>
			<SpotifyTracks tracks={songFetch} albumCoverSize={albumCoverSize} />
		</div>
	);
}
