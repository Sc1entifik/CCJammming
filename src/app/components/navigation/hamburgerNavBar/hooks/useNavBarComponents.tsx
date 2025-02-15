"use client";
import SiteMap from "@/utils/siteMap";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteAuthCookie } from "@/utils/serverActions";
import { keySetter } from "@/utils/helper";
import LoginButton from "./components/loginButton";

export default function useNavBarComponents(connectionStatus: boolean) {
	const [isAccountConnected, setIsAccountConnected] = useState(connectionStatus);
	const router = useRouter();
	const setUniqueKey = keySetter();
	const separator = () => <span key={setUniqueKey()} className="hidden md:contents">{">"}</span>
	
	const handleClick = () => {
		setIsAccountConnected(() => !isAccountConnected);
		deleteAuthCookie();
		router.push(SiteMap.HOME);
		router.refresh();
	}

	const components = [
		<Link key={setUniqueKey()} href={SiteMap.HOME}>Home Page</Link>,
		separator(),
		<Link key={setUniqueKey()} href={SiteMap.SITE_TUTORIAL}>App Tutorial</Link>,
		separator(),
		isAccountConnected && <Link key={setUniqueKey()} href={SiteMap.SET_CURRENT_PLAYLIST}>Set Current Playlist</Link>,
		isAccountConnected && separator(),
		<LoginButton key={setUniqueKey()} connectionStatus={isAccountConnected} handleClick={handleClick} />
	];

	return components;
}
