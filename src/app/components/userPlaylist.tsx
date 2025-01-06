import { cookies } from "next/headers";

import SpotifyEndpoints from "@/utils/endpoints";
import SimplifiedPlaylistObject from "./userPlaylistInterfaces";
import SpotifyImage from "./helper/interfaces/spotifyImage";
import Image from "next/image";
import { keySetter } from "@/utils/helper";

export default async function UserPlaylists() {
	const url = SpotifyEndpoints.USER_PLAYLISTS;
	const authHeader = await cookies().then(res => res.get("auth").value);
	const userPlaylists: SimplifiedPlaylistObject[] = await fetch(url, { headers: JSON.parse(authHeader).headers }).then(res => res.json()).then(res => res.items);
	const currentUserId = await fetch(SpotifyEndpoints.USER_PROFILE_URI, { headers: JSON.parse(authHeader).headers }).then(res => res.json()).then(res => res.id);
	const smallestImage = (img: SpotifyImage[]): SpotifyImage => img[img.length -1]
	const uniqueKeyGenerator = keySetter();
	const userOwnedPlaylists = userPlaylists
		.filter(x => x.images !== null && x.owner.id === currentUserId)
		.map(x => (
			<div key={uniqueKeyGenerator()} className="font-tropiLand flex gap-5 mt-4">
				<Image key={uniqueKeyGenerator()} alt="Mosaic of playlist album covers" src={smallestImage(x.images).url} height={smallestImage(x.images).height} width={smallestImage(x.images).width} />
				<h2 key={uniqueKeyGenerator()}>{x.name}</h2>
				<p key={uniqueKeyGenerator()}>{x.description}</p>
			</div>
			
	));


	return (
		<div>
			{userOwnedPlaylists}
		</div>
	);
	
}
