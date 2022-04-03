import Head from "next/head";
import Router from "next/router";
import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";

export default function Home() {
	const { user, loading } = useContext(AuthContext);

	useEffect(() => {
		if (loading) {
			return;
		} else if (!user) {
			Router.push("/Auth/Signin");
		}
	}, [user, loading]);

	return (
		<div>
			<main></main>
		</div>
	);
}
