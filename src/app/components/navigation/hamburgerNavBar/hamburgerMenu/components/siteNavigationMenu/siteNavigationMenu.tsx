import AuthCookieElements from "../../../commonComponents/authCookieElements";
import HamburgerCloseIcon from "./hamburgerCloseIcon/hamburgerCloseIcon";
import Link from "next/link";


export default function SiteNavigationMenu({handleClick, connectionStatus} : {handleClick: () => void, connectionStatus: boolean}) {

	return (
		<div className="absolute bg-background bg-opacity-70 w-full h-[100dvh] top-0 right-0">
			<button onClick={handleClick} className="ml-[90vw] mt-8">
				<HamburgerCloseIcon/>
			</button>
			<div className="flex flex-col justify-evenly items-center h-screen border-t border-solid border-t-green-500">
				<button onClick={handleClick}>
					<Link href="/tutorial">Site Tutorial</Link>
				</button>
				<AuthCookieElements connectionStatus={connectionStatus}/>
			</div>
		</div>
	);
}
