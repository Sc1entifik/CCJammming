import { cookies } from "next/headers";
import HamburgerMenu from "./hamburgerMenu/hamburgerMenu";
import NavBar from "./navBar/navBar";


export default async function HamburgerNavBar() {
	const cookieStore = await cookies();
	const redirectObject = cookieStore.has("rediretUrl") ? cookieStore.get("redirectUrl")?.value : "/";
	let redirectUrl;
	if (typeof redirectObject === "string") {
		redirectUrl = redirectObject;
	} else {
		redirectUrl = "/";
	}

	return (
		<div>
			<div className="md:hidden">
				<HamburgerMenu connectionStatus={cookieStore.has("auth")}/>
			</div>
			<div className="hidden md:contents">
				<NavBar connectionStatus={cookieStore.has("auth")}/>
			</div>
		</div>
	);
}
