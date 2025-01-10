import { cookies } from "next/headers";

import SimplifiedPlaylistObject from "./userPlaylistInterfaces";
import SpotifyEndpoints from "@/utils/endpoints";
import { keySetter, parseAuthHeaderFromCookieStore } from "@/utils/helper";
import { fetchUserProfile } from "@/utils/commonFetches";
import CurrentPlaylist from "@/app/components/currentPlaylist";
import Playlist from "./playlist";
import UnfollowPlaylistButton from "./unfollowPlaylistButton";

const oneHour = 60000 * 60;


export default async function UserPlaylists() {
	const url = SpotifyEndpoints.USER_PLAYLISTS;
	const cookieStore = await cookies();
	const authHeader = parseAuthHeaderFromCookieStore(cookieStore);
	const userPlaylists: SimplifiedPlaylistObject[] = await fetch(url, authHeader).then(res => res.json()).then(res => res.items); 
	const userId = await fetchUserProfile(authHeader).then(x => x.id); 
	const uniqueKeyGenerator = keySetter();
	const userOwnedPlaylists = userPlaylists
		.filter(x => x.owner.id === userId)
		.map(x => {
			const setCurrentPlaylist = async() => {
				"use server";
				const isProduction = Deno.env.get("SERVER_ENVIRONMENT") === "Production";
				const cookieStore = await cookies();

				cookieStore.set("currentPlaylist", x.id, {httpOnly: true, secure: isProduction, expires: Date.now() + oneHour});
			};
			
			return <Playlist key={uniqueKeyGenerator()} playlist={x} handleClick={setCurrentPlaylist}/>
		}
	);

	return (
		<div className="flex justify-between">
			<div className="flex flex-col mx-4">
			{userOwnedPlaylists}
			</div>
			{cookieStore.has("currentPlaylist") && 
			<div className="font-tropiLand">
				<h2 className="text-center">Current Playlist</h2>
				<br/>
				<CurrentPlaylist/>
			</div>
			}
			{cookieStore.has("currentPlaylist") && <UnfollowPlaylistButton/>}
		</div>
	);
}
