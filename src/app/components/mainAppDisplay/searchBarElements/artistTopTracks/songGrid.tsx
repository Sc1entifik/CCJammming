import { fetchArtistTopTracks } from "@/utils/commonFetches";
import { cookies } from "next/headers";

import { keySetter, parseAuthHeaderFromCookieStore } from "@/utils/helper";
import AlbumNameAndCover from "../commonElements/albumNameAndCover";
import AddTracksToPlaylist from "../commonElements/addTracksToPlaylist";
import TrackUriButton from "../commonElements/trackUriButton";
import { Track } from "@/utils/fetchInterfaces";


const albumCoverSize = 4.4;


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
		.map((x: Track) => { 

			return [
			<AddTracksToPlaylist key={setUniqueKey()} trackUris={[x.uri]}><AlbumNameAndCover album={x.album} albumCoverSize={albumCoverSize} /></AddTracksToPlaylist>, <AddTracksToPlaylist key={setUniqueKey()} trackUris={[x.uri]}><p className={"text-textColor max-w-32"}>{x.name}</p></AddTracksToPlaylist>, <TrackUriButton key={setUniqueKey()} trackUri={x.uri} />]})
		.map(x => <div key={setUniqueKey()} className="grid grid-cols-subgrid col-span-4 max-h-[28rem] gap-10 my-6 items-center justify-items-start snap-start">{x}</div>);

	return (
		<div className="font-tropiLand grid grid-cols-4 my-5 items-center justify-items-start tracking-widest">
			<h3>Album</h3>
			<h3>Track Title</h3>
			<h3>Click For Play Sample</h3>
			<div className="grid grid-cols-subgrid col-span-4 max-h-[49dvh] overflow-y-auto no-scrollbar snap-y snap-mandatory">
				{songGrid}
			</div>
		</div>
	);	
}
