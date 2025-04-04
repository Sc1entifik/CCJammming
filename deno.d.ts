declare const Deno: {
	env: {
		get(key: string): string | undefined;
	},
	test: (testName: string, testFunction: ()=>void) => void,

};
