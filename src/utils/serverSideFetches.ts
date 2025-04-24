"use server";
import { cookies } from "next/headers";
import { fetchTracksByName } from "./commonFetches";
import { formattedErrorMessage, parseAuthHeaderFromCookieStore, reverseList } from "./helper";
import SpotifyEndpoints from "./endpoints";
import { CookieStore } from "./globalInterfaces";


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


const updatePlaylistItems = async(uris: string[], cookieStore: CookieStore) => {
	const authHeader = parseAuthHeaderFromCookieStore(cookieStore);
	const playlistId = cookieStore.get("currentPlaylist")?.value;
	const url = SpotifyEndpoints.PLAYLIST_URI + playlistId + "/tracks";
	const body = JSON.stringify({ uris });
	const options = {
		method: "put",
		headers: {
			Authorization: authHeader.headers.Authorization,
			"Content-Type": "application/json",
		},
		body,
	};

	await fetch(url, options);
}


const addTracksToPlaylist = async (trackUris: string[], cookieStore: CookieStore) => {
	const authHeader = parseAuthHeaderFromCookieStore(cookieStore);
	const playlistId = cookieStore.get("currentPlaylist")?.value; 
	const url = SpotifyEndpoints.PLAYLIST_URI + playlistId + "/tracks";
	const options = {
		method: "post",
		headers: {
			Authorization: authHeader.headers.Authorization,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({uris: trackUris}), 
	};

	fetch(url, options)
		.then(res => res.json())
		.catch(err => {
			console.error(formattedErrorMessage("Fetch Add Tracks To Playlist Failed", err));
		});
};


export const reorderPlaylistItems = async(uris: string[]) => {
	const batchLimit = 100;
	const cookieStore = await cookies();

	//If else needed here because of Spotify's api request limit of 100 tracks for both the updatePlaylistItems and addTracksToPlaylist functions. To simplify the code I run one update of 100 songs and then use addTracksToPlaylist to add the remaining tracks at the end of the playlist in 100 song batches. 
	if (uris.length < batchLimit) {
		await updatePlaylistItems(uris, cookieStore);

	} else {
		const reversedUris = reverseList(uris);
		let currentBatch: string[] = [];


		while (currentBatch.length < batchLimit) {
			const uri = reversedUris.pop() as string;
			currentBatch.push(uri);
		}

		await updatePlaylistItems(currentBatch, cookieStore);
		currentBatch = [];


		while (reversedUris.length) {
			if (currentBatch.length === batchLimit) {
				await addTracksToPlaylist(currentBatch, cookieStore);
				currentBatch = [];
			}
			
			const uri = reversedUris.pop() as string;
			currentBatch.push(uri);
		}

		if (currentBatch.length) await addTracksToPlaylist(currentBatch, cookieStore);
	}
}
