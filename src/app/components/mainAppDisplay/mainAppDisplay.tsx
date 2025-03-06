import CurrentPlaylist from "@/components/currentPlaylist/currentPlaylist";
import MusicForm from "./musicForm";
import SearchBarElement from "./searchBarElements/searchBarElement";
import { cookies } from "next/headers";
import JammmingPlayer from "./jammmingPlayer/jammmingPlayer";

export default async function MainAppDisplay({searchTerm, searchTermType}: {searchTerm: string, searchTermType: string}) {
	const cookieStore = await cookies();
	
	return (
		<div>
			{!searchTermType && 
				<div className="mb-16">
					<MusicForm/>
				</div>
			}

			{searchTermType && 
				<div className="md:flex md:justify-center gap-y-8 gap-x-32 mt-4">
					{cookieStore.has("sampleTrackUri") && <JammmingPlayer playerItemUri={cookieStore.get("sampleTrackUri")?.value}/>}
					<SearchBarElement searchTerm={searchTerm} searchTermType={searchTermType}/>
					<CurrentPlaylist searchTerm={searchTerm} searchTermType={searchTermType}/>
				</div>
			}
		</div>
	);
}
