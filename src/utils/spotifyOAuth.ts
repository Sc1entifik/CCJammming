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
	headers: {
		Authorization: string
	}
}


export default class SpotifyOAuth {
	private accessCode;
	private clientId = process.env.CLIENT_ID;
	private clientSecret = process.env.CLIENT_SECRET;
	private contentType = "application/x-www-form-urlencoded";


	constructor(accessCode: string) {
		this.accessCode = accessCode;
	}


	private async obtainPublicAccessToken(this: SpotifyOAuth): Promise<AccessToken> {
		const url = SpotifyEndpoints.CLIENT_CREDENTIALS_URI;
		const options = {
			method: "post",
			body: `grant_type=client_credentials&client_id=${this.clientId}&client_secret=${this.clientSecret}`,
			headers: {
				"Content-Type": this.contentType,
			},
		};

		return await fetch(url, options).then(res => res.json());
	}


	private async obtainAccountAccessToken(this: SpotifyOAuth): Promise<AccountAccessToken> {
		const url = SpotifyEndpoints.CLIENT_CREDENTIALS_URI;
		const options = {
			method: "post",
			body: `grant_type=authorization_code&code=${this.accessCode}&redirect_uri=${process.env.REDIRECT_URI}`,
			headers: {
				"Content-Type": this.contentType,
				Authorization: "Basic " + Buffer.from(this.clientId + ":" + this.clientSecret).toString("base64"),
			},
			json: true,
		};

		return await fetch(url, options).then(res => res.json());
	}


	private accessTokenHeader(accessTokenObject: AccessToken | AccountAccessToken): AuthorizationHeader {
		const access_token = accessTokenObject.access_token;
		const token_type = accessTokenObject.token_type;
		const expires_in = (accessTokenObject.expires_in * 1000) + Date.now();
		const headers = { Authorization: `${accessTokenObject.token_type} ${accessTokenObject.access_token}` };


		if ("scope" in accessTokenObject) {
			const scope = accessTokenObject.scope;
			const refresh_token = accessTokenObject.refresh_token;
			return {access_token, token_type, expires_in, scope, refresh_token, headers};
		}

		return {access_token, token_type, expires_in, headers};
	}


	public async authorizationHeader(this: SpotifyOAuth): Promise<AuthorizationHeader> {
		const accessTokenObject = this.accessCode ? await this.obtainAccountAccessToken(): await this.obtainPublicAccessToken();

		return this.accessTokenHeader(accessTokenObject);
	}
}

