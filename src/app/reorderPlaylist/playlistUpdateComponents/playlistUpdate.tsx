import { fetchPlaylistById, fetchPlaylistItemsById } from "@/utils/commonFetches";
import { parseAuthHeaderFromCookieStore } from "@/utils/helper";
import { cookies } from "next/headers";
import PlaylistNameAndDescription from "./playlistNameAndDescription";

export default async function PlaylistUpdate() {
	const cookieStore = await cookies();
	const authHeader = parseAuthHeaderFromCookieStore(cookieStore);
	const currentPlaylistId = cookieStore.get("currentPlaylist")?.value;
	const currentPlaylist = await fetchPlaylistById(currentPlaylistId, authHeader);
	const currentPlaylistTracks = await fetchPlaylistItemsById(currentPlaylistId, authHeader);
	
	return <PlaylistNameAndDescription currentPlaylist={currentPlaylist}/>;
	
}
