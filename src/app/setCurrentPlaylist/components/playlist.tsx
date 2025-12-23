"use client";

import Image from "next/image";
import SimplifiedPlaylistObject from "./userPlaylistInterfaces";
import SpotifyLogo from "@/components/spotifyLogo/page";
import Link from "next/link";
import { useTransition } from "react";

const imageStyle = {
	height: "5.3rem",
	width: "5.3rem",
	borderRadius: "5%",
};


export default function Playlist({playlist, handleClick}: {playlist: SimplifiedPlaylistObject, handleClick: () => void}) {
const [isPending, startTransition] = useTransition();
const handleClickWithTransition = () => startTransition(() => handleClick() );

	return (
		<div className="m-4 flex flex-col snap-start snap-always scroll-mt-4">
			<Link href={playlist.external_urls.spotify} target="_blank">
				<SpotifyLogo remSize={7}/>
			</Link>
			<button className={`font-tropiLand flex flex-col items-center md:items-start gap-2 tracking-wider w-48 ${isPending ? "cursor-wait": "hover:cursor-pointer"}`} onClick={handleClickWithTransition}>
				<h2>{playlist.name}</h2>
				{playlist.images && <Image alt="Mosaic of playlist album covers" src={playlist.images[0].url} height={5000} width={5000} style={imageStyle}/>}
				<p className="text-textColor max-w-prose">{playlist.description}</p>
			</button>	
		</div>
	);
}
