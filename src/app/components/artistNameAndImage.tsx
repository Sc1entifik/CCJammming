import { fetchArtistDataByName } from "@/utils/commonFetches";
import SpotifyEndpoints from "@/utils/endpoints";
import Image from "next/image";

interface ArtistObject {
	name: string
	images: {
		url: string
		height: number
		width: number
	}[]
}

const mediumArtistImage = (x: ArtistObject) => {
	const mediumSizeImage = x.images[1];

	return <Image alt={`${x.name} portrait`} src={mediumSizeImage.url} height={mediumSizeImage.height} width={mediumSizeImage.width} />
}

export default async function ArtistNameAndImage({ artistName, authHeader }: { artistIdCode: string, authHeader: string }) {
	const artist: ArtistObject = await fetchArtistDataByName(artistName, authHeader);
}
