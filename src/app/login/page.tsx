import { redirect } from "next/navigation";
import querystring from "node:querystring";

import { generateRandomString } from "./components/helper";
import SpotifyEndpoints from "@/utils/endpoints";

const client_id = process.env.CLIENT_ID;
const redirect_uri = process.env.REDIRECT_URI;

const Login = () => {
	const xssPreventionKey = generateRandomString(16);
	const scope = "playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public";
	const authorizeUri = SpotifyEndpoints.USER_AUTHORIZE_URI;
	const authorizeEndpoint = querystring.stringify({
		response_type: "code",
		client_id: client_id,
		scope: scope,
		redirect_uri: redirect_uri,
		state: xssPreventionKey,
	});

	redirect(authorizeUri + authorizeEndpoint);
};


export default Login;
