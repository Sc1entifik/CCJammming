import SpotifyEndpoints from "./endpoints"

interface AccessToken {
	access_token: string
	token_type: string
	expires_in: number
}

interface AccountAccessToken extends AccessToken {
	scope: string
	refresh_token: string
}

interface AuthorizationHeader {
	access_token: string
	token_type: string
	expires_in: number
	scope?: string
	refresh_token?: string
	authHeader: {
		headers: {
			Authorization: string
		}
	}
}


const publicAccessTestingToken = async (): Promise<AccessToken> => {
	const url = SpotifyEndpoints.CLIENT_CREDENTIALS_URI;
	const options = {
		method: "post",
		body: `grant_type=client_credentials&client_id=${Deno.env.get("CLIENT_ID")}&client_secret=${Deno.env.get("CLIENT_SECRET")}`,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	};

	return await fetch(url, options).then(res => res.json());
};


const accountAccessToken = async (accessCode: string): Promise<AccountAccessToken> => {
	const url = SpotifyEndpoints.CLIENT_CREDENTIALS_URI;
	const options = {
		method: "post",
		body: `grant_type=authorization_code&code=${accessCode}&redirect_uri=${Deno.env.get("REDIRECT_URI")}`,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: "Basic " + Buffer.from(Deno.env.get("CLIENT_ID") + ":" + Deno.env.get("CLIENT_SECRET")).toString("base64"),
		},
		json: true,
	};

	return await fetch(url, options).then(res => res.json());
};


const accessTokenHeader = (accessToken: AccessToken | AccountAccessToken): AuthorizationHeader => {
	const access_token = accessToken.access_token;
	const token_type = accessToken.token_type;
	const expires_in = (accessToken.expires_in * 1000) + Date.now();
	const authHeader = { 
		headers: 
			{ 
				Authorization: `${token_type} ${access_token}` 
		}
	};

	if("scope" in accessToken) {
		const scope = accessToken.scope;
		const refresh_token = accessToken.refresh_token;
		return {access_token, token_type, expires_in, scope, refresh_token, authHeader};
	}
return {access_token, token_type, expires_in, authHeader}; }


export const publicAccessHeader = async () => accessTokenHeader(await publicAccessTestingToken());
export const accountAccessHeader = async (accessCode: string) => accessTokenHeader(await accountAccessToken(accessCode));
