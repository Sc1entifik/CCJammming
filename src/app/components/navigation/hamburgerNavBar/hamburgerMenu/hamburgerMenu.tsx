"use client";

import { useState } from "react";
import HamburgerIcon from "./components/hamburgerIcon/hamburgerIcon";
import SiteNavigationMenu from "./components/siteNavigationMenu/siteNavigationMenu";

export default function HamburgerMenu({connectionStatus}: {connectionStatus: boolean}) {
	const [menuActivated, setMenuActivated] = useState(false);
	const handleClick = () => setMenuActivated(() => !menuActivated);
	const menuIcon = menuActivated ? <SiteNavigationMenu handleClick={handleClick} connectionStatus={connectionStatus} /> : <button onClick={handleClick}><HamburgerIcon /></button>;

	return menuIcon; 
}
