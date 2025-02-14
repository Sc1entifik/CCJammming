"use client";
import { keySetter } from "@/utils/helper";
import { useEffect, useState } from "react";
import { Album } from "@/utils/fetchInterfaces";
import AlbumTrack from "./albumTracks";
import AlbumNameAndCover from "../../../commonElements/albumNameAndCover";
import AddTracksToPlaylist from "../../../commonElements/addTracksToPlaylist";

interface SimplifiedTrackObject {
	name: string
	id: string
	is_playable: boolean
	uri: string
}


export default function AlbumTracksCollapse({album, tracks}: {album: Album, tracks: SimplifiedTrackObject[]}) {
	const [isExpanded, setIsExpanded] = useState(false);
	useEffect(() => () => {
		setIsExpanded(false)
		}, []);

	const setUniqueKey = keySetter();
	const albumCover = album.images[0];


	function expandAccordian() {
		setIsExpanded(() => !isExpanded);
	}
	
	const albumArtists = album.artists.map(x => x.name);

	return (
		<div>
			<div className="flex gap-9 items-center justify-center tracking-widest">
				<button onClick={expandAccordian}>
					{albumArtists}
					<AlbumNameAndCover album={album} albumCoverSize={5.5}/>
				</button>
				<AddTracksToPlaylist trackUris={tracks.map(x => x.uri)}>
					<p>add album to playlist </p>
				</AddTracksToPlaylist>
			</div>
			<div className="flex flex-col gap-2">
				{isExpanded && tracks.map(x => <AlbumTrack key={setUniqueKey()} track={x} albumCover={albumCover}/>)}
			</div>
	</div>
	);
}
