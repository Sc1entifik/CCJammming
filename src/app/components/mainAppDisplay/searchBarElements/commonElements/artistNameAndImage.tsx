import { cookies } from "next/headers";
import Image from "next/image";

import { fetchArtistDataByName } from "@/utils/commonFetches";
import { parseAuthHeaderFromCookieStore } from "@/utils/helper";
import { Artist } from "@/utils/fetchInterfaces";
import SpotifyLogo from "@/components/spotifyLogo/page";
import Link from "next/link";


const MediumArtistImage = ({artist}: {artist: Artist}) => {
	const mediumSizeImage = artist.images[1];
	const imageStyle = {
		width: "11rem",
		height: "11rem",
		borderRadius: "5%",
	};

	return <Image priority={true} alt={`${artist.name} portrait`} src={mediumSizeImage.url} style={imageStyle} width={5000} height={5000} />
}

export default async function ArtistNameAndImage({ artistName }: { artistName: string }) {
	const cookieStore = await cookies();
	const authHeader = parseAuthHeaderFromCookieStore(cookieStore);
	const artist: Artist = await fetchArtistDataByName(artistName, authHeader);
	

	return (
		<div className="flex flex-col items-center">
			<Link href={artist.external_urls.spotify} target="_blank">
				<SpotifyLogo remSize={13}/>
			</Link>
			<h2 className="font-tropiLand text-4xl text-center tracking-widest">{artist.name}</h2>
			<MediumArtistImage artist={artist} />
		</div>
	)
}
