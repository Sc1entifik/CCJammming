export enum StorageFilePaths {
	OAUTH_HEADER_JSON = "./public/oAuthHeader.json",
}



enum SpotifyEndpoints {
	MAIN_TOKEN_URI = "https://accounts.spotify.com",
	MAIN_API_URI = "https://api.spotify.com",
	CLIENT_CREDENTIALS_URI = `${SpotifyEndpoints.MAIN_TOKEN_URI}/api/token`,
	USER_AUTHORIZE_URI = `${SpotifyEndpoints.MAIN_TOKEN_URI}/authorize?`,
	QUERY_TERM = `${SpotifyEndpoints.MAIN_API_URI}/v1/search?q=`,
	ARTISTS_BY_ARTIST_CODE_URI = `${SpotifyEndpoints.MAIN_API_URI}/v1/artists/`,
	ALBUM_BY_ALBUM_CODE_URI = `${SpotifyEndpoints.MAIN_API_URI}/v1/albums/`,
	USER_PROFILE_URI = `${SpotifyEndpoints.MAIN_API_URI}/v1/me`,
	USER_PLAYLISTS = `${SpotifyEndpoints.USER_PROFILE_URI}/playlists`,
}


export default SpotifyEndpoints;
