"use client";
import Image from "next/image";
import { keySetter } from "@/utils/helper";
import { useState } from "react";
import AlbumNameAndCover from "./albumNameAndCover";
import { Album } from "@/utils/fetchInterfaces";

interface SimplifiedTrackObject {
	name: string
	id: string
	is_playable: boolean
}

export default function AlbumTracksCollapse({album, tracks}: {album: Album, tracks: SimplifiedTrackObject[]}) {
	const [albumTracks, setAlbumTracks] = useState(null);
	const tinyAlbumCoverSize = 22;
	const setUniqueKey = keySetter();


	function expandAccordian() {
		albumTracks ? setAlbumTracks(null) : setAlbumTracks(() => tracks.map(x => [<Image key={setUniqueKey()} alt="tiny album cover" src={album.images[0].url} height={tinyAlbumCoverSize} width={tinyAlbumCoverSize} />,<p className="col-span-8 tracking-wide" key={setUniqueKey()}>{x.name}</p>])); 
	}

	
	const albumArtists = album.artists.map(x => x.name);

	return (
		<div>
			<div className="flex gap-9 items-center justify-center tracking-widest">
				<button onClick={expandAccordian}>
					{albumArtists}
					<AlbumNameAndCover album={album} albumCoverSize={90}/>
				</button>
				<p>add album to playlist </p>
			</div>
			<div className="grid grid-cols-9 gap-y-1 my-4">
				{albumTracks}
			</div>
		</div>


	);

}
