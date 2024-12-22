"use client";
import { useState } from "react";
import Link from "next/link";
import { deleteAuthCookie } from "@/utils/serverActions";

export default function AccountLoginButton({connectionStatus}: {connectionStatus: boolean}) {
	const [isAccountConnected, setIsAccountConnected] = useState(connectionStatus);
	
	const loginLink = <Link href="/login">Connect Spotify Account</Link>;
	const logoutButton = <button onClick={() => {
		setIsAccountConnected(false);
		deleteAuthCookie();
		}
	}>Disconnect Spotify Account</button>;

	return isAccountConnected ? logoutButton : loginLink;
}
