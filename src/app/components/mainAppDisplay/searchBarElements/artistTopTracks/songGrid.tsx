import { fetchArtistTopTracks } from "@/utils/commonFetches";
import { cookies } from "next/headers";

import { keySetter, parseAuthHeaderFromCookieStore } from "@/utils/helper";
import AlbumNameAndCover from "../commonElements/albumNameAndCover";
import AddTracksToPlaylist from "../commonElements/addTracksToPlaylist";
import TrackUriButton from "../commonElements/trackUriButton";
import { Track } from "@/utils/fetchInterfaces";
import Link from "next/link";
import SpotifyLogo from "@/components/spotifyLogo/page";


const albumCoverSize = 4.4;


export default async function SongGrid({ queryTerm }: { queryTerm: string }) {
	const cookieStore = await cookies();
	const authHeader = parseAuthHeaderFromCookieStore(cookieStore);
	const tracks = await fetchArtistTopTracks(queryTerm, authHeader) as Track[];

	const setUniqueKey = keySetter();
	const songGrid = tracks
		.map((x: Track) => { 

			return [
				<div key={setUniqueKey()}>
					<AddTracksToPlaylist trackUris={[x.uri]}><AlbumNameAndCover album={x.album} albumCoverSize={albumCoverSize} /></AddTracksToPlaylist>
					<Link href={x.external_urls.spotify} target="_blank">
						<SpotifyLogo remSize={6}/>
					</Link>
				</div>, 
				<AddTracksToPlaylist key={setUniqueKey()} trackUris={[x.uri]}><p className={"text-textColor max-w-32"}>{x.name}</p></AddTracksToPlaylist>, 
				<TrackUriButton key={setUniqueKey()} trackUri={x.uri} />
			]})
			.reduce((x, y) => x.concat(y))
			.map( x => <div key={setUniqueKey()} className="snap-start">{x}</div>);

	return (
		<div className="font-tropiLand grid grid-cols-3 my-5 tracking-widest">
			<h3>Album</h3>
			<h3>Track Title</h3>
			<h3>Click For Play Sample</h3>
			<div className="grid grid-cols-subgrid col-span-3 max-h-[73dvh] gap-12 justify-items-start items-center overflow-y-auto no-scrollbar snap-y snap-mandatory">
				{ songGrid }
			</div>
		</div>
	);	
}
