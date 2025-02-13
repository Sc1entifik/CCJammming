import { keySetter } from "@/utils/helper";
import SiteMap from "@/utils/siteMap";
import Link from "next/link";
import LoginButton from "../commonComponents/loginButton";

export default function useNavBarComponents({connectionStatus, handleClick}: {connectionStatus: boolean, handleClick: () => void}) {
	interface NavBarComponent {
		type: string;
		element: JSX.Element;
	}

	const separator = {type: "separator", element: <span>{">"}</span>};
	const components: NavBarComponent[] = [
		{type: "link", element: <Link href={SiteMap.HOME}>Home Page</Link>},
		separator,
		{type: "link", element: <Link href={SiteMap.SITE_TUTORIAL}>App Tutorial</Link>},
		separator,
	];

	if (connectionStatus) {
		components.push({type: "link", element: <Link href={SiteMap.SET_CURRENT_PLAYLIST} /> });
		components.push(separator);
		components.push({type: "loginButton", element: <LoginButton connectionStatus={connectionStatus} handleClick={handleClick}/>});

	} else {
		components.push({type: "loginButton", element: <LoginButton connectionStatus={connectionStatus} handleClick={handleClick}/>});
	}

	return components;
}
