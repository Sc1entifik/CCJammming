"use server";
import { cookies } from "next/headers";
import { fetchTracksByName } from "./commonFetches";
import { formattedErrorMessage, parseAuthHeaderFromCookieStore } from "./helper";
import SpotifyEndpoints from "./endpoints";


export const fetchSongList = async (songName: string) => {
	const cookieStore = await cookies();
	const authHeader = parseAuthHeaderFromCookieStore(cookieStore);
	const tracks = await fetchTracksByName(songName, authHeader);

	return tracks;
}; 


export const changePlaylistNameAndDescription = async(form: FormData) => {
	const cookieStore = await cookies();
	const authHeader = parseAuthHeaderFromCookieStore(cookieStore);
	const playlistId = cookieStore.get("currentPlaylist")?.value;
	const url = SpotifyEndpoints.PLAYLIST_URI + playlistId;
	const name = form.get("playlistName")?.valueOf() ? form.get("playlistName")?.valueOf() : "";
	const description = form.get("playlistDescription")?.valueOf() ? form.get("playlistDescription")?.valueOf() : "";
	const options = {
		method: "put",
		headers: {
			Authorization: authHeader.headers.Authorization,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({name, description}),
	};

	await fetch(url, options).catch(err => formattedErrorMessage("Change Playlist Name And Description Failed", err));
}
