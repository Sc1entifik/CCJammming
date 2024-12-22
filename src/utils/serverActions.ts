"use server";

import { cookies } from "next/headers";

export const deleteAuthCookie = async () => {
	await cookies().then(res => res.delete("auth"));
}
