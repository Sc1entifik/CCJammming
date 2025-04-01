import { assertEquals } from "jsr:@std/assert";
import { validateQueryTerm, keySetter, generateRandomString, formattedErrorMessage, reverseList } from "./helper";

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


Deno.test("Reverse List Test", () => {
	const forwardsAndBackwards = [["flat", "duck", "oyster", "shuffle"], ["shuffle", "oyster", "duck", "flat"]];
	
	assertEquals(reverseList(forwardsAndBackwards[0]), forwardsAndBackwards[1]);
});


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

//Not an actual test I know however you should be able to see if the messages look good or not!
Deno.test("Formatted Error Messges: Looks Nice On All Messages", () => {
	const err = "I AM YOUR STANDARD REACT ERROR!!!! NOBODY UNDERSTANDS WHY I AM HERE OR WHAT TO DO ABOUT ME!!!! I ALSO TRIGGER RANDOM HYDRATION ERRORS. NOT EVERYTIME SO IT IS DIFFICULT TO FIGURE OUT HOW I COULD EVEN TRIGGER A HYDRATION ERROR!!!!"
	const errorMessage1 = "I am a standard error message";
	const errorMessage2 = "I AM AN ERROR MESSAGE THAT SOUNDS LIKE I AM YELLING";
	const errorMessge3 = "I_AM_AN_ERROR_MESSAGE_IN_SCREAMING_SNAKE_CASE_I_SHOULD_ALSO_LOOK_GOOD!!!";
	const errorMessages = [errorMessage1, errorMessage2, errorMessge3];

	for (let i=0; i<errorMessages.length; i++) {
		const currentMessage = errorMessages[i];
		console.log(formattedErrorMessage(currentMessage, err));
	}

	assertEquals(true, true);
});
