import { cookies } from "next/headers";

import SimplifiedPlaylistObject from "./userPlaylistInterfaces";
import SpotifyEndpoints from "@/utils/endpoints";
import { keySetter, parseAuthHeaderFromCookieStore } from "@/utils/helper";
import { fetchUserProfile } from "@/utils/commonFetches";
import Playlist from "./playlist";
import UnfollowPlaylistButton from "./unfollowPlaylistButton";
import NewPlaylistForm from "./newPlaylistForm";
import CurrentPlaylist from "@/components/currentPlaylist/currentPlaylist";

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
				const isProduction = process.env.SERVER_ENVIRONMENT === "Production";
				const cookieStore = await cookies();

				cookieStore.set("currentPlaylist", x.id, {httpOnly: true, secure: isProduction, expires: Date.now() + oneHour});
			};
			
			return <Playlist key={uniqueKeyGenerator()} playlist={x} handleClick={setCurrentPlaylist}/>
		}
	);

	return (
		<div className="flex flex-col items-center md:flex-row md:justify-evenly md:items-start my-4 gap-y-4">
			<div className="flex flex-col m-4">
				<h2 className="font-tropiLand tracking-wider">Add New Playlist</h2>
				<NewPlaylistForm />
				<h2 className="font-tropiLand text-textColor tracking-wider">Scroll To See All Your Playlists</h2>
				<h2 className="font-tropiLand text-textColor tracking-wider">Choose A Playlist To Modify</h2>
				<div className=" max-h-[47dvh] overflow-y-auto no-scrollbar snap-y snap-mandatory">
				{userOwnedPlaylists}
				</div>
			</div>
			{cookieStore.has("currentPlaylist") && 
			<div className="font-tropiLand">
				<h2 className="text-center">Current Playlist</h2>
				<CurrentPlaylist searchTerm="" searchTermType="" urlBase="setCurrentPlaylist"/>
			</div>
			}
			{cookieStore.has("currentPlaylist") && <UnfollowPlaylistButton/>}
		</div>
	);
}
