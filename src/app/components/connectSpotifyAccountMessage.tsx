import { spotifyAccountLoginAuthorization } from "@/utils/serverActions";
import SiteMap from "@/utils/siteMap";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function ConnectSpotifyAccountMessage() {
	const cookieStore = await cookies();
	const connectAccountMessage = cookieStore.has("auth") ? <p className="mb-10 text-textColor">The Jammming app is now connected to your Spotify account. The next step is to select a playlist to modify.</p> : <button className="mb-10 text-textColor hover:text-sky-300" onClick={spotifyAccountLoginAuthorization}>Click here to connect your Spotify account to the Jammming playlist app.</button>;

	const selectCurrentPlaylistMessage = cookieStore.has("auth") ? <Link className="text-textColor hover:text-sky-300" href={SiteMap.SET_CURRENT_PLAYLIST}>Click here to choose a playlist to modify.</Link> : <p className="text-textColor">In order to modify your playlists with Jammming you need to first connect your Spotify account to the Jammming playlist app.</p>;

	return (
		<div className="font-tropiLand flex flex-col items-center">
			<h1 className="text-4xl mb-10">In order to use Jammming the app needs permission to modify your playlists.</h1>
			<h2 className="text-2xl">Step 1: Connect Your Spotify Account To Jammming.</h2>
			{connectAccountMessage}
			<h2 className="text-2xl">Step 2: Choose A Playlist To Modify</h2>
			{selectCurrentPlaylistMessage}
		</div>
	);
}
