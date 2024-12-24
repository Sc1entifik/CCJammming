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


export const keySetter = (x=-1) => () => {
	x += 1;

	return x;
};


const generateCharacterPool = ():string => {
	const letters = "abcdefghijklmnopqrstuvwxyz";
	const upperCaseLetters = letters.toUpperCase();
	const numbers = "1234567890";

	return letters + upperCaseLetters + numbers;
};



export const validateQueryTerm = (queryTerm: string):string => {
	const trimmedInput = queryTerm.trim();
	const capitalizedQueryTerm = toCapitalCase(trimmedInput);
	let validatedInput = "";

	for (let i=0; i<capitalizedQueryTerm.length; i++) {
		if (capitalizedQueryTerm[i] === " ") {
			validatedInput += "+";

		} else {
			validatedInput += capitalizedQueryTerm[i];
		}
	}

	return validatedInput;
};


export const generateRandomString = (stringLength: number): string => {
	const characterPool:string = generateCharacterPool();
	let randomString = "";

	for (let i=0; i<stringLength; i++) {
		const randomIndex = Math.floor(Math.random() * characterPool.length);
		randomString += characterPool[randomIndex];
	}

	return randomString;
};


export const parseAuthHeaderFromCookieStore = (cookieStore: object) => JSON.parse(cookieStore.get("auth").value).authHeader;
