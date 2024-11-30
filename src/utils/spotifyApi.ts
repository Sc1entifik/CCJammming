import SpotifyEndpoints from "./endpoints";
import SpotifyOAuth from "./spotifyOAuth";
import { validateQueryTerm } from "./helper";

interface SpotifyImage {
	url: string
	height: number
	width: number
}


interface simplifiedArtist {
	external_urls: {
		spotify: string
	}

	href: string
	id: string
	name: string
	type: string
	uri: string
}


export interface Artist extends simplifiedArtist {
	followers: {
		href: string
		total: number
	}
	genres: string[]
	images: SpotifyImage[]
	popularity: number
}


interface Album {
	album_type: string
	total_tracks: number
	available_markets: string[]
	external_urls: {
		spotify: string
	}
	href: string
	id: string
	images: SpotifyImage[]
	name: string
	release_date: string
	release_date_precision: string
	type: string
	uri: string
	artists: Artist[]
}


export interface Track {
	album: Album
	artists: simplifiedArtist[]
	available_markets: string[]
	disc_number: number
	duration_ms: number
	explicit: boolean
	external_ids: {
		isrc: string
		ean: string
		upc: string
	}
	external_urls: {
		spotify: string
	}
	href: string
	id: string
	is_playable: boolean
	restrictions: {
		reason: string
	}
	name: string
	popularity: number
	track_number: number
	type: string
	uri: string
	is_local: boolean
}


export default class SpotifyApi {
	private authorizationHeader;
	private accessCode;


	constructor(accessCode: string, state: string) {
		this.accessCode = accessCode;
		this.authorizationHeader = this.obtainAuthorizationHeader(accessCode, state);
	}


	private obtainAuthorizationHeader(this: SpotifyApi, accessCode: string, state: string) {
		const spotifyAuthorizationObject = new SpotifyOAuth(accessCode, state);
		const authorizationHeader = this.accessCode ? spotifyAuthorizationObject.readAuthorizationHeaderJson() : spotifyAuthorizationObject.authorizationHeader();

		return authorizationHeader;
	} 


	private async querySearchTermCode(this: SpotifyApi, queryTerm: string, queryType:string): Promise<object> {
		const validatedSearchTerm = validateQueryTerm(queryTerm);
		const typeQueryString = `&type=${queryType}`;
		const url = SpotifyEndpoints.QUERY_TERM + validatedSearchTerm + typeQueryString;
		const authObject = await this.authorizationHeader;
		const options = {headers: authObject[this.accessCode].headers};

		return await fetch(url, options).then(res => res.json());
	}


	private async requestArtistIdCode(this: SpotifyApi, artistName: string): Promise<string> {
		const artistIdCode = await this.querySearchTermCode(artistName, "artist")
			.then(res  => res.artists.items[0].id)
			.catch(error => {
			console.error(error);
			return "7dGJo4pcD2V6oG8kP0tJRR?si=Avzvq2-4SEaloXsfNIJYcg&nd=1&dlsi=a68881c17faa4ca6";
		});

		if (typeof artistIdCode === "string") {
		
			return artistIdCode;
		}

			return "7dGJo4pcD2V6oG8kP0tJRR?si=Avzvq2-4SEaloXsfNIJYcg&nd=1&dlsi=a68881c17faa4ca6";
	}


	public async requestArtistData(this: SpotifyApi, artistName: string): Promise<Artist> {
		const artistIdCode = await this.requestArtistIdCode(artistName);
		const url = SpotifyEndpoints.ARTISTS_BY_ARTIST_CODE_URI + artistIdCode;
		const authObject = await this.authorizationHeader;
		const options = {headers: authObject[this.accessCode].headers};

		return await fetch(url, options).then(res => res.json());
	}


	public async requestArtistTopTracks(this: SpotifyApi, artistName: string): Promise<Track[]> {
		const artistIdCode = await this.requestArtistIdCode(artistName);
		const url = SpotifyEndpoints.ARTISTS_BY_ARTIST_CODE_URI + artistIdCode + "/top-tracks";
		const authObject = await this.authorizationHeader;
		const options = {headers: authObject[this.accessCode].headers};

		return await fetch(url, options).then(res => res.json()).then(res => res.tracks);
	}


	public async requestArtistAlbums(this: SpotifyApi, artistName: string): Promise<Album[]> {
		const artistIdCode = await this.requestArtistIdCode(artistName);
		const url = SpotifyEndpoints.ARTISTS_BY_ARTIST_CODE_URI + artistIdCode + "/albums";
		const authObject = await this.authorizationHeader;
		const options = {headers: authObject[this.accessCode].headers};

		return await fetch(url, options).then(res => res.json()).then(res => res.items);
	}


	public async requestAlbums(this: SpotifyApi, albumName: string): Promise<Album[]> {
		const albums: Album[] = await this.querySearchTermCode(albumName, "album").then(res => res.items);
		const filtered_albums: Album[] = albums.filter(x => x !== null);

		return filtered_albums;
	}
}
