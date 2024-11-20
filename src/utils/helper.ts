export const validateQueryTerm = (queryTerm: string):string => {
	const capitalizedQuery = toCapitalCase(queryTerm);
	let validatedInput = "";

	for (let i=0; i<queryTerm.length; i++) {
		if (queryTerm[i] === " ") {
			validatedInput += "+";

		} else {
			validatedInput += capitalizedQuery[i];
		}
	}

	return validatedInput;
};


const toCapitalCase = (queryTerm: string): string => {
	let validatedInput = "";

	for (let i=0; i<queryTerm.length; i++) {
		const currentLetter = queryTerm[i];

		if (i === 0 || queryTerm[i-1] === " ") {
			const capitalLetter = currentLetter.toUpperCase();
			validatedInput += capitalLetter;

		} else {
			validatedInput += currentLetter;

		}
	}

	return validatedInput;
}
