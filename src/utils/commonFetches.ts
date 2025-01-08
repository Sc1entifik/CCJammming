import SpotifyEndpoints from "./endpoints";
import { validateQueryTerm } from "./helper";
import { Artist, Track, Album, UserProfile, PlaylistTrackObject } from "./fetchInterfaces";
import { headers } from "next/headers";

enum QueryTermTypes {
	ALBUM = "album",
	ARTIST = "artist",
	PLAYLIST = "playlist",
	TRACK = "track",
	SHOW = "show",
	EPISODE = "episode",
	AUDIOBOOK = "audiobook",
}

interface AuthHeader {
	headers: { Authorization: string }
}


const querySearch = (validatedQueryTerm: string, queryType: string, authHeader: AuthHeader): Promise<object> => {
	const typeQueryString = `&type=${queryType}`;
	const url = SpotifyEndpoints.QUERY_TERM + validatedQueryTerm + typeQueryString;

	return fetch(url, authHeader).then(res => res.json());
};


const artistIdCodeByName = (artistName: string, authHeader: AuthHeader): Promise<string> => {
	const validatedArtistName = validateQueryTerm(artistName);
	const errorDefaultId = "7dGJo4pcD2V6oG8kP0tJRR?si=Avzvq2-4SEaloXsfNIJYcg&nd=1&dlsi=a68881c17faa4ca6"; //Id code defaults to Eminem in the extremely rare case that artists.items array is completly empty so as not to throw an error.
	const artistIdCode = querySearch(artistName, QueryTermTypes.ARTIST, authHeader)
	.then(res => {
		const defaultId = res.artists.items[0].id;
		const matchedId = res.artists.items.find(x => validateQueryTerm(x.name) === validatedArtistName)?.id;

		return matchedId? matchedId: defaultId;
	})
	.catch(err => {
		console.error(err);
		
		return errorDefaultId;
	});

	return artistIdCode;
}


export const fetchArtistDataByName = (artistName: string, authHeader: AuthHeader): Promise<Artist> => artistIdCodeByName(artistName, authHeader)
		.then(idCode => {
			const url = SpotifyEndpoints.ARTISTS_BY_ARTIST_CODE_URI + idCode;

			return fetch(url, authHeader).then(res => res.json());
		});


export const fetchArtistTopTracks = (artistName: string, authHeader: AuthHeader): Promise<Track[]> => artistIdCodeByName(artistName, authHeader)
	.then(idCode => {
		const url = SpotifyEndpoints.ARTISTS_BY_ARTIST_CODE_URI + idCode + "/top-tracks";

		return fetch(url, authHeader).then(res => res.json()).then(res => res.tracks);
	});


export const fetchArtistAlbums = (artistName: string, authHeader: AuthHeader): Promise<Album[]> => artistIdCodeByName(artistName, authHeader)
	.then(idCode => {
		const url = SpotifyEndpoints.ARTISTS_BY_ARTIST_CODE_URI + idCode + "/albums";

		return fetch(url, authHeader).then(res => res.json()).then(res => res.items);
	}).catch(error => {

		console.error(`Fetch Artist Albums Errored Out: \n${error}`)
	});


export const fetchAlbumTracksById = (albumId: string, authHeader: AuthHeader): Promise<Track[]> => {
	const url = SpotifyEndpoints.ALBUM_BY_ALBUM_CODE_URI + albumId + "/tracks";

	return fetch(url, authHeader).then(res => res.json()).then(res => res.items);
}


export const fetchAlbumsByName = (albumName: string, authHeader: AuthHeader): Promise<Album[]> => querySearch(albumName, "album", authHeader).then(res => res.albums).then(res => res.items);


export const fetchTracksByName = (trackName: string, authHeader: AuthHeader): Promise<Track[]> => querySearch(trackName, "track", authHeader).then(res => res.tracks).then(res => res.items);


export const fetchUserProfile = (authHeader: AuthHeader): Promise<UserProfile> => fetch(SpotifyEndpoints.USER_PROFILE_URI, authHeader).then(res => res.json());


export const fetchPlaylistItems = (playlistId: string, authHeader: AuthHeader): Promise<PlaylistTrackObject[]> => fetch(SpotifyEndpoints.PLAYLIST_URI + playlistId + "/tracks", authHeader).then(res => res.json).then(res => res.items);


export const fetchAddTracksToPlaylist = (playlistId: string, trackUris: string, authHeader: AuthHeader) => {
	const url = SpotifyEndpoints.PLAYLIST_URI + playlistId + "/tracks";
	const options = {
		method: "post",
		headers: {
			Authorization: authHeader.headers.Authorization,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({uris: [trackUris]}), 
	};

	fetch(url, options).then(res => res.json());
};
