"use client";
import { addItemsToCurrentPlaylist } from "@/utils/serverActions";
import { useTransition } from "react";


export default function AddTracksToPlaylist({trackUris, children} : {trackUris: string[], children: React.ReactNode}) {
	const [isPending, startTransition] = useTransition();
	const handleClick = () => startTransition(() => addItemsToCurrentPlaylist(trackUris));
	
	return <button   onClick={handleClick} className={`flex ${isPending ? "cursor-wait": "hover:cursor-pointer"}`}>{ children }</button>;
}
