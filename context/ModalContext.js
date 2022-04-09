import { createContext, useEffect, useState } from "react";

const ModalContext = createContext({
	modal: false,
	handleModal: () => {},
	logoutHandleModel: () => {},
});

export function ModalContextProvider({ children }) {
	const [modal, setModal] = useState(false);

	const handleModal = () => {
		if (!modal) {
			setModal(true);
		} else {
			setModal(false);
		}
	};

	const logoutHandleModel = () => {
		if (modal) {
			setModal(false);
		}
	};

	useEffect(() => {
		if (modal) {
			document.body.style.overflow = "hidden";
		} else if (!modal) {
			document.body.style.overflow = "visible";
		}
	}, [modal]);

	const context = { modal, handleModal, logoutHandleModel };

	return (
		<ModalContext.Provider value={context}>
			{children}
		</ModalContext.Provider>
	);
}

export default ModalContext;
