"use client";
import { useState } from "react";
import { deleteAuthCookie } from "@/utils/serverActions";
import HiddenLink from "./hiddenLink";
import LoginButton from "./loginButton";

export default function AuthCookieElements({connectionStatus}: {connectionStatus: boolean}) {
	const [isAccountConnected, setIsAccountConnected] = useState(connectionStatus);

	const handleClick = () => {
		setIsAccountConnected(false);
		deleteAuthCookie();
	}

	return (
		<div className="flex">
			<HiddenLink connectionStatus={isAccountConnected} />
			<LoginButton connectionStatus={isAccountConnected} handleClick={handleClick}/>
		</div>
	);
}
