import CurrentPlaylist from "@/components/currentPlaylist/currentPlaylist";
import MusicForm from "./musicForm";
import SearchBarElement from "./searchBarElements/searchBarElement";
import { cookies } from "next/headers";
import JammmingPlayer from "./jammmingPlayer/jammmingPlayer";

export default async function MainAppDisplay({searchTerm, searchTermType}: {searchTerm: string, searchTermType: string}) {
	const cookieStore = await cookies();
	
	return (
		<div className="max-h-[84dvh] flex flex-col items-center xl:flex-row xl:items-start">
			{!searchTermType && 
				<div className="flex justify-center items-center w-full h-[70dvh]">
					<MusicForm/>
				</div>
			}

			{searchTermType && 
				<div className="flex flex-col items-center xl:flex-row xl:items-start xl:justify-around gap-y-8 gap-x-32 w-full">
					<div className="flex flex-col">
						{cookieStore.has("sampleTrackUri") && <JammmingPlayer playerItemUri={cookieStore.get("sampleTrackUri")?.value as string}/>}
						<SearchBarElement searchTerm={searchTerm} searchTermType={searchTermType}/>
					</div>

					<div className="mt-12 md:mt-0 lg:pr-6">
						<CurrentPlaylist searchTerm={searchTerm} searchTermType={searchTermType} urlBase=""/>
					</div>
				</div>
			}
		</div>
	);
}
