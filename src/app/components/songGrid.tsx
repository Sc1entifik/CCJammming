import { fetchArtistTopTracks } from "@/utils/commonFetches";
import { cookies } from "next/headers";

import AlbumNameAndCover from "./albumNameAndCover";
import { keySetter, parseAuthHeaderFromCookieStore } from "@/utils/helper";
import AddTracksToPlaylist from "./addTracksToPlaylist";
import { Track } from "@/utils/fetchInterfaces";


const albumCoverSize = 70;


export default async function SongGrid({queryTerm, gridType}: {queryTerm: string, gridType: string}) {
	let tracks;
	const cookieStore = await cookies();
	const authHeader = parseAuthHeaderFromCookieStore(cookieStore);

	switch (gridType) {
		case "artist top tracks":
		tracks = await fetchArtistTopTracks(queryTerm, authHeader);
		break;
	}

	const setUniqueKey = keySetter();
	const songGrid = tracks
		.map((x: Track) => 
		[
			<AlbumNameAndCover key={setUniqueKey()} album={x.album} albumCoverSize={albumCoverSize} />, <p key={setUniqueKey()} className={"text-textColor max-w-32"}>{x.name}</p>, <AddTracksToPlaylist key={setUniqueKey()} trackUris={[x.uri]}><p>Add Track To Playlist</p></AddTracksToPlaylist>
		])
		.map(x => <div key={setUniqueKey()} className="grid grid-cols-subgrid col-span-3 max-h-[28rem] gap-10 my-6 items-center justify-items-start snap-start scroll-mt-4">{x}</div>);

	return (
		<div className="font-tropiLand grid grid-cols-3 my-5 items-center justify-items-start tracking-widest h-[29rem]">
			<h3>Album</h3>
			<h3>Track Title</h3>
			<h3>Add Track To PLaylist</h3>
			<div className="grid grid-cols-subgrid col-span-3 max-h-[28rem] overflow-auto no-scrollbar snap-y snap-mandatory">
				{songGrid}
			</div>
		</div>
	);	
}
