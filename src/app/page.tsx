import ArtistTopTracks from "./components/artistTopTracks";
import MusicForm from "./components/musicForm";


export default async function AccessCode({ searchParams }: {searchParams: Promise<{[key: string]: string |  undefined }>}) {

	const {searchTerm="", searchTermType=""} = await searchParams;
	let musicElement;

	
	switch (searchTermType) {
		case "artistTopTracks": {
			musicElement = <ArtistTopTracks artistName={searchTerm}/>;
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
