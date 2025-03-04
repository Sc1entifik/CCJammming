import CurrentPlaylist from "@/components/currentPlaylist/currentPlaylist";
import MusicForm from "./musicForm";
import SearchBarElement from "./searchBarElements/searchBarElement";

export default async function MainAppDisplay({searchTerm, searchTermType}: {searchTerm: string, searchTermType: string}) {
	
	return (
		<div>
			<MusicForm/>
			<div className="md:flex md:justify-evenly gap-y-8 gap-x-4 mt-4">
				{searchTermType && <SearchBarElement searchTerm={searchTerm} searchTermType={searchTermType}/>}
				<br className="sm:my-8"/>
				<CurrentPlaylist searchTerm={searchTerm} searchTermType={searchTermType}/>
			</div>
		</div>
	);
}
