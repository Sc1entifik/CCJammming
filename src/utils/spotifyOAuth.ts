import SpotifyEndpoints from "./endpoints";

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
	headers: {
		Authorization: string
	}
}


export default class SpotifyOAuth {
	private clientId = process.env.CLIENT_ID;
	private clientSecret = process.env.CLIENT_SECRET;
	private accessToken;
	private contentType = "application/x-www-form-urlencoded";


	constructor(accessCode: string) {
		this.accessToken = accessCode ? this.obtainAccountAccessToken(accessCode): this.obtainPublicAccessToken();
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


	private async obtainAccountAccessToken(this: SpotifyOAuth, accessCode: string): Promise<AccountAccessToken> {
		const url = SpotifyEndpoints.CLIENT_CREDENTIALS_URI;
		const options = {
			method: "post",
			body: `grant_type=authorization_code&code=${accessCode}&redirect_uri=${process.env.REDIRECT_URI}`,
			headers: {
				"Content-Type": this.contentType,
				Authorization: "Basic " + Buffer.from(this.clientId + ":" + this.clientSecret).toString("base64"),
			},
			json: true,
		};

		return await fetch(url, options).then(res => res.json());
	}


	public async authorizationHeader(this: SpotifyOAuth): Promise<AuthorizationHeader> {
		const accessTokenObject = await this.accessToken;

		return {
			headers: {
				Authorization: `${accessTokenObject.token_type} ${accessTokenObject.access_token}`
			}
		};
	}
	
}
