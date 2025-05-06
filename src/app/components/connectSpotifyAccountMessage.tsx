import { spotifyAccountLoginAuthorization } from "@/utils/serverActions";
import SiteMap from "@/utils/siteMap";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function ConnectSpotifyAccountMessage() {
	const cookieStore = await cookies();
	const connectAccountMessage = cookieStore.has("auth") ? <p className="max-w-prose mb-10 text-textColor">The Jammming app is now connected to your Spotify account. The next step is to select a playlist to modify.</p> : <button className="max-w-prose mb-10 text-textColor hover:text-sky-300" onClick={spotifyAccountLoginAuthorization}>Click here to connect your Spotify account to the Jammming playlist app.</button>;

	const selectCurrentPlaylistMessage = cookieStore.has("auth") ? <Link className="max-w-prose text-textColor hover:text-sky-300" href={SiteMap.SET_CURRENT_PLAYLIST}>Click here to choose a playlist to modify.</Link> : <p className="max-w-prose text-textColor">In order to modify your playlists with Jammming you need to first connect your Spotify account to the Jammming playlist app.</p>;

	return (
		<div className="font-tropiLand flex flex-col items-center px-6">
			<h1 className="max-w-prose text-4xl mb-10 text-textColor">In order to start Jammming the app needs your permission to modify your Spotify playlists.</h1>
			<h2 className="text-2xl">Step 1: Connect Your Spotify Account To Jammming.</h2>
			{connectAccountMessage}
			<h2 className="text-2xl">Step 2: Choose A Playlist To Modify</h2>
			{selectCurrentPlaylistMessage}
			<h1 className="max-w-prose text-xl font-sans text-textColor mt-40">This app uses only essential cookies in order to access the Spotify API on your behalf to help you modify your playlists. We do not track you, use, or otherwise store your data. For more info see the App Tutorial page.</h1>
		</div>
	);
}
