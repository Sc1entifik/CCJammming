"use client";

import {PlaylistTrackObject} from "@/utils/fetchInterfaces";
import useElementUriHashMap from "./hooks/useElementUriHashMap";
import { useState } from "react";
import { keySetter } from "@/utils/helper";

export default function PlaylistReorder({playlistTracks} : {playlistTracks: PlaylistTrackObject[]}) {
	const elementUriMap = useElementUriHashMap(playlistTracks);
	const [draggableElements, setDraggableElements] = useState<React.ReactElement[]>(Array.from(elementUriMap.keys()));
	const [draggedElement, setDraggedElement] = useState<React.ReactElement | null>(null);
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
		},
	};


	return (
		<div className="grid grid-cols-2 gap-4 max-h-[66dvh] overflow-y-auto no-scrollbar">
			{draggableElements.map(element => 
				<div
					key={setUniqueKey()} 
					draggable 
					onDragStart={(e) => eventHandlers.onDragStart(e, element)} 
					onDragOver={eventHandlers.onDragOver}
					onDrop={(e) => eventHandlers.onDrop(e, element)}
					className="grid col-span-2 cursor-grab"
				>
					{element}
				</div> 
			)}
		</div>
	);


}
