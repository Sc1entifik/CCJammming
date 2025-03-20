"use client";

import {PlaylistTrackObject} from "@/utils/fetchInterfaces";
import useElementUriHashMap from "./hooks/useElementUriHashMap";
import { useEffect, useState } from "react";
import { keySetter } from "@/utils/helper";
import { updatePlaylistItems } from "@/utils/serverSideFetches";

export default function PlaylistReorder({playlistTracks} : {playlistTracks: PlaylistTrackObject[]}) {
	const elementUriMap = useElementUriHashMap(playlistTracks);
	const [draggableElements, setDraggableElements] = useState<React.ReactElement[]>(Array.from(elementUriMap.keys()));
	const [draggedElement, setDraggedElement] = useState<React.ReactElement | null>(null);
	const [isDisabled, setIsDisabled] = useState(true);
	const setUniqueKey = keySetter();

	const eventHandlers = {
		onDragStart: (e: React.DragEvent, element: React.ReactElement) => {
			setDraggedElement(element);
			e.dataTransfer.effectAllowed = "move";
		},
		onDragOver: (e: React.DragEvent) => {
			e.preventDefault();
		},
		onDrop: (e: React.DragEvent, targetElement: React.ReactElement) => {
			e.preventDefault();
			if (!draggedElement || draggedElement === targetElement) return;

			setDraggableElements((prev) => {
				const newOrder = [...prev];
				const draggedIndex = newOrder.indexOf(draggedElement);
				const targetIndex = newOrder.indexOf(targetElement);

				newOrder.splice(draggedIndex, 1);
				newOrder.splice(targetIndex, 0, draggedElement);
				return newOrder;
			});

			setDraggedElement(null);
			setIsDisabled(false);
		},
	};

	return (
		<div className="flex">
			<div className="text-textColor tracking-wide grid grid-cols-2 gap-4 border border-dotted border-y-sky-500 border-r-0 border-l-0 max-h-[62dvh] overflow-y-auto no-scrollbar">
				{draggableElements.map(element => (
					<div
						key={setUniqueKey()}
						draggable
						onDragStart={e => eventHandlers.onDragStart(e, element)}
						onDragOver={eventHandlers.onDragOver}
						onDrop={e => eventHandlers.onDrop(e, element)}
						className="grid col-span-2 cursor-grabbing"
						>
						{element}
					</div>
				))}
			</div>
			<button className="disabled:opacity-60 bg-gray-500 border rounded-md px-2 h-16 w-56 ml-8 text-textColor" disabled={isDisabled} onClick={() => {
				const uris = draggableElements.map(x => elementUriMap.get(x)) as string[];
				console.log(uris);
				updatePlaylistItems(uris);
				setIsDisabled(true);
				}}>Click To Reorder Playlist</button>
		</div>
	);
}
