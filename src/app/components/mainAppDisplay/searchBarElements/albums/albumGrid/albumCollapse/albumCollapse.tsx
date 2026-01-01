"use client";
import { useEffect, useState } from "react";
import { Album } from "@/utils/fetchInterfaces";
import AddTracksToPlaylist from "../../../commonElements/addTracksToPlaylist";
import AlbumTrack from "./albumTracks";
import AlbumNameAndCover from "../../../commonElements/albumNameAndCover";
import TrackUriButton from "../../../commonElements/trackUriButton";
import Link from "next/link";
import SpotifyLogo from "@/components/spotifyLogo/page";

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

	const albumCover = album.images[0];


	function expandAccordian() {
		setIsExpanded(() => !isExpanded);
	}
	
	const albumArtists = album.artists.map((x,y) => <p key={y}>{x.name}</p>);

	return (
		<div className="snap-start">
			<div className="xl:flex sm:gap-9 sm:items-center sm:justify-center sm:tracking-widest">
				<div>
					<Link href={album.external_urls.spotify} target="_blank"><SpotifyLogo remSize={7}/></Link>
					<button onClick={expandAccordian}>
						{albumArtists}
						<AlbumNameAndCover album={album} albumCoverSize={5.5}/>
					</button>
				</div>
				<AddTracksToPlaylist trackUris={tracks.map(x => x.uri)}>
					<p>add album to playlist </p>
				</AddTracksToPlaylist>
			</div>
			<div className="grid grid-cols-2 justify-items-center gap-4">
				{isExpanded && tracks.map((x,y) => [<AlbumTrack key={y} track={x} albumCover={albumCover}/>, <TrackUriButton key={x.uri} trackUri={x.uri}/>])}
			</div>
		</div>
	);
}
