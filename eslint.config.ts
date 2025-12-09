import next from "@next/eslint-plugin-next";
import parser from "@typescript-eslint/parser";

export default [
	{
		languageOptions: {
			parser: parser,
			parserOptions: {
				ecmaVersion: 2022,
				sourceType: "module",
			},
	},
		files: ["**/*.{ts,tsx}"],
		plugins: {
			"@next/next": next,
		},
		rules: {
			...next.configs.recommended.rules,
			...next.configs["core-web-vitals"].rules,
		},
	},
];
