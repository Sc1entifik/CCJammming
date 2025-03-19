import { fetchPlaylistById, fetchPlaylistItemsById } from "@/utils/commonFetches";
import { parseAuthHeaderFromCookieStore } from "@/utils/helper";
import { cookies } from "next/headers";
import PlaylistNameAndDescription from "./playlistNameAndDescription";
import SetCurrentPlaylistMessage from "./setCurrentPlaylistMessage";
import PlaylistReorder from "./playlistReorder/playlistReorder";

export default async function PlaylistUpdate() {
	const cookieStore = await cookies();
	const authHeader = parseAuthHeaderFromCookieStore(cookieStore);

	if (!cookieStore.has("currentPlaylist")) {
		return <SetCurrentPlaylistMessage />
	}

	const currentPlaylistId = cookieStore.get("currentPlaylist")?.value;
	const currentPlaylist = await fetchPlaylistById(currentPlaylistId, authHeader);
	const currentPlaylistTracks = await fetchPlaylistItemsById(currentPlaylistId, authHeader);
	
	return (
		<div className="flex flex-col items-center">
			<PlaylistNameAndDescription currentPlaylist={currentPlaylist}/>
			<h2 className="font-tropiLand mt-6 tracking-wide">Drag Tracks Around To Change Playorder</h2>
			<h2 className="font-tropiLand mb-6 tracking-wide">Click Button To Update Playlist</h2>
			<PlaylistReorder playlistTracks={currentPlaylistTracks}/>
		</div>
		)
	
}
