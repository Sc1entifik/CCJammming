export const validateQueryTerm = (queryTerm: string):string => {
	let validatedInput = "";

	for (let i=0; i<queryTerm.length; i++) {
		if (queryTerm[i] === " ") {
			validatedInput += "%2520";

		} else {
			validatedInput += queryTerm[i];
		}
	}

	return validatedInput;
};
