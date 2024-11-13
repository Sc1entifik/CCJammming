export const generateRandomString = (stringLength: number): string => {
	const characterPool:string = generateCharacterPool();
	let randomString = "";

	for (let i=0; i<stringLength; i++) {
		const randomIndex = Math.floor(Math.random() * characterPool.length);
		randomString += characterPool[randomIndex];
	}

	return randomString;
};


const generateCharacterPool = ():string => {
	const letters = "abcdefghijklmnopqrstuvwxyz";
	const upperCaseLetters = letters.toUpperCase();
	const numbers = "1234567890";

	return letters + upperCaseLetters + numbers;
};


