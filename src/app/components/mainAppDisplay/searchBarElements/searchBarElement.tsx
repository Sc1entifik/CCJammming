import Albums from "./albums/albums";
import ArtistAlbums from "./albums/artistAlbums";
import ArtistTopTracks from "./artistTopTracks/artistTopTracks";
import Songs from "./songs/songs";

export default function SearchBarElement({searchTerm, searchTermType}: {searchTerm: string, searchTermType: string}) {

	switch(searchTermType) {
		case "artistTopTracks": {
			return <ArtistTopTracks artistName={searchTerm} />
		}

		case "albumsByArtist": {
			return <ArtistAlbums artistName={searchTerm} />
		}

		case "albums": {
			return <Albums albumName={searchTerm} />
		}

		case "songs": {
			return (
				<div>
					<Songs songName={searchTerm} />
				</div>);
		}

		default: {
			return <p></p>
		}
	}
}
