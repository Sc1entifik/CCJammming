import { cookies } from "next/headers";
import Image from "next/image";

import SpotifyEndpoints from "@/utils/endpoints";
import { fetchSpotifyApi } from "./helper/helper";
import Track from "./trackInterfaces";


export default async function Song({songId}: {songId: string}) {
	const url = SpotifyEndpoints.TRACK_BY_TRACK_ID + songId;
	const options = await cookies().then(res => res.get("auth").value);
	const track: Track = await fetchSpotifyApi(url, options);
	const image = track.album.images[2];
	const trackName = track.name;

	return (
		<div>
			<Image src={image.url} height={image.height} width={image.width} alt="album cover" />
			<p className="font-tropiLand">{trackName}</p>
		</div>
	)
}
