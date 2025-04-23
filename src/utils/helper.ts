import { AuthHeader } from "./fetchInterfaces";
import { CookieStore } from "./globalInterfaces";


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


export const reverseList = <T>(lst: T[]) => {
	let endIndex = lst.length - 1;
	const revList = [];

	while (endIndex >= 0) {
		revList.push(lst[endIndex]);
		endIndex -= 1;
	}

	return revList;
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


export const formattedErrorMessage = (helpfulDescription: string, err: string): string => {
	let lineBuffer = "";
	const errorUnderneath = "Read Below To See Full Error Message!"

	for (let i=0; i<helpfulDescription.length * 1.5; i++) {

		if (lineBuffer.length % 2 == 0) {
			lineBuffer += "*";
		} else {
			lineBuffer += "-";
		}
	} 

	return `\n${lineBuffer}\n${helpfulDescription}:\n${errorUnderneath}\n${lineBuffer}\n${err}`;
}


export const parseAuthHeaderFromCookieStore = (cookieStore: CookieStore): AuthHeader => {
	const authString = cookieStore.get("auth")?.value as string;

	return JSON.parse(authString).authHeader
};
