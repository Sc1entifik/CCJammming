"use client";
import { useState } from "react";
import { deleteAuthCookie, spotifyAccountLoginAuthorization } from "@/utils/serverActions";
import HiddenLink from "./hiddenLink";
import AccountLoginButton from "./accountLoginButton";

export default function AuthCookieElements({connectionStatus}: {connectionStatus: boolean}) {
	const [isAccountConnected, setIsAccountConnected] = useState(connectionStatus);

	const handleClick = () => {
		setIsAccountConnected(false);
		deleteAuthCookie();
	}

	return (
		<div className="flex">
			<HiddenLink connectionStatus={isAccountConnected} />
			<AccountLoginButton connectionStatus={isAccountConnected} handleClick={handleClick}/>
		</div>
	);
}
