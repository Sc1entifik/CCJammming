import { cookies } from "next/headers";
import Image from "next/image";

import { fetchArtistDataByName } from "@/utils/commonFetches";
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
	const imageStyle = {
		width: "11rem",
		height: "11rem",
	};

	return <Image alt={`${artist.name} portrait`} src={mediumSizeImage.url} style={imageStyle} width={5000} height={5000} />
}

export default async function ArtistNameAndImage({ artistName }: { artistName: string }) {
	const cookieStore = await cookies();
	const authHeader = parseAuthHeaderFromCookieStore(cookieStore);
	const artist: ArtistObject = await fetchArtistDataByName(artistName, authHeader);
	

	return (
		<div className="flex flex-col items-center">
			<h2 className="font-tropiLand text-4xl text-center tracking-widest">{artist.name}</h2>
			<MediumArtistImage artist={artist} />
		</div>
	)
}
