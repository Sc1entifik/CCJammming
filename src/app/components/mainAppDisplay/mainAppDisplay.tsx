import CurrentPlaylist from "@/components/currentPlaylist/currentPlaylist";
import MusicForm from "./musicForm";
import ArtistTopTracks from "./artistTopTracks/artistTopTracks";
import ArtistAlbums from "./albums/artistAlbums";
import Albums from "./albums/albums";
import Songs from "./songs/songs";
import JammmingPlayer from "./jammmingPlayer/jammmingPlayer";
import AccessToken from "./jammmingPlayer/accessToken";
import JammmingWebPlayer from "./jammmingPlayer/jammmingPlayer";

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
		<div>
			<MusicForm/>
			<div className="md:flex md:justify-evenly gap-y-8 gap-x-4 mt-4">
				{searchTermType && musicElement}
				<br className="sm:my-8"/>
				<CurrentPlaylist searchTerm={searchTerm} searchTermType={searchTermType}/>
			</div>
		</div>
	);
}
