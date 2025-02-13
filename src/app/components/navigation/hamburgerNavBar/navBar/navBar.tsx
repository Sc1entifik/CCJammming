import Link from "next/link";
import { cookies } from "next/headers";
import AuthCookieElements from "../commonComponents/authCookieElements";


export default async function NavBar() { 
	const cookieStore = await cookies();

	return (
		<div className="flex">
			<p className="mr-3">
				<Link href="/tutorial">Site Tutorial</Link>
			</p>
			<p className="mr-3 text-2xl"> {">"} </p>
			<AuthCookieElements connectionStatus={cookieStore.has("auth")}/>
		</div>
	);
}
