"use client"
import { useEffect } from "react";

interface SpotifyIFrameAPI {
	createController: (
		element: HTMLElement | null,
		options: {
			width: number,
			height: number, 
			uri: string,
		}, 
		callback: () => void
	) => void,
}

declare global {
	interface Window {
		onSpotifyIframeApiReady?: (IFrameAPI: SpotifyIFrameAPI) => void;
	}
}

export default function JammmingPlayer({ playerItemUri }: {playerItemUri: string}) {

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://open.spotify.com/embed/iframe-api/v1";
		script.async = true;
		document.body.appendChild(script);
		//sizing in px. The embeded player will not change smaller than this without condensing down with ungly scroll bars and things. You can size up from here on bigger screens but it actually looks pretty good this size on all screens.
		const width = 256; 
		const height = 131; 
		
		window.onSpotifyIframeApiReady = (IFrameAPI) => {
			const element = document.getElementById("embed-iframe");
			const options = {
				width,
				height,
				uri: playerItemUri,
			};

			const callback = () => {};
			
			IFrameAPI.createController(element, options, callback);
		}

	}, [playerItemUri]);


	return (
		<div className="flex justify-center">
			<div id="embed-iframe" className="ml-11" ></div>
		</div>
	);
}
