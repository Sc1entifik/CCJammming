"use client";

import SiteMap from '@/utils/siteMap';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


export default function Error({	error, reset, }: { error: Error & { digest?: string }, reset: () => void }) {
	useEffect(() => {
		console.error(error);
	}, [error]);
	const router = useRouter();


	return (
			<div className='flex flex-col items-center justify-around min-h-[22dvi]'>
			<div>
				<h2 className='font-bounce text-4xl tracking-wider'>Something went wrong!</h2>
				<h2 className='font-bounce text-2xl text-textColor tracking-wider'>You likely got here for one of the following reasons</h2>
			</div>

			<div>
				<ul className='text-textColor text-lg list-disc list-inside space-y-2'>
					<li>You have been Jammming for a while and you need to reconnect your account to keep Jammming!</li>
					<li>You searched for something that the Spotify API could not find. Check your spelling and your spacing.</li>
				</ul>
			</div>

			<button className='font-bounce text-2xl tracking-wider' onClick={() => {
				reset();
				router.push(SiteMap.HOME);

				}}>Home Page</button>
		</div>
	);
}

