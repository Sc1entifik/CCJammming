import MusicForm from "./components/musicForm";
import ArtistTopTracks from "./components/artistTopTracks";
import ArtistAlbums from "./components/artistAlbums";
import Albums from "./components/albums";


export default async function AccessCode({ searchParams }: {searchParams: Promise<{[key: string]: string |  undefined }>}) {

	const {searchTerm="", searchTermType=""} = await searchParams;
	let musicElement;

	
	switch (searchTermType) {
		case "artistTopTracks": {
			musicElement = <ArtistTopTracks artistName={searchTerm}/>;
			break;
		}

		case "albumsByArtist": {
			musicElement = <ArtistAlbums artistName={searchTerm} />
			break;
		}

		case "albums": {
			musicElement = <Albums albumName={searchTerm}/>
			break;
		}
		
		default: {
			musicElement = <p></p>
			break;
		}
	}

	return (
		<div>
			<MusicForm />
			{musicElement}
		</div>
		);
}
