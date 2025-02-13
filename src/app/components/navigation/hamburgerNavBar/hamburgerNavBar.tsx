import { cookies } from "next/headers";
import HamburgerMenu from "./hamburgerMenu/hamburgerMenu";
import NavBar from "./navBar/navBar";

export default async function HamburgerNavBar() {
	return (
		<div>
			<div className="md:hidden">
				<HamburgerMenu connectionStatus={await cookies().then(x => x.has("auth"))}/>
			</div>
			<div className="hidden md:contents">
				<NavBar/>
			</div>
		</div>
	);
}
