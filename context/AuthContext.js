import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import Router from "next/router";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";

const AuthContext = createContext({
	user: null,
	loading: true,
	googleSignin: () => {},
	emailSignup: () => {},
	emailSignin: () => {},
	logout: () => {},
});

export function AuthContextProvider({ children }) {
	const [user, setUser] = useState(null);

	//loading
	const [loading, setLoading] = useState(true);

	//gettings user
	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => {
			setUser(user);
			setLoading(false);
		});
		return unsub;
	}, [onAuthStateChanged]);

	//logout
	function logout() {
		try {
			signOut(auth);
		} catch (error) {
			alert(error);
		}
	}

	//google signin
	const Provider = new GoogleAuthProvider();
	function googleSignin() {
		try {
			signInWithPopup(auth, Provider);
		} catch (error) {
			alert(error);
		}
	}

	const context = { user, googleSignin, loading, logout };

	return (
		<AuthContext.Provider value={context}>{children}</AuthContext.Provider>
	);
}

export default AuthContext;
