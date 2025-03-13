import SiteMap from "@/utils/siteMap";
import Link from "next/link";

export default function SetCurrentPlaylistMessage() {
	return (
		<div className="font-tropiLand flex flex-col items-center">
			<h1 className="text-4xl mb-10">You Do Not Have A Current Playlist Set To Reorder.</h1>
			<Link className="text-textColor hover:text-sky-300" href={SiteMap.SET_CURRENT_PLAYLIST}>Click here to choose a current playlist.</Link>
		</div>
	);
}
