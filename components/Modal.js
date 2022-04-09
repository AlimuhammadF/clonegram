import { PhotographIcon, PlusIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import nProgress from "nprogress";
import AuthContext from "../context/AuthContext";
import uniqueString from "unique-string";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { storage, db } from "../firebase/firebase";
import Error from "./StatusCode/Error";
import ModalContext from "../context/ModalContext";

export default function Modal() {
	const { user } = useContext(AuthContext);
	const { logoutHandleModel } = useContext(ModalContext);

	const [imagePicker, setImagePicker] = useState(null);
	const addImageToPost = (e) => {
		const reader = new FileReader();
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
		}
		reader.onload = (readerEvent) => {
			setImagePicker(readerEvent.target.result);
		};
	};
	const [title, setTitle] = useState("");

	//error
	const [errorCode, setErrorCode] = useState(null);
	const cancelError = () => {
		if (errorCode) {
			setErrorCode(null);
		}
	};
	//loading
	const [loading, setLoading] = useState(false);

	async function handleAddingPost() {
		if (!title) {
			setErrorCode("Please set a title");
		} else if (!imagePicker) {
			setErrorCode("please set an image");
		} else {
			setLoading(true);
			nProgress.start();
			const id = uniqueString();
			try {
				const imageRef = ref(storage, "posts/" + id + "/image");
				await setDoc(doc(db, "posts", id), {
					title: title,
					image: "https://firebasestorage.googleapis.com/v0/b/fakegram-e6635.appspot.com/o/Frame%206.png?alt=media&token=be7e738c-a5de-43a3-b405-042b27cab406",
					userUid: user?.uid,
					userImage: user?.photoURL || "",
					postId: id,
					userName: user?.displayName,
					timestamp: serverTimestamp(),
				});
				await uploadString(imageRef, imagePicker, "data_url").then(
					async (snapshot) => {
						const downloadULR = await getDownloadURL(imageRef);
						await updateDoc(doc(db, "posts", id), {
							image: downloadULR,
						});
					}
				);
				setLoading(false);
				logoutHandleModel();
				cancelError();
				setImagePicker(null);
				nProgress.done();
			} catch (error) {
				alert(error);
				nProgress.done();
			}
		}
	}

	return (
		<div>
			{errorCode ? (
				<Error error={errorCode} cancelError={cancelError} />
			) : (
				""
			)}

			<div className="h-screen w-screen fixed flex justify-center items-center px-5">
				<div
					onClick={logoutHandleModel}
					className="absolute h-screen w-screen flex justify-center items-center bg-black bg-opacity-80"
				></div>
				<motion.div
					animate={{ opacity: 1, scale: 1 }}
					initial={{ opacity: 0, scale: 1.3 }}
					transition={{ duration: 0.2 }}
					className=" bg-white w-96 h-96 rounded-2xl drop-shadow-2xl overflow-hidden"
				>
					<label htmlFor="uploadPhotoBtn">
						<div className="w-full h-48 bg-gray-300 overflow-hidden cursor-pointer flex justify-center items-center">
							{!imagePicker ? (
								<>
									<PhotographIcon className="w-6 h-6 mr-1" />
									<span className="font-medium text-sm">
										{" "}
										Upload Photo
									</span>
								</>
							) : (
								<img src={imagePicker} />
							)}
						</div>
					</label>
					<input
						id="uploadPhotoBtn"
						type="file"
						hidden
						onChange={addImageToPost}
					/>
					<div className="mx-5 my-3">
						<label
							htmlFor="username"
							className="block text-sm font-semibold text-gray-800"
						>
							Title
						</label>
						<textarea
							type="text"
							onChange={(e) => setTitle(e.target.value)}
							rows="3"
							className="resize-none block w-full px-4 py-2 mt-2  bg-white border rounded-md  text-gray-800 border-gray-600  focus:border-violet-300 focus:ring-pink-300 focus:outline-none focus:ring focus:ring-opacity-40"
						/>
					</div>
					<div className="w-full px-5">
						<button
							disabled={loading}
							onClick={handleAddingPost}
							className="gradient w-full h-9 opacity-100 rounded-md text-white font-semibold hover:opacity-80 transition-all duration-200"
						>
							{loading ? "Uploading.." : "Upload"}
						</button>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
