import CurrentPlaylist from "@/components/currentPlaylist/currentPlaylist";
import MusicForm from "./musicForm";
import ArtistTopTracks from "./artistTopTracks/artistTopTracks";
import ArtistAlbums from "./albums/artistAlbums";
import Albums from "./albums/albums";
import Songs from "./songs/songs";

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
		<div className="flex justify-evenly max-h-[28rem]">
			<MusicForm />
			{musicElement}
			<CurrentPlaylist searchTerm={searchTerm} searchTermType={searchTermType}/>
		</div>
	);
}
