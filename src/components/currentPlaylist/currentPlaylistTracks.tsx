import { fetchPlaylistItemsById } from "@/utils/commonFetches";
import { AuthHeader, PlaylistTrackObject } from "@/utils/fetchInterfaces";
import MusicSubGrid from "./musicSubGrid";
import PodcastSubgrid from "./podcastSubgrid";

export default async function CurrentPlaylistTracks({ searchTerm, searchTermType, urlBase, playlistId, authHeader}: { searchTerm: string, searchTermType: string, urlBase: string, playlistId: string, authHeader: AuthHeader }) {
	const currentPlaylistItems = await fetchPlaylistItemsById(playlistId, authHeader);
	const currentPlaylistTracks = currentPlaylistItems
	.map((x: PlaylistTrackObject, y: number) => {
		if ("album" in x.track) return <MusicSubGrid key={y} playlistTrack={x.track} urlBase={urlBase} searchTerm={searchTerm} searchTermType={searchTermType}/>
		
		return <PodcastSubgrid key={y} playlistTrack={x.track} urlBase={urlBase} searchTerm={searchTerm} searchTermType={searchTermType}/>
	});

	return (
		<div className="grid grid-cols-3 lg:max-w-116 max-w-[20rem] lg:gap-5 justify-items-start">
			<h3 className="text-alternativeColor text-lg text-left">Album Image</h3>
			<h3 className="text-alternativeColor text-lg text-left">Track Name</h3>
			<h3 className="text-alternativeColor text-lg text-left">Artists</h3>
			<div className="text-textColor grid grid-cols-subgrid col-span-3 max-h-[80dvh] overflow-y-auto no-scrollbar gap-y-10 snap-y snap-mandatory">
					{currentPlaylistTracks}
			</div>
		</div>
	);
}
