import CurrentPlaylist from "@/components/currentPlaylist/currentPlaylist";
import MusicForm from "./musicForm";
import SearchBarElement from "./searchBarElements/searchBarElement";

export default function MainAppDisplay({searchTerm, searchTermType}: {searchTerm: string, searchTermType: string}) {
	
	return (
		<div>
			{!searchTermType && 
				<div className="mb-16">
					<MusicForm/>
				</div>
			}

			{searchTermType && 
				<div className="md:flex md:justify-center gap-y-8 gap-x-32 mt-4">
					<SearchBarElement searchTerm={searchTerm} searchTermType={searchTermType}/>
					<CurrentPlaylist searchTerm={searchTerm} searchTermType={searchTermType}/>
				</div>
			}
		</div>
	);
}
