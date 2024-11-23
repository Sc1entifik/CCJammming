interface MusicBox {
	requestArtistData: (artistName: string) => Promise<object>
	requestArtistTopTracks: (artistName: string) => Promise<object>
	requestArtistAlbums: (artistName: string) => Promise<object>
	requestAlbum: (albumName: string) => Promise<object>
}
