import SpotifyEndpoints from "./endpoints";
import { formattedErrorMessage, validateQueryTerm } from "./helper";
import { Artist, Track, Album, UserProfile, PlaylistTrackObject, Playlist, DeviceObject } from "./fetchInterfaces";

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


const querySearch = async (validatedQueryTerm: string, queryType: string, authHeader: AuthHeader) => {
	const typeQueryString = `&type=${queryType}`;
	const url = SpotifyEndpoints.QUERY_TERM + validatedQueryTerm + typeQueryString;

	return fetch(url, authHeader).then(res => res.json());
};


const artistIdCodeByName = async (artistName: string, authHeader: AuthHeader): Promise<string> => {
	const validatedArtistName = validateQueryTerm(artistName);
	const errorDefaultId = "7dGJo4pcD2V6oG8kP0tJRR?si=Avzvq2-4SEaloXsfNIJYcg&nd=1&dlsi=a68881c17faa4ca6"; //Id code defaults to Eminem in the extremely rare case that artists.items array is completly empty so as not to throw an error.
	const artistIdCode = querySearch(artistName, QueryTermTypes.ARTIST, authHeader)
	.then(res => {
		const defaultId = res.artists.items[0].id;
		const matchedId = res.artists.items.find((x: Artist) => validateQueryTerm(x.name) === validatedArtistName)?.id;

		return matchedId? matchedId: defaultId;
	})
	.catch(err => {
		console.error(formattedErrorMessage("Artist ID Code By Name Fetch Failed", err));
		
		return errorDefaultId;
	});

	return artistIdCode;
}


export const fetchArtistDataByName = async (artistName: string, authHeader: AuthHeader): Promise<Artist> => artistIdCodeByName(artistName, authHeader)
		.then(idCode => {
			const url = SpotifyEndpoints.ARTISTS_BY_ARTIST_CODE_URI + idCode;

			return fetch(url, authHeader)
			.then(res => res.json())
			.catch(err => {
				console.error(formattedErrorMessage("Fetch Artist Data By Name Failed", err));
			});
		});


export const fetchArtistTopTracks = async (artistName: string, authHeader: AuthHeader): Promise<Track[]> => artistIdCodeByName(artistName, authHeader)
	.then(idCode => {
		const url = SpotifyEndpoints.ARTISTS_BY_ARTIST_CODE_URI + idCode + "/top-tracks";

		return fetch(url, authHeader)
			.then(res => res.json())
			.then(res => res.tracks)
			.catch(err => {
				console.error(formattedErrorMessage("Fetch Artist Top Tracks Failed", err));
			});
	});


export const fetchArtistAlbums = async (artistName: string, authHeader: AuthHeader): Promise<Album[]> => artistIdCodeByName(artistName, authHeader)
	.then(idCode => {
		const url = SpotifyEndpoints.ARTISTS_BY_ARTIST_CODE_URI + idCode + "/albums";

		return fetch(url, authHeader).then(res => res.json()).then(res => res.items);
	})
	.catch(err => {
		console.error(formattedErrorMessage("Fetch Artist Albums Failed", err));
	});


export const fetchAlbumTracksById = async (albumId: string, authHeader: AuthHeader): Promise<Track[]> => {
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
			console.error(formattedErrorMessage(`Fetch Album Tracks By ID Failed: fetchURL: ${url}`, err));
		});
}


export const fetchAlbumsByName = async (albumName: string, authHeader: AuthHeader): Promise<Album[]> => querySearch(albumName, QueryTermTypes.ALBUM, authHeader)
	.then(res => res.albums)
	.then(res => res.items)
	.catch(err => {
		console.error(formattedErrorMessage("Fetch Albums By Name Failed", err));
	});


export const fetchTracksByName = async (trackName: string, authHeader: AuthHeader): Promise<Track[]> => querySearch(trackName, QueryTermTypes.TRACK, authHeader)
	.then(res => res.tracks)
	.then(res => res.items)
	.catch(err => {
		console.error(formattedErrorMessage("Fetch Tracks By Name Failed", err));
	});


export const fetchUserProfile = async (authHeader: AuthHeader): Promise<UserProfile> => fetch(SpotifyEndpoints.USER_PROFILE_URI, authHeader)
	.then(res => res.json())
	.catch(err => {
		console.error(formattedErrorMessage("Fetch User Profile Failed", err));
	});


export const fetchPlaylistById = async (playlistId: string, authHeader: AuthHeader): Promise<Playlist> => fetch(SpotifyEndpoints.PLAYLIST_URI + playlistId, authHeader)
	.then(res => res.json())
	.catch(err => {
		console.error(formattedErrorMessage("Fetch Playlist By Id Failed", err));
	});


//Reciprocal function needed in order to bypass the 100 song spotify endpoint limit
export const fetchPlaylistItemsById = async(playlistId: string, authHeader: AuthHeader, offset=0): Promise<PlaylistTrackObject[]> => {
	const batchLimit = 100;
	const currentBatch = await fetch(SpotifyEndpoints.PLAYLIST_URI + playlistId + `/tracks?limit=${batchLimit}&offset=${offset}`, authHeader)
		.then(res => res.json())
		.then(res => res.items)
		.catch(err => {
			console.error(formattedErrorMessage("Fetch Playlist Items By ID Failed", err));
		});

	if (currentBatch.length < batchLimit) {
		return currentBatch;
	}

	const nextBatch = await(fetchPlaylistItemsById(playlistId, authHeader, offset + batchLimit));

	return currentBatch.concat(nextBatch);
};


export const fetchAvailablePlaybackDevices = async (authHeader: AuthHeader): Promise<DeviceObject[]> => fetch(SpotifyEndpoints.PLAYBACK_DEVICES_URI, authHeader)
	.then(res => res.json())
	.then(res => res.devices)
	.catch(err => {
		console.error(formattedErrorMessage(`Fetch Available Playback Devices Failed`, err));
	});
