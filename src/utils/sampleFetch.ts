import SpotifyEndpoints from "./endpoints"
import { validateQueryTerm } from "./helper"

interface AccessToken {
	access_token: string
	token_type: string
	expires_in: number
}

interface AccountAccessToken extends AccessToken {
	scope: string
	refresh_token: string
}


class SpotifyOAuth {
	private clientId;
	private clientSecret;
	private accessToken;
	private authorizationHeader;


	constructor(accessCode:string | null = null) {
		this.clientId = process.env.CLIENT_ID;
		this.clientSecret = process.env.CLIENT_SECRET;
		this.accessToken = accessCode ? this.obtainAccountAccessToken(accessCode): this.obtainPublicAccessToken();
		this.authorizationHeader = this.obtainAuthorizationHeader();
	}


	private async obtainPublicAccessToken(this: SpotifyOAuth): Promise<AccessToken> {
		const url =	SpotifyEndpoints.CLIENT_CREDENTIALS_URI;
		const options = {
			method: "post",
			body:	`grant_type=client_credentials&client_id=${this.clientId}&client_secret=${this.clientSecret}`, 
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
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
				"Content-Type": "application/x-www-form-urlencoded",
				"Authorization": "Basic " + Buffer.from(this.clientId + ":" + this.clientSecret).toString("base64"),
			},
			json: true,
		};

		return await fetch(url, options).then(res => res.json());
	}


	private async obtainAuthorizationHeader(this: SpotifyOAuth) {
		const accessTokenObject = await this.accessToken;
		
		return {headers: {Authorization: `${accessTokenObject.token_type} ${accessTokenObject.access_token}`}};
	}


	public async requestUserProfile(this: SpotifyOAuth) {
		const options = await this.authorizationHeader;

		return await fetch(SpotifyEndpoints.USER_PROFILE_URI, options).then(res => res.json());
	}


	public async requestArtistIdCode(this: SpotifyOAuth, artistName: string) {
		const validatedSearchTerm = validateQueryTerm(artistName);
		const typeQueryString = "&type=artist";
		const url = SpotifyEndpoints.ARTIST_CODE_BY_ARTIST_NAME + validatedSearchTerm + typeQueryString;
		const options = await this.authorizationHeader;
		const artistIdCode = await fetch(url, options).then(res => res.json()).then(res => res.artists.items[0].id).catch( error => {
			const eminemId = "7dGJo4pcD2V6oG8kP0tJRR"; // Error defaults to Eminem
			console.error(error);

			return eminemId;
		}); //error defaults to Eminem

		return artistIdCode;
	}


	public async isValidAccessToken(this: SpotifyOAuth) {
		const possibleToken = await this.accessToken;
		return !("error" in possibleToken);
	}


	public async requestAristData(this: SpotifyOAuth, artistIdCode: string) {
		const url = SpotifyEndpoints.ARTISTS_BY_ARTIST_CODE_URI + artistIdCode;
		const options = await this.authorizationHeader;
		
		return await fetch(url, options).then(res => res.json());
	}


	public async requestArtistTopTracks(this: SpotifyOAuth, artistName: string) {
		const artistIdCode = await this.requestArtistIdCode(artistName);
		const url = SpotifyEndpoints.ARTISTS_BY_ARTIST_CODE_URI + artistIdCode + "/top-tracks";
		const options = await this.authorizationHeader;

		return await fetch(url, options).then(res => res.json());
	}


	public async requestUserPlaylists(this: SpotifyOAuth) {
		const url = SpotifyEndpoints.USER_PLAYLISTS;
		const options = await this.authorizationHeader;

		return await fetch(url, options).then(res => res.json());
	
	}
}


export default SpotifyOAuth;
