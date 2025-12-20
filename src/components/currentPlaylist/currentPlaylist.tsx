import { cookies } from "next/headers";
import Image from "next/image";

import { fetchPlaylistById, fetchPlaylistItemsById } from "@/utils/commonFetches";
import { PlaylistTrackObject } from "@/utils/fetchInterfaces";
import { parseAuthHeaderFromCookieStore } from "@/utils/helper";
import SpotifyLogo from "../spotifyLogo/page";
import MusicSubGrid from "./musicSubGrid";
import PodcastSubgrid from "./podcastSubgrid";

const playlistImageStyle = {
	height: "11rem",
	width: "11rem",
	borderRadius: "5%",
};


export default async function CurrentPlaylist({ searchTerm="", searchTermType="", urlBase="" } : { searchTerm: string, searchTermType: string, urlBase: string }) {
	const cookieStore = await cookies();
	const playlistId = cookieStore.get("currentPlaylist")?.value as string;
	const authHeader = parseAuthHeaderFromCookieStore(cookieStore);
	const currentPlaylist = await fetchPlaylistById(playlistId, authHeader);
	const currentPlaylistItems = await fetchPlaylistItemsById(playlistId, authHeader);
	const playlistTracks = currentPlaylistItems
	.map((x: PlaylistTrackObject, y: number) => {
		if ("album" in x.track) {
			return <MusicSubGrid key={y} playlistTrack={x.track} urlBase={urlBase} searchTerm={searchTerm} searchTermType={searchTermType}/>

		} else {
			return <PodcastSubgrid key={y} playlistTrack={x.track} urlBase={urlBase} searchTerm={searchTerm} searchTermType={searchTermType}/>
		}
	});

	return (
		<div className="flex flex-col items-center font-tropiLand">
			<SpotifyLogo remSize={12}/>
			<h2 className="text-4xl">{currentPlaylist.name}</h2>
			{currentPlaylist.images && <Image priority={true} alt="Mosaic of playlist album images" src={currentPlaylist.images[0].url} height={5000} width={5000} style={playlistImageStyle}/>}
			<p className="mt-4 tracking-wide text-textColor">Scroll To See All Songs</p>
			<p className="tracking-wide text-textColor">Click Track To Remove From Playlist</p>
			<p className="tracking-wide text-textColor">Click Spotify Tag To Play On Spotify</p>
			<div className="grid grid-cols-3 lg:max-w-116 max-w-[20rem] lg:gap-5 items-center justify-items-start my-5">
				<p>Album Image</p>
				<p>Track Name</p>
				<p>Artists</p>
				<div className="text-textColor grid grid-cols-subgrid col-span-3 max-h-[40dvh] overflow-y-auto no-scrollbar gap-5 items-center justify-items-start snap-y snap-mandatory">
						{playlistTracks}
				</div>
			</div>
		</div>
	);
}
