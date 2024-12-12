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
	const tinyImageHeight = albumImage.height / 3;
	const tinyImageWidth = albumImage.width / 3;
	const setUniqueKey = keySetter();

	function expandAccordian() {
		albumTracks? setAlbumTracks(null):setAlbumTracks(() => tracks.map(x => [<Image key={setUniqueKey()} alt="tiny album cover" src={albumImage.url} height={tinyImageHeight} width={tinyImageWidth} />,<p className="col-span-8" key={setUniqueKey()}>{x.name}</p>])); 
	}

	return (
		<div>
			<div className="flex gap-9 items-center">
				<Image src={albumImage.url} height={albumImage.height} width={albumImage.width} alt={`${album.name} Album Cover`} />
				<button className="col-span-3 max-w-36" onClick={expandAccordian}>{album.name}</button>
				<p>add to playlist</p>
			</div>
			<div className="grid grid-cols-9 gap-y-1 mt-4">
					{albumTracks}
			</div>
		</div>


	);

}
