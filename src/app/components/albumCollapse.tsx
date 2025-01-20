"use client";
import { keySetter } from "@/utils/helper";
import { useState } from "react";
import AlbumNameAndCover from "./albumNameAndCover";
import { Album } from "@/utils/fetchInterfaces";
import AlbumTrack from "./albumTracks";

interface SimplifiedTrackObject {
	name: string
	id: string
	is_playable: boolean
	uri: string
}


export default function AlbumTracksCollapse({album, tracks}: {album: Album, tracks: SimplifiedTrackObject[]}) {
	const [isExpanded, setIsExpanded] = useState(false);
	const setUniqueKey = keySetter();
	const albumCover = album.images[0];
	const albumTracks = tracks.map(x => <AlbumTrack key={setUniqueKey()} track={x} albumCover={albumCover}/>);

	function expandAccordian() {
		setIsExpanded(() => !isExpanded);
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
				{isExpanded && albumTracks}
		</div>


	);

}
