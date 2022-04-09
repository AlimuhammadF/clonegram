import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Head from "next/head";
import Router from "next/router";
import { useContext, useEffect } from "react";
import Posts from "../components/Posts";
import AuthContext from "../context/AuthContext";
import { db } from "../firebase/firebase";

export default function Home({ postProps }) {
	const { user, loading } = useContext(AuthContext);

	useEffect(() => {
		if (loading) {
			return;
		} else if (!user) {
			Router.push("/Auth/Signin");
		}
	}, [user, loading]);

	return (
		<main className="pt-16">
			<Posts postProps={postProps} />
		</main>
	);
}

export async function getServerSideProps(context) {
	try {
		let post = [];
		const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			post.push({
				...doc.data(),
				id: doc.id,
				timestamp: doc.data().timestamp.toDate().getTime(),
			});
		});

		return {
			props: {
				postProps: post || [],
			},
		};
	} catch (error) {
		return {
			props: {
				postProps: [],
			},
		};
	}
}
