import SpotifyApi from "@/utils/spotifyApi2";

export default async function AccessCode({ searchParams }: {searchParams: Promise<{[key: string]: string |  undefined }>}) {
	const {code="", state=""} = await searchParams;
	const spotifyFetchObject = new SpotifyApi(code);
	const artistAlbums = await spotifyFetchObject.requestArtistAlbums("kendrick lamar");
	const drakeData = await spotifyFetchObject.requestArtistData("drake");
	console.log(artistAlbums);


	return <h1 className="text-textColor font-tropiLand ml-3">Code: {code} - State: {state}</h1>;
}
