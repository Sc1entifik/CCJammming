import { parseAuthHeaderFromCookieStore } from "@/utils/helper";
import { cookies } from "next/headers";
import SpotifyEndpoints from "@/utils/endpoints";


export default function AddTrackToPlaylist({trackUri} : {trackUri: string}) {
	const handleClick = async() => {
		"use server";
		const cookieStore = await cookies();
		const authHeader = parseAuthHeaderFromCookieStore(cookieStore);
		const playlistId = cookieStore.get("currentPlaylist")?.value;
		const url = SpotifyEndpoints.PLAYLIST_URI + playlistId + "/tracks";
		const body = JSON.stringify({uris: [trackUri]});
		const options = {
			method: "post",
			headers: {
				Authorization: authHeader.headers.Authorization,
				"Content-Type": "application/json",
			},
			body,

		};
		if (playlistId) {
			await fetch(url, options);

		} else {
			console.log("Could not add track! No playlist chosen!!");
		}
	};

	return <button onClick={handleClick}>Add To Playlist</button>;
}
