"use client";

import { EpisodeObject, TrackObject } from "@/utils/fetchInterfaces";
import Image from "next/image";

export default function TrackGrid({playlistTrack}: {playlistTrack: TrackObject | EpisodeObject}) {
	const trackImageUrl = "album" in playlistTrack ? playlistTrack.album.images[0].url : playlistTrack.images[0].url;
	const trackAlbumImageStyle = {
		height: "4rem",
		width: "4rem",
		borderRadius: "5%",
	};
	

	return (
		<div className="grid grid-cols-subgrid col-span-2 gap-4 font-tropiLand text-sm">
			<Image alt="tiny track album cover" src={trackImageUrl} height={5000} width={5000} style={trackAlbumImageStyle}/>
			<p>{playlistTrack.name}</p>
		</div>
	);
}
