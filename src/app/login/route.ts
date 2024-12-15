import { redirect } from "next/navigation";
import querystring from "node:querystring";
import { cookies } from "next/headers";

import { generateRandomString } from "@/utils/helper";
import SpotifyEndpoints from "@/utils/endpoints";

const response_type = "code";
const client_id = process.env.CLIENT_ID;
const scope = "playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-read-playback-state user-modify-playback-state user-read-currently-playing";
const redirect_uri = process.env.REDIRECT_URI;
const authorizeUri = SpotifyEndpoints.USER_AUTHORIZE_URI;
const isProduction = process.env.SERVER_ENVIRONMENT === "Production";

export async function GET() {
	const state = generateRandomString(16);
	const cookieStore = await cookies();
	cookieStore.set("state", state, { httpOnly: true, secure: isProduction, expires: Date.now() + 7500 });
	const authorizeEndpoint = querystring.stringify({
		response_type,
		client_id,
		scope,
		redirect_uri,
		state,
	});

	redirect(authorizeUri + authorizeEndpoint);
}

