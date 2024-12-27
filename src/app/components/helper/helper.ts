import SpotifyEndpoints from "@/utils/endpoints";
import Artist from "./interfaces/artist";
import SpotifyImage from "./interfaces/spotifyImage";

const  fetchSpotifyApi = async (url: string, stringifiedAuthHeader: string) => fetch(url, { headers: JSON.parse(stringifiedAuthHeader).headers }).then(res => res.json());


const capitalCaseInput = (input: string): string => {
	if (!input) {return input;}

	const trimInput = input.trim().replaceAll(" ", "+");
	let cleanInput = trimInput[0].toUpperCase();

	if (trimInput.length > 1) {
		for (let i=1; i < trimInput.length; i++) {
			const previousCharacter = trimInput[i - 1];

			if (previousCharacter === "+") {
				cleanInput += trimInput[i].toUpperCase();
			} else {
				cleanInput += trimInput[i];
			}
		}
	}

	return cleanInput;
};


export const artistIdCodeByName = async (artistName: string, stringifiedAuthHeader: string): Promise<string> => {
	const capitalCaseArtistName = capitalCaseInput(artistName);  
	const resultType = "&type=artist";
	const url = SpotifyEndpoints.QUERY_TERM + capitalCaseArtistName + resultType; 
	const artists: Artist[] = await fetchSpotifyApi(url, stringifiedAuthHeader).then(res => res.artists.items);
	const artistCode: string | undefined = artists.find(x => x.name === capitalCaseArtistName)?.id;

	if (typeof artistCode === "string") {
		return artistCode;
	}

	return artists[0].id;
}


export const artistNameAndImageById = async (artistId: string, stringifiedAuthHeader: string): Promise<[string, SpotifyImage]> => {
	const url = SpotifyEndpoints.ARTISTS_BY_ARTIST_CODE_URI + artistId;
	console.log(url);
	const artistData = await fetchSpotifyApi(url, stringifiedAuthHeader);
	const middleImage: SpotifyImage = artistData.images[1];
	const nameAndImage: [string, SpotifyImage] = [artistData.name, middleImage];

	return nameAndImage;

}
