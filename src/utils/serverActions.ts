"use server";

import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import querystring from "node:querystring";

import SpotifyEndpoints from "./endpoints";
import { generateRandomString, parseAuthHeaderFromCookieStore } from "./helper";
import { AuthHeader } from "./fetchInterfaces";
import { fetchUserProfile } from "./commonFetches";


const createStateCookie = async (state: string) => {
	const isProduction = Deno.env.get("SERVER_ENVIRONMENT") === "Production";
	const cookieStore = await cookies();

	cookieStore.set("state", state, { httpOnly: true, secure: isProduction, expires: Date.now() + 7500 });
};


export const deleteAuthCookie = async () => {
	await cookies().then(res => res.delete("auth"));
};


export const spotifyAccountLoginAuthorization = async () => {
	const response_type = "code";
	const client_id = Deno.env.get("CLIENT_ID");
	const scope = "playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-read-playback-state user-modify-playback-state user-read-currently-playing";
	const redirect_uri = Deno.env.get("REDIRECT_URI"); 
	const state = generateRandomString(16);
	const authorizeEndpoint = querystring.stringify({
		response_type,
		client_id,
		scope,
		redirect_uri,
		state,
	});
	const authorizeUri = SpotifyEndpoints.USER_AUTHORIZE_URI;
	await createStateCookie(state);

	redirect(authorizeUri + authorizeEndpoint);
};


export const unfollowCurrentPlaylist = async() => {
	const cookieStore = await cookies();
	const authHeader: AuthHeader = parseAuthHeaderFromCookieStore(cookieStore);
	const currentPlaylist = cookieStore.get("currentPlaylist").value;
	const url = SpotifyEndpoints.PLAYLIST_URI + currentPlaylist + "/followers";
	const options = {
		method: "delete",
		headers: {
			Authorization: authHeader.headers.Authorization,
		},
	};

	await fetch(url, options);
	cookieStore.delete("currentPlaylist");
	redirect("/setCurrentPlaylist")
}


export const addPlaylist = async(formData: FormData) => {
	const authHeader = parseAuthHeaderFromCookieStore(await cookies());
	const userId = await fetchUserProfile(authHeader).then(x => x.id);
	const url = SpotifyEndpoints.USERS_URI + userId + "/playlists";
	const body = JSON.stringify({
		name: formData.get("newPlaylistName")?.toString().trim(),
		description: formData.get("newPlaylistDescription")?.toString().trim(),
		"public": formData.get("playlistType")?.toString() === "public",
	});
	const options = {
		method: "post",
		headers: {
			"Content-Type": "application/json",
			"Authorization": authHeader.headers.Authorization,
		},
		body,
	};
	await fetch(url, options);

	redirect("/setCurrentPlaylist");
}
