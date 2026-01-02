import Image from "next/image";

export default function ScreenshotImageOne({src}: {src: string}) {
	return <Image alt="Jammming app screenshot image" src={src} height="1600" width="900" style={{ width:"45rem", height:"auto", border:"gold solid", marginTop:".5rem", marginBottom:".5rem" }}/>
}
