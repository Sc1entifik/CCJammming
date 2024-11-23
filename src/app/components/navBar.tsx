export default function NavBar() {
	return (
		<div className="flex">
			<p className="mr-3">
				<a href="/about">About</a>
			</p>
			<p className="mr-3 text-2xl"> > </p>
			<p className="mr-3">
				<a href="/login">Login</a>
			</p>
		</div>
	);
}
