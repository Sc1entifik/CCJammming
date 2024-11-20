import SpotifyOAuth from "@/utils/sampleFetch";

export default async function AccessCode({ searchParams }: {searchParams: Promise<{[key: string]: string |  undefined }>}) {
	const {code = "No Code", state = "No State"} = await searchParams;
	const spotifyFetchObject = new SpotifyOAuth(code);
	const profileObject = await spotifyFetchObject.requestUserPlaylists();
	console.log(profileObject);

	return <h1>Code: {code} State: {state}</h1>;
}
