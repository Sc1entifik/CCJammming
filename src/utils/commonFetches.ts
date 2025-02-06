import SpotifyEndpoints from "./endpoints";
import { validateQueryTerm } from "./helper";
import { Artist, Track, Album, UserProfile, PlaylistTrackObject, Playlist } from "./fetchInterfaces";

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
		console.error(`Artist Id Code By Name Fetch Failed: \n${err}`);
		
		return errorDefaultId;
	});

	return artistIdCode;
}


export const fetchArtistDataByName = (artistName: string, authHeader: AuthHeader): Promise<Artist> => artistIdCodeByName(artistName, authHeader)
		.then(idCode => {
			const url = SpotifyEndpoints.ARTISTS_BY_ARTIST_CODE_URI + idCode;

			return fetch(url, authHeader)
			.then(res => res.json())
			.catch(err => {
				console.error(`Fetch Artist Data By Name Failed: \n${err}`);
			});
		});


export const fetchArtistTopTracks = (artistName: string, authHeader: AuthHeader): Promise<Track[]> => artistIdCodeByName(artistName, authHeader)
	.then(idCode => {
		const url = SpotifyEndpoints.ARTISTS_BY_ARTIST_CODE_URI + idCode + "/top-tracks";

		return fetch(url, authHeader)
			.then(res => res.json())
			.then(res => res.tracks)
			.catch(err => {
				console.error(`Fetch Artist Top Tracks Failed: \n${err}`);
			});
	});


export const fetchArtistAlbums = (artistName: string, authHeader: AuthHeader): Promise<Album[]> => artistIdCodeByName(artistName, authHeader)
	.then(idCode => {
		const url = SpotifyEndpoints.ARTISTS_BY_ARTIST_CODE_URI + idCode + "/albums";

		return fetch(url, authHeader).then(res => res.json()).then(res => res.items);
	})
	.catch(err => {
		console.error(`Fetch Artist Albums Failed: \n${err}`);
	});


export const fetchAlbumTracksById = (albumId: string, authHeader: AuthHeader): Promise<Track[]> => {
	const url = SpotifyEndpoints.ALBUM_BY_ALBUM_CODE_URI + albumId + "/tracks";
	const options = {
		headers: {
			Authorization: authHeader.headers.Authorization,
		},
		cache: "force-cache",
	};

	return fetch(url, options)
		.then(res => res.json())
		.then(res => res.items)
		.catch(err => {
			console.error(`Fetch Album Tracks By Id Failed: \nfetchUrl: ${url} \n${err}`)
		});
}


export const fetchAlbumsByName = (albumName: string, authHeader: AuthHeader): Promise<Album[]> => querySearch(albumName, "album", authHeader)
	.then(res => res.albums)
	.then(res => res.items)
	.catch(err => {
		console.error(`Fetch Albums By Name Failed: \n${err}`);
	});


export const fetchTracksByName = (trackName: string, authHeader: AuthHeader): Promise<Track[]> => querySearch(trackName, "track", authHeader)
	.then(res => res.tracks)
	.then(res => res.items)
	.catch(err => {
		console.error(`Fetch Tracks By Name Failed: \n${err}`);
	});


export const fetchUserProfile = (authHeader: AuthHeader): Promise<UserProfile> => fetch(SpotifyEndpoints.USER_PROFILE_URI, authHeader)
	.then(res => res.json())
	.catch(err => {
		console.error(`Fetch User Profile Failed: \n${err}`);
	});


export const fetchPlaylistById = (playlistId: string, authHeader: AuthHeader): Promise<Playlist> => fetch(SpotifyEndpoints.PLAYLIST_URI + playlistId, authHeader)
	.then(res => res.json())
	.catch(err => {
		console.error(`Fetch Playlist By Id Failed: \n${err}`);
	});


export const fetchPlaylistItemsById = (playlistId: string, authHeader: AuthHeader): Promise<PlaylistTrackObject[]> => fetch(SpotifyEndpoints.PLAYLIST_URI + playlistId + "/tracks", authHeader)
	.then(res => res.json())
	.then(res => res.items)
	.catch(err => {
		console.error(`Fetch Playlist Items By Id Failed: \n${err}`);
	});


export const fetchAddTracksToPlaylist = (playlistId: string, trackUris: string[], authHeader: AuthHeader) => {
	const url = SpotifyEndpoints.PLAYLIST_URI + playlistId + "/tracks";
	const options = {
		method: "post",
		headers: {
			Authorization: authHeader.headers.Authorization,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({uris: trackUris}), 
	};

	fetch(url, options)
		.then(res => res.json())
		.catch(err => {
			console.error(`Fetch Add Tracks To Playlist Failed: \n${err}`);
		});
};
