import { cookies } from "next/headers";
import Image from "next/image";

import SimplifiedPlaylistObject from "./userPlaylistInterfaces";
import SpotifyEndpoints from "@/utils/endpoints";
import { keySetter, parseAuthHeaderFromCookieStore } from "@/utils/helper";
import { fetchUserProfile } from "@/utils/commonFetches";

const mosaicImageSize = 200;
const oneHour = 60000 * 60;


export default async function UserPlaylists() {
	const url = SpotifyEndpoints.USER_PLAYLISTS;
	const authHeader = parseAuthHeaderFromCookieStore(await cookies());
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
		

		return (
			<button key={uniqueKeyGenerator()} className="font-tropiLand flex flex-col gap-3 mt-4" onClick={setCurrentPlaylist}>
				<h2 key={uniqueKeyGenerator()}>{x.name}</h2>
				{x.images && <Image key={uniqueKeyGenerator()} alt="Mosaic of playlist album covers" src={x.images[0].url} height={mosaicImageSize} width={mosaicImageSize} />}
				<p key={uniqueKeyGenerator()}>{x.description}</p>
			</button>
		);

	});

	return (
		<div>
			{userOwnedPlaylists}
		</div>
	);
}
