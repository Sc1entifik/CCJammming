import { validateQueryTerm } from "@/utils/helper";
import Albums from "./albums";
import ArtistAlbums from "./artistAlbums";
import ArtistTopTracks from "./artistTopTracks";
import CurrentPlaylist from "./currentPlaylist";
import MusicForm from "./musicForm";
import Songs from "./songs";

export default async function MainAppDisplay({searchTerm, searchTermType}: {searchTerm: string, searchTermType: string}) {
	let musicElement;

	switch(searchTermType) {
		case "artistTopTracks": {
			musicElement = <ArtistTopTracks artistName={searchTerm}/>;
			break;
		}

		case "albumsByArtist": {
			musicElement = <ArtistAlbums artistName={searchTerm}/>;
			break;
		}

		case "albums": {
			musicElement = <Albums albumName={searchTerm}/>
			break;
		}

		case "songs": {
			musicElement = <Songs songName={searchTerm}/>
			break;
		}

		default: {
			musicElement = <p></p>;
			break;
		}
	}

	return(
		<div className="flex justify-evenly max-h-7">
			<MusicForm />
			{musicElement}
			<CurrentPlaylist/>
		</div>
	);
}
