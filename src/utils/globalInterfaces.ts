import { cookies } from "next/headers";

export type Iframe = {createController: (element: HTMLElement, options: object, callback: <T,>(embedController: T) => T) => void};

export type CookieStore = Awaited<ReturnType<typeof cookies>>;
