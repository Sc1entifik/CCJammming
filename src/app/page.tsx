import SpotifyApi from "@/utils/spotifyApi";
import ArtistTopTracks from "./components/artistTopTracks";
import MusicForm from "./components/musicForm";
import { cookies } from "next/headers";


export default async function AccessCode({ searchParams }: {searchParams: Promise<{[key: string]: string |  undefined }>}) {

	const {searchTerm="", searchTermType=""} = await searchParams;
	let musicElement;
	const cookieStore = await cookies();
	const spotifyApifetch = cookieStore.has("auth")? new SpotifyApi(cookieStore.get("auth")?.value as string) : new SpotifyApi("");

	
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
