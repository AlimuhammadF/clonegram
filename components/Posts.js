import Post from "./Post";

export default function Posts({ postProps }) {
	return (
		<div className="w-screen h-auto flex justify-center">
			<div className="max-w-screen-sm flex flex-col space-y-14 flex-grow my-10 px-5">
				{postProps.map((data) => (
					<Post
						key={data.id}
						title={data.title}
						userImage={data.userImage}
						id={data.id}
						image={data.image}
						userName={data.userName}
						userUid={data.userUid}
						timestamp={data.timestamp}
					/>
				))}
			</div>
		</div>
	);
}
