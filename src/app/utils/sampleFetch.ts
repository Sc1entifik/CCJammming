import SpotifyEndpoints from "./endpoints"
import { validateQueryTerm } from "./helper"

interface AccessToken {
	access_token: string
	token_type: string
	expires_in: number
}

class SpotifyOAuth {
	private clientId;
	private clientSecret;
	private accessToken;

	constructor(accessToken = null) {
		this.clientId = process.env.CLIENT_ID;
		this.clientSecret = process.env.CLIENT_SECRET;
		this.accessToken = accessToken ? accessToken: this.obtainAccessToken();
	}


	private async obtainAccessToken(this: SpotifyOAuth): Promise<AccessToken> {
		const url =	SpotifyEndpoints.CLIENT_CREDENTIALS_URI;
		const options = {
			method: "post",
			body:	`grant_type=client_credentials&client_id=${this.clientId}&client_secret=${this.clientSecret}`, 
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			
		};

		const tokenFetch = await fetch(url, options);
		const accessToken = await tokenFetch.json();
		return accessToken; 
	};


	public async requestArtistIdCode(this: SpotifyOAuth, artistName: string) {
		const accessTokenObject = await this.accessToken;
		const validatedSearchTerm = validateQueryTerm(artistName);
		const typeQueryString = "&type=artist";
		const url = SpotifyEndpoints.ARTIST_CODE_BY_ARTIST_NAME + validatedSearchTerm + typeQueryString;
		const options = {headers: {"Authorization": `${accessTokenObject.token_type} ${accessTokenObject.access_token}`}};
		console.log(url)
		const artistIdCode = await fetch(url, options).then(res => res.json()).then(res => res.artists.items[0].id);

		return artistIdCode;
	}

	public async requestAristData(this: SpotifyOAuth, artistIdCode: string) {
		const accessTokenObject = await this.accessToken;
		const url = SpotifyEndpoints.ARTISTS_BY_ARTIST_CODE_URI + artistIdCode;
		const options = {headers: {"Authorization": `${accessTokenObject.token_type} ${accessTokenObject.access_token}`}};
		const artistInfo = await fetch(url, options).then(res => res.json());

		return artistInfo;
	}
}


export default SpotifyOAuth;
	
