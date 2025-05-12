"use client";

import { EpisodeObject, PlaylistTrackObject, TrackObject } from "@/utils/fetchInterfaces";
import React, { useMemo } from "react";
import { keySetter } from "@/utils/helper";
import TrackGrid from "../trackGrid";

const useElementTrackHashMap = (playlistTracks: PlaylistTrackObject[]) => {
	return useMemo(() =>	{
		const elementUriMap = new Map<React.ReactElement, TrackObject | EpisodeObject>();
		const setUniqueKey = keySetter();

		for (let i=0; i<playlistTracks.length; i++) {
			const track = playlistTracks[i].track;
			elementUriMap.set(React.createElement(TrackGrid, {key: setUniqueKey(), playlistTrack: track}), track);
		}

		return elementUriMap;
	}
		,[playlistTracks]);
}

export default useElementTrackHashMap;
