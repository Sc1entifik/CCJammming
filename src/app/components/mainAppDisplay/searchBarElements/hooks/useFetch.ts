import { commonFetches } from "@/utils/serverActions";
import { useEffect, useState } from "react";

export default function useFetch(fetchFunction, fetchQuery: string) {
	const [fetchItem, setFetchItem] = useState({});

	useEffect(() => {
		const obtainFetch = async () => {
			const itemFetch = await commonFetches(fetchFunction, fetchQuery);
			setFetchItem(itemFetch);
		};

		obtainFetch();
	}, [fetchFunction, fetchQuery]);

	return fetchItem;
}
