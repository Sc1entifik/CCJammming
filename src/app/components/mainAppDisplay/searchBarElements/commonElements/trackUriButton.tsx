"use client";
import { createSampleTrackUriCookie } from "@/utils/serverActions";

export default function TrackUriButton({ trackUri }: { trackUri: string }) {
	return <button className="hover:cursor-pointer" onClick={() => {
		const reloadPageAfterCookie = async () => {
			await createSampleTrackUriCookie(trackUri);
			location.reload();
		}
		reloadPageAfterCookie();
	}}>Click For Play Sample</button>
}
