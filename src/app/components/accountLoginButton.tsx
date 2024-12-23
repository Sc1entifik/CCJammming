"use client";
import { useState } from "react";
import { deleteAuthCookie, spotifyAccountLoginAuthorization } from "@/utils/serverActions";

export default function AccountLoginButton({connectionStatus}: {connectionStatus: boolean}) {
	const [isAccountConnected, setIsAccountConnected] = useState(connectionStatus);
	
	const loginButton = <button onClick={spotifyAccountLoginAuthorization}>Connect Spotify Account</button>;
	const logoutButton = <button onClick={() => {
		setIsAccountConnected(false);
		deleteAuthCookie();
		}
	}>Disconnect Spotify Account</button>;

	return isAccountConnected ? logoutButton : loginButton;
}
