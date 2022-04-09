import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Image from "next/image";

export default function Post({
	userImage,
	id,
	userName,
	title,
	image,
	timestamp,
}) {
	const { user } = useContext(AuthContext);

	return (
		<div className="border border-black border-opacity-20 w-full">
			<div className="p-4">
				<div className="flex items-center space-x-3">
					<div className="w-10 h-10 gradient rounded-full p-0.5">
						<img
							src={userImage}
							alt="userImage"
							className="rounded-full border border-white"
						/>
					</div>
					<div>
						<div className="font-medium">{userName}</div>
						<div className="text-sm -translate-y-1 opacity-80 -z-50">
							{timestamp}
						</div>
					</div>
				</div>
				<div className="ml-12 pl-1 mt-4">{title}</div>
				<div className="w-full mt-2 -z-20 pointer-events-none">
					<Image
						alt=""
						height="800px"
						width="672px"
						objectFit="cover"
						src={image}
						className="-z-10 pointer-events-none"
					/>
				</div>
			</div>
		</div>
	);
}
