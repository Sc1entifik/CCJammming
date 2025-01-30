import { cookies } from "next/headers"
import ConnectSpotifyAccountMessage from "./components/connectSpotifyAccountMessage";
import MainAppDisplay from "./components/mainAppDisplay/mainAppDisplay";

export default async function MainApp({ searchParams }: { searchParams: Promise<{[key: string]: string | undefined}> }) {
	const cookieStore = await cookies();

	if (cookieStore.has("auth") && cookieStore.has("currentPlaylist")) {
		const {searchTerm="", searchTermType=""} = await searchParams;

		return <MainAppDisplay searchTerm={searchTerm} searchTermType={searchTermType}/>

	} else {
		return <ConnectSpotifyAccountMessage/>
	}
	
}
