import { fetchArtistTopTracks } from "@/utils/commonFetches";
import { keySetter, parseAuthHeaderFromCookieStore } from "@/utils/helper";
import { cookies } from "next/headers";
import Image from "next/image";

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
	const songGrid = tracks.map((x: Track) => [<p key={setUniqueKey()} className="text-textColor col-span-1">{x.name}</p>, <Image className="col-span-1" key={setUniqueKey()} alt="album cover" src={x.album.images[0].url} width="60" height="60"/>, <p key={setUniqueKey()} className="text-textColor col-span-2">{x.album.name}</p>, <p key={setUniqueKey()} className="text-textColor col-span-1">+</p>]);

	return (
		<div className="font-tropiLand grid grid-cols-5 gap-5 mt-6 tracking-widest w-9/12">
			<h3 className="col-span-1">Track Title</h3>
			<h3 className="col-span-1">Album Art</h3>
			<h3 className="col-span-2">Album</h3>
			<h3 className="col-span-1">Add Track To PLaylist</h3>
			{songGrid}
		</div>
	);	
}
