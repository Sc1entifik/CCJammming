"use client";
import { keySetter } from "@/utils/helper";
import { useEffect, useState } from "react";
import { Album } from "@/utils/fetchInterfaces";
import AddTracksToPlaylist from "../../../commonElements/addTracksToPlaylist";
import AlbumTrack from "./albumTracks";
import AlbumNameAndCover from "../../../commonElements/albumNameAndCover";
import TrackUriButton from "../../../commonElements/trackUriButton";

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
	
	const albumArtists = album.artists.map(x => <p key={setUniqueKey()}>{x.name}</p>);

	return (
		<div>
			<div className="lg:flex sm:gap-9 sm:items-center sm:justify-center sm:tracking-widest">
				<button onClick={expandAccordian}>
					{albumArtists}
					<AlbumNameAndCover album={album} albumCoverSize={5.5}/>
				</button>
				<AddTracksToPlaylist trackUris={tracks.map(x => x.uri)}>
					<p>add album to playlist </p>
				</AddTracksToPlaylist>
			</div>
			<div className="grid grid-cols-2 justify-items-center gap-4">
				{isExpanded && tracks.map(x => [<AlbumTrack key={setUniqueKey()} track={x} albumCover={albumCover}/>, <TrackUriButton key={setUniqueKey()} trackUri={x.uri}/>])}
			</div>
		</div>
	);
}
