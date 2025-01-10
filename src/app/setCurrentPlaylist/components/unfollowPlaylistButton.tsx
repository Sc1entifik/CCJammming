"use client"

import { unfollowCurrentPlaylist } from "@/utils/serverActions";
import Link from "next/link";

const spotifyRefollowLink = "https://support.spotify.com/us/article/save-recover-playlists/";

export default function UnfollowPlaylistButton() {
	return (
		<div className="flex flex-col items-center max-w-96 text-textColor mx-4">
			<h2>Unfollowing a playlist is the closest thing Spotify has to deleting a playlist from your account. To refollow a playlist after it has been unfollowed please <Link className="italic font-bold" href={spotifyRefollowLink}>follow the instructions from Spotify found in this link.</Link></h2>
			<br/>
			<button className="font-mono px-4 py-2 font-bold bg-sky-500 hover:bg-sky-900 rounded" onClick={unfollowCurrentPlaylist}>UNFOLLOW CURRENT PLAYLIST</button>
		</div>
	);
}
