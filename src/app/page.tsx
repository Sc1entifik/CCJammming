import SpotifyApi from "@/utils/spotifyApi";
import ArtistTopTracks from "./components/artistTopTracks";
import MusicForm from "./components/musicForm";


export default async function AccessCode({ searchParams }: {searchParams: Promise<{[key: string]: string |  undefined }>}) {
	const {code="", state="", searchTerm="", searchTermType=""} = await searchParams;
	let musicElement;
	const spotifyApifetch = new SpotifyApi(code, state);
	
	switch (searchTermType) {
		case "artistTopTracks": {
			musicElement = <ArtistTopTracks artistTopTracks={await spotifyApifetch.requestArtistTopTracks(searchTerm)} artistData={await spotifyApifetch.requestArtistData(searchTerm)} />;
			break;
		}
		
		default: {
			musicElement = <p></p>
			break;
		}
	}

	return (
		<div>
			<MusicForm code={code} state={state} />
			{musicElement}
		</div>
		)
}
