"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import querystring from "node:querystring";
import SpotifyEndpoints from "./endpoints";
import { formattedErrorMessage, generateRandomString, parseAuthHeaderFromCookieStore, validateQueryTerm } from "./helper";
import { AuthHeader } from "./fetchInterfaces";
import { fetchUserProfile } from "./commonFetches";
import SiteMap from "./siteMap";


const createNamedCookie = async (cookieName: string, value: string, expires: number) => {
	const isProduction = process.env.SERVER_ENVIRONMENT === "Production";
	const cookieStore = await cookies();

	cookieStore.set(cookieName, value, { httpOnly: true, secure: isProduction, expires });
};


const createStateCookie = async(state: string) => {
	const cookieName = "state";
	const expires = Date.now() + 7500;
	
	await createNamedCookie(cookieName, state, expires);
}


export const createRedirectCookie = async (formData: FormData) => {
	const searchTerm = formData.get("searchTerm") ? formData.get("searchTerm") : "";
	const searchTermType = formData.get("searchTermType") ? formData.get("searchTermType") : "";
	const urlBase = formData.get("urlBase") ? formData.get("urlBase") : "";
	const redirectUrl = searchTerm && searchTermType ? validateQueryTerm(`/${urlBase}?searchTerm=${searchTerm}&searchTermType=${searchTermType}`) : `/${urlBase}`;
	const cookieName = "redirectUrl";
	const oneMinute = 60000;
	const tenMinutes = oneMinute * 10;
	const oneHour = oneMinute * 60;
	const expires = Date.now() + oneHour + tenMinutes;
	await createNamedCookie(cookieName, redirectUrl, expires);

	redirect(redirectUrl);
};


export const deleteCookies = async () => {
	const cookieStore = await cookies();

	cookieStore
		.getAll()
		.forEach(x => {
				cookieStore.delete(x.name);
		});

	redirect(SiteMap.HOME);
};


export const spotifyAccountLoginAuthorization = async () => {
	const response_type = "code";
	const client_id = process.env.CLIENT_ID;
	const scope = "playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public"; 
	const redirect_uri = process.env.REDIRECT_URI; 
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
	const currentPlaylist = cookieStore.get("currentPlaylist")?.value;
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
	const url = SpotifyEndpoints.PLAYLIST_URI + playlistId + "/tracks";
	const body = JSON.stringify({tracks});
	const options = {
		method: "delete",
		headers: {
			Authorization: authHeader.headers.Authorization,
			"Content-type": "application/json",
		},
		body,
	};
	
	if (playlistId) {
		try {
			await fetch(url, options).then(res => {
				console.log(formattedErrorMessage("Check Deletion Status In Case Of 502 See 502 Deletion Bug Fix For More Info", res.status.toString()));
			});

		} catch (err) {
			console.error(formattedErrorMessage("Delete Item From Playlist Failed", err as string));
		}
	}

	if (typeof redirectUrl === "string") {
			redirect(redirectUrl);

	}
};


export const createSampleTrackUriCookie = async (sampleTrackUri: string) => {
	const expires = Date.now() + 7000; //expires after 7 seconds
	await createNamedCookie("sampleTrackUri", sampleTrackUri, expires);
}
