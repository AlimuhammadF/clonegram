import Head from "next/head";
import Header from "./Header";

export default function Layout({ children }) {
	return (
		<div>
			<Head>
				<title>Clonegram</title>
				<meta
					name="clonegram | instagram clone"
					content="clonegram is an app where you can upload pictures, content, comments, likes"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="defaultFont bg-gray-100 min-h-screen">
				<Header />
				{children}
			</main>
		</div>
	);
}
