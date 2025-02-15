"use client";
import { keySetter } from "@/utils/helper";
import useNavBarComponents from "../../../hooks/useNavBarComponents";
import HamburgerCloseIcon from "./hamburgerCloseIcon/hamburgerCloseIcon";


export default function SiteNavigationMenu({action, connectionStatus} : {action: () => void, connectionStatus: boolean}) {
	const navComponents = useNavBarComponents(connectionStatus);
	const setUniqueKey = keySetter();
	const hamburgerMenu = navComponents.filter(x => {
		if (x) {
			return true;
		} else {
			return false;
		}
	});
	const lastIndex = hamburgerMenu.length -1;

	return (
		<div className="absolute bg-background bg-opacity-70 w-full h-[100dvh] top-0 right-0">
			<button onClick={action} className="ml-[90vw] mt-8">
				<HamburgerCloseIcon/>
			</button>
			<div className="flex flex-col justify-evenly items-center h-screen border-t border-solid border-t-green-500">
			{hamburgerMenu.map((x,y) => y !== lastIndex ? <button key={setUniqueKey()} onClick={action}>{x}</button> : x)}
			</div>
		</div>
	);
}
