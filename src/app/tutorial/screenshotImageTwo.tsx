import Image from "next/image"

export default function ScreenshotImageTwo({src}: {src: string}) {
	return <Image alt="Jammming app screenshot image" src={src} height="2000" width="1000" style={{ width:"45rem", height:"auto", border:"gold solid", marginTop:".5rem", marginBottom:".5rem" }}/>
}
