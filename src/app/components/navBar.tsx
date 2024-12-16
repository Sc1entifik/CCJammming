import { cookies } from "next/headers";
import Link from "next/link";

export default async function NavBar() {
	const cookieStore = await cookies();
	const loginText = cookieStore.has("auth")? "Connect Spotify Account": "Disconnect Spotify Account";

	return (
		<div className="flex">
			<p className="mr-3">
				<Link href="/tutorial">Site Tutorial</Link>
			</p>
			<p className="mr-3 text-2xl"> > </p>
			<p className="mr-3">
				<Link href="/login">{loginText}</Link>
			</p>
		</div>
	);
}
