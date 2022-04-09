import Head from "next/head";
import { useContext, useEffect } from "react";
import ModalContext from "../context/ModalContext";
import Header from "./Header";
import Modal from "./Modal";

export default function Layout({ children }) {
	const { modal } = useContext(ModalContext);

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
			<main
				style={{ overflow: "hidden" }}
				className={`defaultFont min-h-screen overflow-x-hidden`}
			>
				<Header />
				{modal ? <Modal /> : ""}
				{children}
			</main>
		</div>
	);
}
