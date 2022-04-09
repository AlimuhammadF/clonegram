import {
	ChatAlt2Icon,
	HeartIcon,
	HomeIcon,
	InboxIcon,
	PlusCircleIcon,
	SearchIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import Router from "next/router";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import ModalContext from "../context/ModalContext";

export default function Header() {
	const { user, logout } = useContext(AuthContext);
	const { handleModal, logoutHandleModel } = useContext(ModalContext);

	const ProfileLogout = () => {
		logoutHandleModel();
		logout();
	};

	return (
		<div className="fixed z-50">
			{user ? (
				<div
					className="z-50 fixed bottom-0 md:hidden left-0 py-3 w-screen
                 flex justify-between px-5 border-t border-black border-opacity-20 drop-shadow-sm bg-white"
				>
					<button onClick={() => Router.push("/")}>
						<HomeIcon strokeWidth="1.5" className="navIcon" />
					</button>
					<button>
						<ChatAlt2Icon strokeWidth="1.5" className="navIcon" />
					</button>
					<button onClick={() => handleModal()}>
						<PlusCircleIcon strokeWidth="1.5" className="navIcon" />
					</button>
					<button>
						<HeartIcon strokeWidth="1.5" className="navIcon" />
					</button>
				</div>
			) : (
				""
			)}
			<div className="sticky top-0 w-screen h-16 flex justify-center items-center bg-white drop-shadow-sm border-b border-black border-opacity-20">
				<div
					className={`container mt max-w-screen-md mx-5 h-full flex ${
						user ? "justify-between" : "justify-center"
					} items-center`}
				>
					<h2
						onClick={() => Router.push("/")}
						className="text-2xl font-bold gradient textgradient cursor-pointer"
					>
						Clonegram
					</h2>
					{!user ? (
						""
					) : (
						<>
							<button
								onClick={ProfileLogout}
								className="w-8 h-8 md:hidden rounded-full overflow-hidden gradient border"
							>
								<img src={user?.photoURL} />
							</button>
							<div className="hidden md:flex px-3 py-2 space-x-2 rounded-lg bg-gray-200">
								<SearchIcon className="w-4 h-4" />
								<input
									type="text"
									placeholder="Search"
									className="bg-transparent focus:outline-none text-sm w-48"
								/>
							</div>
							<div
								className="hidden space-x-3
                 md:flex flex-row items-center"
							>
								<button onClick={() => Router.push("/")}>
									<HomeIcon
										strokeWidth="1.5"
										className="navIcon"
									/>
								</button>
								<button onClick={() => handleModal()}>
									<PlusCircleIcon
										strokeWidth="1.5"
										className="navIcon"
									/>
								</button>
								<button>
									<ChatAlt2Icon
										strokeWidth="1.5"
										className="navIcon"
									/>
								</button>
								<button>
									<HeartIcon
										strokeWidth="1.5"
										className="navIcon"
									/>
								</button>
								<button
									onClick={ProfileLogout}
									className="w-7 h-7 rounded-full overflow-hidden gradient border"
								>
									<img src={user?.photoURL} />
								</button>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
