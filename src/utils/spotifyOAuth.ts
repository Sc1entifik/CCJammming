import SpotifyEndpoints, { StorageFilePaths } from "./endpoints";

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
	state: string
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
	private state;
	private clientId = process.env.CLIENT_ID;
	private clientSecret = process.env.CLIENT_SECRET;
	private contentType = "application/x-www-form-urlencoded";


	constructor(accessCode: string, state: string) {
		this.accessCode = accessCode;
		this.state = state;
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


	public async authorizationHeader(this: SpotifyOAuth): Promise<object> {
		const accessTokenObject = this.accessCode ? await this.obtainAccountAccessToken(): await this.obtainPublicAccessToken();
		const finalObject = {};
		const headerObject: AuthorizationHeader = {
			access_token: accessTokenObject.access_token,
			state: this.state,
			token_type: accessTokenObject.token_type,
			expires_in: accessTokenObject.expires_in + Date.now(),

			headers: {
				Authorization: `${accessTokenObject.token_type} ${accessTokenObject.access_token}`
			}
		};
		finalObject[this.accessCode] = headerObject;

		return finalObject;
	}


	public async writeAuthorizationHeaderJson(this: SpotifyOAuth): Promise<void> {
		const headerJson = await this.authorizationHeader();

		try {
			let previousHeaderJson = JSON.parse(await Deno.readTextFile(StorageFilePaths.OAUTH_HEADER_JSON));
			previousHeaderJson[this.accessCode] = headerJson;
			await Deno.writeTextFile(StorageFilePaths.OAUTH_HEADER_JSON, JSON.stringify(previousHeaderJson));

		} catch(error) {
			console.error(error);
			let newJsonFileObject = {};
			newJsonFileObject[this.accessCode] = headerJson;
			await Deno.writeTextFile(StorageFilePaths.OAUTH_HEADER_JSON, JSON.stringify(headerJson));
		}

	}


	public async readAuthorizationHeaderJson(this: SpotifyOAuth): Promise<AuthorizationHeader> {
		const jsonHeaders = JSON.parse(await Deno.readTextFile(StorageFilePaths.OAUTH_HEADER_JSON));
		const authorizationHeader = jsonHeaders[this.accessCode];

		return authorizationHeader
	}
}
