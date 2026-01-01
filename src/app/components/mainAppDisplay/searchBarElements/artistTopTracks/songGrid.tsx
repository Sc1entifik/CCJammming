import { fetchArtistTopTracks } from "@/utils/commonFetches";
import { cookies } from "next/headers";

import { parseAuthHeaderFromCookieStore } from "@/utils/helper";
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

	const songGrid = tracks
		.map((x: Track, y: number) => { 

			return [
				<div key={y}>
					<AddTracksToPlaylist trackUris={[x.uri]}><AlbumNameAndCover album={x.album} albumCoverSize={albumCoverSize} /></AddTracksToPlaylist>
					<Link href={x.external_urls.spotify} target="_blank">
						<SpotifyLogo remSize={6}/>
					</Link>
				</div>, 
				<AddTracksToPlaylist key={y} trackUris={[x.uri]}><p className="text-textColor max-w-32 text-left">{x.name}</p></AddTracksToPlaylist>, 
				<TrackUriButton key={y} trackUri={x.uri} />
			]})
			.reduce((x, y) => x.concat(y))
			.map( (x, y) => <div key={y} className="snap-start">{x}</div>);

	return (
		<div className="font-tropiLand grid grid-cols-3 gap-y-5 tracking-widest justify-items-start">
			<h3 className="text-alternativeColor text-lg text-left">Album</h3>
			<h3 className="text-alternativeColor text-lg text-left">Track Title</h3>
			<h3 className="text-alternativeColor text-lg text-left">Click For Play Sample</h3>
			<div className="grid grid-cols-subgrid col-span-3 max-h-[73dvh] gap-y-12 overflow-y-auto no-scrollbar snap-y snap-mandatory">
				{ songGrid }
			</div>
		</div>
	);	
}
