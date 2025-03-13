enum SiteMap {
	HOME = "http://192.168.2.4:3000",//"/"
	SITE_TUTORIAL = `${SiteMap.HOME}/tutorial`, //"/tutorial"
	SET_CURRENT_PLAYLIST = `${SiteMap.HOME}/setCurrentPlaylist`, //"/setCurrentPlaylist"
	REORDER_PLAYLIST = `${SiteMap.HOME}/reorderPlaylist`,
}

export default SiteMap;
