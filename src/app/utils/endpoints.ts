enum SpotifyEndpoints {
	MAIN_TOKEN_URI = "https://accounts.spotify.com",
	MAIN_API_URI = "https://api.spotify.com",
	CLIENT_CREDENTIALS_URI = `${SpotifyEndpoints.MAIN_TOKEN_URI}/api/token`,
	USER_AUTHORIZE_URI = `${SpotifyEndpoints.MAIN_TOKEN_URI}/authorize?`,
	ARTIST_CODE_BY_ARTIST_NAME = `${SpotifyEndpoints.MAIN_API_URI}/v1/search?q=remaster%2520artist%3A`,
	ARTISTS_BY_ARTIST_CODE_URI = `${SpotifyEndpoints.MAIN_API_URI}/v1/artists/`,
}

export default SpotifyEndpoints;
