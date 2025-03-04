import { fetchSongList } from "@/utils/serverSideFetches";
import { useEffect, useState } from "react";

export default function useFetch(songName: string) {
	const [songList, setSongList] = useState(null);

	useEffect(() => {
		const songsFetch = async () => {
			const songs = await fetchSongList(songName);

			setSongList(songs);
		};

		songsFetch();
	}, [songName]);

	return songList;
}
