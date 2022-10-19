import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
const firebaseConfig = {
	apiKey: 'AIzaSyBd38wn7nOKU6OQc6lfmnLNgOkqq34wNvo',
	authDomain: 'museemin-b4f75.firebaseapp.com',
	projectId: 'museemin-b4f75',
	storageBucket: 'museemin-b4f75.appspot.com',
	messagingSenderId: '791783463347',
	appId: '1:791783463347:web:289ab9c6cb176d78ba13c6',
	measurementId: 'G-V8QYE2K2W4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

/**
 * Upload File
 * @param {File} file // file
 * @returns {Promise<string>} // return url
 */

export async function Upload(file) {
	const storageRef = ref(storage,`/PaqueteHerramientas/${v4()}`);
	await uploadBytes(storageRef, file);
	const url = await getDownloadURL(storageRef);
	return url;
}
