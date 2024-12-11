import SpotifyEndpoints from "@/utils/endpoints";
import Album from "./helper/albumInterfaces";
import { cookies } from "next/headers";
import Image from "next/image";
import AlbumCollapse from "./albumCollapse";

interface SimplifiedTrackObject {
	name: string
	id: string
	is_playable: boolean
}


export default async function AlbumGrid({album}: {album: Album}) {
	const url = SpotifyEndpoints.ALBUM_BY_ALBUM_CODE_URI + `${album.id}/tracks`;
	const authHeader = await cookies().then(res => res.get("auth").value);
	const albumTracks: SimplifiedTrackObject[] = await fetch(url, {headers: JSON.parse(authHeader).headers}).then(res => res.json()).then(res => res.items).catch(error => {
		console.log("albumTracks fetch errored out!!!");
		console.error(error);
	});

	return <AlbumCollapse album={album} tracks={albumTracks} /> 
}
