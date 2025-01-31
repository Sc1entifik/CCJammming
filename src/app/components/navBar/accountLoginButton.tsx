import { spotifyAccountLoginAuthorization } from "@/utils/serverActions";

type HandleClick = () => void;

export default function AccountLoginButton({connectionStatus, handleClick}: {connectionStatus: boolean, handleClick: HandleClick}) {
	const loginButton = <button onClick={spotifyAccountLoginAuthorization}>Connect Spotify Account</button>;
	const logoutButton = <button onClick={handleClick}>Disconnect Spotify Account</button>;

	return <p>{connectionStatus ? logoutButton : loginButton}</p>;
}
