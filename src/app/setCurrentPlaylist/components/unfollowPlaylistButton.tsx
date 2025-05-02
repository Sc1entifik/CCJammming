"use client"

import SpotifyEndpoints from "@/utils/endpoints";
import { unfollowCurrentPlaylist } from "@/utils/serverActions";
import Link from "next/link";

export default function UnfollowPlaylistButton() {
	return (
		<div className="flex flex-col items-center max-w-96 text-textColor mx-4">
			<h2>Unfollowing a playlist is the closest thing Spotify has to deleting a playlist from your account. To refollow a playlist after it has been unfollowed please <Link className="italic font-bold" href={SpotifyEndpoints.SPOTIFY_RECOVER_PLAYLISTS}>follow the instructions from Spotify found in this link.</Link></h2>
			<br/>
			<button className="font-mono px-4 py-2 font-bold text-black bg-lime-300 hover:bg-amber-900 rounded" onClick={unfollowCurrentPlaylist}>UNFOLLOW CURRENT PLAYLIST</button>
		</div>
	);
}
