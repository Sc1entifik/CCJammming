import { fetchPlaylistItemsById } from "@/utils/commonFetches";
import { AuthHeader, PlaylistTrackObject } from "@/utils/fetchInterfaces";
import MusicSubGrid from "./musicSubGrid";
import PodcastSubgrid from "./podcastSubgrid";
import { Suspense } from "react";

export default async function CurrentPlaylistTracks({ searchTerm, searchTermType, urlBase, playlistId, authHeader}: { searchTerm: string, searchTermType: string, urlBase: string, playlistId: string, authHeader: AuthHeader }) {
	const currentPlaylistItems = await fetchPlaylistItemsById(playlistId, authHeader);
	const currentPlaylistTracks = currentPlaylistItems
	.map((x: PlaylistTrackObject, y: number) => {
		if ("album" in x.track) return <MusicSubGrid key={y} playlistTrack={x.track} urlBase={urlBase} searchTerm={searchTerm} searchTermType={searchTermType}/>
		
		return <PodcastSubgrid key={y} playlistTrack={x.track} urlBase={urlBase} searchTerm={searchTerm} searchTermType={searchTermType}/>
	});

	return (
		<div className="grid grid-cols-3 lg:max-w-116 max-w-[20rem] lg:gap-5 items-center justify-items-start my-5">
			<p>AlbumImage</p>
			<p>Track Name</p>
			<p>Artists</p>
			<div className="text-textColor grid grid-cols-subgrid col-span-3 max-h-[66dvh] overflow-y-auto no-scrollbar gap-5 items-center justify-items-start snap-y snap-mandatory">
					{currentPlaylistTracks}
			</div>
		</div>
	);
}
