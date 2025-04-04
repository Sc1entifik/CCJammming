enum SpotifyEndpoints {
	SPOTIFY_RECOVER_PLAYLISTS =	"https://support.spotify.com/us/article/save-recover-playlists/",
	MAIN_TOKEN_URI = "https://accounts.spotify.com",
	MAIN_API_URI = "https://api.spotify.com",
	CLIENT_CREDENTIALS_URI = `${SpotifyEndpoints.MAIN_TOKEN_URI}/api/token`,
	USER_AUTHORIZE_URI = `${SpotifyEndpoints.MAIN_TOKEN_URI}/authorize?`,
	QUERY_TERM = `${SpotifyEndpoints.MAIN_API_URI}/v1/search?q=`,
	ARTISTS_BY_ARTIST_CODE_URI = `${SpotifyEndpoints.MAIN_API_URI}/v1/artists/`,
	ALBUM_BY_ALBUM_CODE_URI = `${SpotifyEndpoints.MAIN_API_URI}/v1/albums/`,
	USER_PROFILE_URI = `${SpotifyEndpoints.MAIN_API_URI}/v1/me`,
	PLAYER_URI = `${SpotifyEndpoints.USER_PROFILE_URI}/player`,
	USER_PLAYLISTS = `${SpotifyEndpoints.USER_PROFILE_URI}/playlists`,
	TRACK_BY_TRACK_ID = `${SpotifyEndpoints.MAIN_API_URI}/v1/tracks/`,
	PLAYLIST_URI = `${SpotifyEndpoints.MAIN_API_URI}/v1/playlists/`,
	USERS_URI = `${SpotifyEndpoints.MAIN_API_URI}/v1/users/`,
	PLAYBACK_DEVICES_URI = `${SpotifyEndpoints.PLAYER_URI}/devices`,
}


export default SpotifyEndpoints;
