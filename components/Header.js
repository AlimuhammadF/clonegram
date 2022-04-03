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

export default function Header() {
	const { user, logout } = useContext(AuthContext);

	return (
		<div className="w-screen h-20 flex justify-center items-center bg-white drop-shadow-md">
			<div
				className={`container mt max-w-screen-lg mx-5 h-full flex ${
					user ? "justify-between" : "justify-center"
				} items-center`}
			>
				<h2
					onClick={() => Router.push("/")}
					className="logoFont text-4xl text-violet-700 cursor-pointer"
				>
					Clonegram
				</h2>
				{!user ? (
					""
				) : (
					<>
						<div className="md:hidden block space-y-1">
							<div className="menuLines"></div>
							<div className="menuLines"></div>
							<div className="menuLines"></div>
						</div>
						<div className="hidden md:flex px-3 py-2 space-x-2 rounded-lg bg-gray-200">
							<SearchIcon className="w-4 h-4" />
							<input
								type="text"
								placeholder="Search"
								className="bg-transparent focus:outline-none text-sm"
							/>
						</div>
						<div
							className="hidden space-x-2
                 md:flex flex-row items-center"
						>
							<button onClick={() => Router.push("/")}>
								<HomeIcon className="navIcon" />
							</button>
							<button>
								<PlusCircleIcon className="navIcon" />
							</button>
							<button>
								<ChatAlt2Icon className="navIcon" />
							</button>
							<button>
								<HeartIcon className="navIcon" />
							</button>
							<button
								onClick={() => logout()}
								className="w-10 h-10 rounded-full overflow-hidden"
							>
								<img src={user?.photoURL} />
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
