"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import querystring from "node:querystring";

import SpotifyEndpoints from "./endpoints";
import { generateRandomString, parseAuthHeaderFromCookieStore, validateQueryTerm } from "./helper";
import { AuthHeader } from "./fetchInterfaces";
import { fetchUserProfile } from "./commonFetches";


const createNamedCookie = async (cookieName: string, value: string, expires: number) => {
	const isProduction = Deno.env.get("SERVER_ENVIRONMENT") === "Production";
	const cookieStore = await cookies();

	cookieStore.set(cookieName, value, { httpOnly: true, secure: isProduction, expires });
};


const createStateCookie = async(state: string) => {
	const cookieName = "state";
	const expires = Date.now() + 7500;
	
	await createNamedCookie(cookieName, state, expires);
}


export const createRedirectCookie = async (formData: FormData) => {
	const [searchTerm="", searchTermType="", urlBase=""] = formData.values();
	console.log(`urlBase: ${urlBase}`);
	formData.keys().forEach(x => console.log(`formData key: ${x}`));
	formData.values().forEach(x => console.log(`formData value: ${x}`));
	const redirectUrl = searchTerm && searchTermType ? validateQueryTerm(`/${urlBase}?searchTerm=${searchTerm}&searchTermType=${searchTermType}`) : `/${urlBase}`;
	console.log(`redirectUrl: ${redirectUrl}`)
	const cookieName = "redirectUrl";
	const oneMinute = 60000;
	const tenMinutes = oneMinute * 10;
	const oneHour = oneMinute * 60;
	const expires = Date.now() + oneHour + tenMinutes;
	await createNamedCookie(cookieName, redirectUrl, expires);

	redirect(redirectUrl);
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


export const addItemsToCurrentPlaylist = async (uris: string[]) => {
	const cookieStore = await cookies();
	const authHeader = parseAuthHeaderFromCookieStore(cookieStore);
	const redirectUrl = cookieStore.get("redirectUrl")?.value;
	const playlistId = cookieStore.get("currentPlaylist")?.value;
	const url = SpotifyEndpoints.PLAYLIST_URI + playlistId + "/tracks";
	const body = JSON.stringify({uris});
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

	if (typeof redirectUrl === "string") {
		redirect(redirectUrl);
	}
};


export const deleteItemsFromCurrentPlaylist = async (tracks: object[], urlBase: string) => {
	const cookieStore = await cookies();
	const authHeader = parseAuthHeaderFromCookieStore(cookieStore);
	const redirectUrl = cookieStore.has("redirectUrl") ? cookieStore.get("redirectUrl")?.value : `/${urlBase}`;
	const playlistId = cookieStore.get("currentPlaylist")?.value;
	const snapshot_id = await fetch(SpotifyEndpoints.PLAYLIST_URI + playlistId, authHeader).then(res => res.json()).then(res => res.snapshot_id);
	const url = SpotifyEndpoints.PLAYLIST_URI + playlistId + "/tracks";
	const body = JSON.stringify({tracks, snapshot_id});
	const options = {
		method: "delete",
		headers: {
			Authorization: authHeader.headers.Authorization,
			"Content-type": "application/json",
		},
		body,
	};
	
	if (playlistId) {
		await fetch(url, options);
	}

	if (typeof redirectUrl === "string") {
		redirect(redirectUrl);
	}
};
