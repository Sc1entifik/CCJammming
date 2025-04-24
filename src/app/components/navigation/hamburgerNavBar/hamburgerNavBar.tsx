import { cookies } from "next/headers";
import HamburgerMenu from "./hamburgerMenu/hamburgerMenu";
import NavBar from "./navBar/navBar";


export default async function HamburgerNavBar() {
	const cookieStore = await cookies();


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
