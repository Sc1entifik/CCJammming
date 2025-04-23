import { Iframe } from "@/utils/globalInterfaces";

export {};

declare global {
	interface Window {
		onSpotifyIframeApiReady: (iFrame: Iframe) => void;
	}
}
