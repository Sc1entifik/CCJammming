import { cookies } from "next/headers";
import Image from "next/image";

import { fetchArtistDataByName } from "@/utils/commonFetches";
import SpotifyEndpoints from "@/utils/endpoints";
import ArtistTopTracks from "./artistTopTracks";
import { parseAuthHeaderFromCookieStore } from "@/utils/helper";

interface ArtistObject {
	name: string
	images: {
		url: string
		height: number
		width: number
	}[]
}

const MediumArtistImage = ({artist}: {artist: ArtistObject}) => {
	const mediumSizeImage = artist.images[1];

	return <Image alt={`${artist.name} portrait`} src={mediumSizeImage.url} height={mediumSizeImage.height} width={mediumSizeImage.width} />
}

export default async function ArtistNameAndImage({ artistName }: { artistName: string }) {
	const cookieStore = await cookies();
	const authHeader = parseAuthHeaderFromCookieStore(cookieStore);
	const artist: ArtistObject = await fetchArtistDataByName(artistName, authHeader);
	

	return (
		<div>
			<h2 className="font-tropiLand text-4xl text-center tracking-widest">{artist.name}</h2>
			<MediumArtistImage artist={artist} />
		</div>
	)
}
