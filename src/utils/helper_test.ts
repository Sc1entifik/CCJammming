import { assertEquals } from "jsr:@std/assert";
import { validateQueryTerm, keySetter, generateRandomString } from "./helper";

const capitalCase = (input: string): string => {
	let validatedInput = "";

	for (let i=0; i<input.length; i++) {
		const currentLetter = input[i];

		if (i === 0 || input[i-1] === " ") {
			const capitalLetter = currentLetter.toUpperCase();
			validatedInput += capitalLetter;
		} else {
			validatedInput += currentLetter;
		}
	}
	return validatedInput;
};


Deno.test("Manual Capitals Test", () => {
	const expectedOutput = ["Drake", "Eminem", "Cage", "Oasis", "Madonna", "Incubus", "Slayer"];
	const smallCaseWords = expectedOutput.map(x => x.toLowerCase());

	for (let i=0; i<expectedOutput.length; i++) {
		const capitalCaseOutput = capitalCase(smallCaseWords[i]);

		assertEquals(capitalCaseOutput, expectedOutput[i]);
	}
});


Deno.test("Validate Query Term: Expected", () => {
	const expectedTerms = ["Drake", "Eminem", "Cage", "Oasis", "Madonna", "Incubus", "Slayer"];
	expectedTerms.forEach(x => assertEquals(validateQueryTerm(x), x));
});


Deno.test("Validate Query Term: Multiple Words", () => {
	const multipleWordArtists = ["The Beatles", "Five Finger Death Punch", "Alice in Chains", "The rolling stones", "deep purple"];
	const expectedOutputs = multipleWordArtists.map(x => capitalCase(x)).map(x => x.replaceAll(" ", "+"));

	for (let i=0; i<expectedOutputs.length; i++) {
		const validatedTerm = validateQueryTerm(multipleWordArtists[i]);
		const expectedOutput = expectedOutputs[i];
		
		assertEquals(validatedTerm, expectedOutput);
	}
});


Deno.test("Validate Query Term: Trim and Clean Inputs Test", () => {
	const maliciousInputs = ["   vjieo39a09v9903pq3nln,  ;ak;jeion nv;a;ow jjj;  o w           ","  --     9 395u93   ", " mvkle owiapurie kl;ajfdkas eioruew  ;ajf   fsk;ajdff   vn.zv.z,vcnsp;   w   -   j jj    ", "_ fekal;rearearere _ () "];
	const expectedOutputs = maliciousInputs.map(x => x.trim()).map(x => capitalCase(x)).map(x => x.replaceAll(" ","+"));

	for (let i=0; i<maliciousInputs.length; i++) {
		const validatedInput = validateQueryTerm(maliciousInputs[i]);
		const expectedOutput = expectedOutputs[i];

		assertEquals(validatedInput, expectedOutput);
	}
});


Deno.test("Key Setter: Ten Thousand Unique Keys Test", () => {
	const setUniqueKey = keySetter();

	for (let i=0; i<10000; i++) {
		assertEquals(setUniqueKey(), i);
	}
});

// Due to the nature of randomness this test will fail some non zero percent of the time. This percentage should be small however and pass the vast majority of the time.
Deno.test("Generate Random String: String Length, Unique Values", () => {
	const randomStrings = [];
	const randomStringLength = 16;
	const numberOfStrings = 2843;

	for (let i=0; i<numberOfStrings; i++) {
		randomStrings.push(generateRandomString(randomStringLength));
	}

	assertEquals(randomStrings.length, numberOfStrings);


	for (let i=0; i<randomStrings.length; i++) {
		const randomString = randomStrings[i];

		assertEquals(randomString.length, randomStringLength);

		const repititionCheckArray = randomStrings.filter(x => x === randomString);
		
		assertEquals(repititionCheckArray.length, 1);
	}
});


// Due to the nature of randomness this test will fail some non zero percent of the time. This percentage should be small however and pass the vast majority of the time.
Deno.test("Generate Random String: All Characters Used", () => {
	const letters = "abcdefghijklmnopqrstuvwxyz";
	const upperCaseLetters = letters.toUpperCase();
	const numbers = "0123456789";
	const characterPool = letters + upperCaseLetters + numbers;
	const characterPoolLength = letters.length + upperCaseLetters.length + numbers.length;

	assertEquals(letters.length, 26);
	assertEquals(letters.length, upperCaseLetters.length);
	assertEquals(numbers.length, 10);
	assertEquals(characterPool.length ,characterPoolLength);

	const reallyLongRandomString = generateRandomString(1000);

	for (let i=0; i<characterPool.length; i++) {
		const targetCharacter = characterPool[i];
		assertEquals(reallyLongRandomString.includes(targetCharacter), true);
		assertEquals(!reallyLongRandomString.includes(targetCharacter), false);
	}
});
