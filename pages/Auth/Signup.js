/* eslint-disable react/no-unescaped-entities */
import { createUserWithEmailAndPassword } from "firebase/auth";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import Error from "../../components/StatusCode/Error";
import AuthContext from "../../context/AuthContext";
import { auth } from "../../firebase/firebase";
import nProgress from "nprogress";

export default function Signup() {
	const { googleSignin, user, loading } = useContext(AuthContext);

	useEffect(() => {
		if (loading) {
			return;
		} else if (user) {
			Router.push("/");
		}
	}, [user, loading]);

	//handle error
	const [errorTitle, setErrorTitle] = useState(null);
	const cancelError = () => {
		if (errorTitle) {
			setErrorTitle(null);
		}
	};

	//email signup
	const [username, setUsername] = useState(null);
	const handleUsernameInput = (e) => {
		setUsername(e.target.value);
	};
	const [password, setPassword] = useState(null);
	const handlePasswordInput = (e) => {
		setPassword(e.target.value);
	};
	const [confirmPassword, setConfirmPassword] = useState(null);
	const handleConfirmPasswordInput = (e) => {
		setConfirmPassword(e.target.value);
	};

	//email signup fuction
	async function emailSignup(e) {
		nProgress.start();
		if (password !== confirmPassword) {
			e.preventDefault();
			alert("error");
			return;
		}
		try {
			e.preventDefault();
			await createUserWithEmailAndPassword(auth, username, password);
			nProgress.done();
		} catch (error) {
			setErrorTitle("Your email is already used!");
			nProgress.done();
		}
	}

	return (
		<>
			{errorTitle ? (
				<Error error={errorTitle} cancelError={cancelError} />
			) : (
				""
			)}
			<div className="w-screen h-screen flex justify-center items-center px-5">
				<div className="w-full max-w-sm p-6 m-auto border bg-white rounded-lg shadow-xl py-10">
					<form className="mt-6" onSubmit={emailSignup}>
						<div>
							<label
								htmlFor="username"
								className="block text-sm font-semibold text-gray-800"
							>
								Email
							</label>
							<input
								onChange={handleUsernameInput}
								value={username || ""}
								type="text"
								className="block w-full px-4 py-2 mt-2  bg-white border rounded-md  text-gray-800 border-gray-600 focus:border-violet-400 focus:border-violet-300 focus:ring-pink-300 focus:outline-none focus:ring focus:ring-opacity-40"
							/>
						</div>

						<div className="mt-4">
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-semibold text-gray-800"
								>
									Password
								</label>
							</div>

							<input
								type="password"
								onChange={handlePasswordInput}
								value={password || ""}
								className="block w-full px-4 py-2 mt-2  bg-white border rounded-md  text-gray-800 border-gray-600 focus:border-violet-400 focus:ring-pink-300 focus:outline-none focus:ring focus:ring-opacity-40"
							/>
						</div>

						<div className="mt-4">
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-semibold text-gray-800"
								>
									Confirm Password
								</label>
							</div>

							<input
								type="password"
								onChange={handleConfirmPasswordInput}
								value={confirmPassword || ""}
								className="block w-full px-4 py-2 mt-2  bg-white border rounded-md  text-gray-800 border-gray-600 focus:border-violet-400 focus:ring-pink-300 focus:outline-none focus:ring focus:ring-opacity-40"
							/>
						</div>

						<div className="mt-6">
							<button className="w-full px-4 py-2 tracking-wide text-white transition-all font-semibold duration-200 transform gradient rounded-md hover:opacity-80">
								Signup
							</button>
						</div>
					</form>

					<div className="flex items-center justify-between mt-4">
						<span className="w-1/5 border-b border-gray-600 lg:w-1/5"></span>

						<button className="text-xs text-center text-gray-500 uppercase hover:underline">
							or login with Social Media
						</button>

						<span className="w-1/5 border-b border-gray-400 lg:w-1/5"></span>
					</div>

					<div className="flex items-center mt-6 -mx-2">
						<button
							onClick={() => googleSignin()}
							type="button"
							className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:bg-blue-400 focus:outline-none"
						>
							<svg
								className="w-4 h-4 mx-2 fill-current"
								viewBox="0 0 24 24"
							>
								<path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"></path>
							</svg>

							<span className="hidden mx-2 sm:inline">
								Sign in with Google
							</span>
						</button>

						<button className="p-2 mx-2 text-sm font-medium text-gray-500 transition-colors duration-200 transform bg-gray-300 rounded-md hover:bg-gray-200">
							<svg
								className="w-5 h-5 fill-current"
								viewBox="0 0 24 24"
							>
								<path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"></path>
							</svg>
						</button>
					</div>

					<p className="mt-8 text-xs font-light text-center text-gray-800">
						{" "}
						Don't have an account?{" "}
						<button
							onClick={() => Router.push("/Auth/Signin")}
							className="font-semibold text-gray-800 hover:underline"
						>
							Signin
						</button>
					</p>
				</div>
			</div>
		</>
	);
}
