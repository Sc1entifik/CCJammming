"use client"
import { Iframe } from "@/utils/globalInterfaces";
import { useEffect } from "react";


export default function JammmingPlayer({ playerItemUri }: {playerItemUri: string}) {

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://open.spotify.com/embed/iframe-api/v1";
		script.async = true;
		document.body.appendChild(script);
		//sizing in px. The embeded player will not change smaller than this without condensing down with ungly scroll bars and things. You can size up from here on bigger screens but this size actually looks pretty good on all screens.
		const width = 280; 
		const height = 131; 
		
		window.onSpotifyIframeApiReady = (IFrameAPI: Iframe) => {
			const element = document.getElementById("embed-iframe") as HTMLElement;
			const options = {
				width,
				height,
				uri: playerItemUri,
			};

			const callback = <T,>(EmbedController: T) => EmbedController;
			
			IFrameAPI.createController(element, options, callback);
		}

	}, [playerItemUri]);


	return (
		<div className="flex justify-center">
			<div id="embed-iframe" className="ml-11" ></div>
		</div>
	);
}
