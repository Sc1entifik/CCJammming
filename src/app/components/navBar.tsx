import Link from "next/link";
import AccountLoginButton from "./accountLoginButton";
import { cookies } from "next/headers";

export default async function NavBar() { 
	const cookieStore = await cookies();

	return (
		<div className="flex">
			<p className="mr-3">
				<Link href="/tutorial">Site Tutorial</Link>
			</p>
			<p className="mr-3 text-2xl"> {">"} </p>
			<p className="mr-3">
				<AccountLoginButton connectionStatus={cookieStore.has("auth")}/>
			</p>
		</div>
	);
}
