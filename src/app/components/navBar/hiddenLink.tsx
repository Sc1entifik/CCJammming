import Link from "next/link";

export default function HiddenLink({connectionStatus}: {connectionStatus: boolean}) {
	const hiddenLink = connectionStatus && <p className="mr-3"><Link href="/setCurrentPlaylist" >Set Current Playlist</Link></p>

	return (
		<div className="flex">
			{hiddenLink}
			{connectionStatus && <p className="mr-3 text-2xl">{">"}</p>}
		</div>
	);
}
