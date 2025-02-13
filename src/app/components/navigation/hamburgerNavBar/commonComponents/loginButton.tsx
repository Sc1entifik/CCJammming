import { spotifyAccountLoginAuthorization } from "@/utils/serverActions";


export default function LoginButton({connectionStatus, handleClick}: {connectionStatus: boolean, handleClick: () => void}) {
	const loginButton = <button onClick={spotifyAccountLoginAuthorization}>Connect Spotify Account</button>;
	const logoutButton = <button onClick={handleClick}>Disconnect Spotify Account</button>;

	return <p>{connectionStatus ? logoutButton : loginButton}</p>;
}
