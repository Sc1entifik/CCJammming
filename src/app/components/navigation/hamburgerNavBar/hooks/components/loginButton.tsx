"use client";
import { spotifyAccountLoginAuthorization } from "@/utils/serverActions";

export default function LoginButton({connectionStatus, handleClickAction}: {connectionStatus: boolean, handleClickAction: () => Promise<void>}) {
	const loginButton = <button onClick={spotifyAccountLoginAuthorization}>Connect Spotify Account</button>;
	const logoutButton = <button onClick={handleClickAction}>Disconnect Spotify Account</button>;

	return connectionStatus ? logoutButton : loginButton;
}
