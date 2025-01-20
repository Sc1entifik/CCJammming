"use client"

import { addItemsToCurrentPlaylist } from "@/utils/serverActions";


export default function AddTracksToPlaylist({trackUris, children} : {trackUris: string[], children: React.ReactNode}) {
	const handleClick = () => addItemsToCurrentPlaylist(trackUris);
	
	return <button onClick={handleClick} className="flex">{children}</button>;
}
