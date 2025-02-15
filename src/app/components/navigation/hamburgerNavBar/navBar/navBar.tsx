"use client";
import useNavBarComponents from "../hooks/useNavBarComponents";



export default function NavBar({connectionStatus}: {connectionStatus: boolean}) { 
	const navComponents = useNavBarComponents(connectionStatus);
	
	return (
		<div className="flex gap-4">
			{navComponents}
		</div>
	);
}
