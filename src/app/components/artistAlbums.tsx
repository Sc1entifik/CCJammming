import SpotifyEndpoints from "@/utils/endpoints";
import { cookies } from "next/headers";
import { artistIdCodeByName, artistNameAndImageById } from "./helper/helper";
import { keySetter } from "@/utils/helper";
import Image from "next/image";
import Album from "./helper/albumInterfaces";
import AlbumGrid from "./albumGrid";

const lastIndex = (arr: any[]): number => arr.length - 1;

export default async function ArtistAlbums({artistName}: {artistName: string}) {
	const authHeader = await cookies().then(res => res.get("auth").value);
	const artistId = await artistIdCodeByName(artistName, authHeader);
	const [cleanArtistName, artistImageObject] = await artistNameAndImageById(artistId, authHeader);
	const url = SpotifyEndpoints.ARTISTS_BY_ARTIST_CODE_URI + artistId + "/albums";
	const albums: Album = await fetch(url, {headers: JSON.parse(authHeader).headers}).then(res => res.json());
	const setUniqueKey = keySetter();

	return (
		<div className="flex flex-col items-center font-tropiLand">
			<h2 className="text-6xl">{cleanArtistName}</h2>
			<Image src={artistImageObject.url} height={artistImageObject.height} width={artistImageObject.width} alt="Artist Picture"/>
			<div className="flex flex-col items-center">
			{albums.items.map(x => <AlbumGrid key={setUniqueKey()} album={x}/> )}
			</div>
		</div>
	);
}
