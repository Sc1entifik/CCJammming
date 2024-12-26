import { fetchArtistTopTracks } from "@/utils/commonFetches";
import { cookies } from "next/headers";

import AlbumNameAndCover from "./albumNameAndCover";
import { keySetter, parseAuthHeaderFromCookieStore } from "@/utils/helper";

interface Track {
	name: string
	album: {
		name: string
		images: {
			url: string
			height: number
			width: number
		}[]
	}
}


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
	const songGrid = tracks.map((x: Track) => [<AlbumNameAndCover key={setUniqueKey()} album={x.album} albumCoverSize={90} />, <p key={setUniqueKey()} className={"text-textColor max-w-32"}>{x.name}</p>, <p key={setUniqueKey()} className="text-textColor">+</p>]);

	return (
		<div className="font-tropiLand grid grid-cols-3 items-center justify-items-start gap-10 mt-6 tracking-widest">
			<h3>Album</h3>
			<h3>Track Title</h3>
			<h3>Add Track To PLaylist</h3>
			{songGrid}
		</div>
	);	
}
