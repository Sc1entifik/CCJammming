"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import querystring from "node:querystring";

import SpotifyEndpoints from "./endpoints";
import { generateRandomString } from "./helper";


const createStateCookie = async (state: string) => {
	const isProduction = Deno.env.get("SERVER_ENVIRONMENT") === "Production";
	const cookieStore = await cookies();
	cookieStore.set("state", state, { httpOnly: true, secure: isProduction, expires: Date.now() +7500 });
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
