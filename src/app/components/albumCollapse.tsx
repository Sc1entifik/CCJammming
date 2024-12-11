"use client";
import Image from "next/image";
import Album from "./helper/albumInterfaces";
import { keySetter } from "@/utils/helper";
import { useState } from "react";

interface SimplifiedTrackObject {
	name: string
	id: string
	is_playable: boolean
}

export default function AlbumCollapse({album, tracks}: {album: Album, tracks: SimplifiedTrackObject[]}) {
	const [albumTracks, setAlbumTracks] = useState(null);
	const albumImage = album.images[album.images.length -1];
	const setUniqueKey = keySetter();

	function expandAccordian() {
		albumTracks? setAlbumTracks(null):setAlbumTracks(() => tracks.map(x => [<p key={setUniqueKey()}>{x.name}</p>, <p key={setUniqueKey()}>+</p>])) 
	}

	return (
		<div>
			<Image src={albumImage.url} height={albumImage.height} width={albumImage.width} alt={`${album.name} Album Cover`} />
			<button className="col-span-3" onClick={expandAccordian}>{album.name}</button>
			{albumTracks}
			<p>+</p>

		</div>

	);

}
