import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../firabase";

export const SubmitImageToFireBase = async (url) =>{
	let nameFile = url.split('/')[url.split('/').length - 1];
	
	const storageRef = ref(storage, nameFile);
	const response = await fetch(url);
	
	const blob = await response.blob();
	
	await uploadBytes(storageRef, blob);
	
	const downloadUrl = await getDownloadURL(storageRef);
	return downloadUrl;
}