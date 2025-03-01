"use client";
import Albums from "./albums/albums";
import ArtistAlbums from "./albums/artistAlbums";
import ArtistTopTracks from "./artistTopTracks/artistTopTracks";
import Songs from "./songs/songs2";

export default function SearchBarElement({searchTerm, searchTermType}: {searchTerm: string, searchTermType: string}) {
	
	switch(searchTermType) {
		case "artistTopTracks": {
			//return <ArtistTopTracks artistName={searchTerm} />
			return <p>WTF</p>
		}

		case "albumsByArtist": {
			//return <ArtistAlbums artistName={searchTerm} />
			return <p>WTF</p>
		}

		case "albums": {
			//return <Albums albumName={searchTerm} />
			return <p>WTF</p>
		}

		case "songs": {
			return <Songs songName={searchTerm} />
			//return <p>WTF</p>
		}

		default: {
			return <p></p>
		}
	}
}
