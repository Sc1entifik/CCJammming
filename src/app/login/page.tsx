import { redirect } from "next/navigation";
import querystring from "node:querystring";

import { generateRandomString } from "./components/helper";
import SpotifyEndpoints from "@/utils/endpoints";

const client_id = process.env.CLIENT_ID;
const redirect_uri = process.env.REDIRECT_URI;
const response_type = "code";
const scope = "playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-read-playback-state user-modify-playback-state user-read-currently-playing";
const authorizeUri = SpotifyEndpoints.USER_AUTHORIZE_URI;

const Login = () => {
	const state = generateRandomString(16);
	const authorizeEndpoint = querystring.stringify({
		response_type,
		client_id,
		scope,
		redirect_uri,
		state,
	});

	redirect(authorizeUri + authorizeEndpoint);
};


export default Login;
