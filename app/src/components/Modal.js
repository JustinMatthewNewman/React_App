import React, { useEffect } from 'react';
import { useRecoilState } from "recoil"
import { modalState } from "../atoms/ModalAtom.js"
import { Dialog, Transition } from "@headlessui/react"
import { CameraIcon } from "@heroicons/react/outline"
import { Fragment, useRef, useState } from "react"
import { db, storage } from "../../firebase.js"
import { addDoc, collection, serverTimestamp, updateDoc, doc } from "@firebase/firestore"
import { useSession } from "next-auth/react"
import {ref, getDownloadURL, uploadString } from "@firebase/storage"

function Modal() {
    const {data:session} = useSession();
    const [open, setOpen] = useRecoilState(modalState);
    const filePickerRef = useRef(null);
    const captionRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null)


    const uploadPost = async () => {
        if (loading) return;
        setLoading(true);

        // create a post and add to firestore
        // get the post id for the new post
        // upload image to firebase storage with id
        // get a download url from firestore and update original post with image

        const docRef = await addDoc(collection(db, 'posts'), {
            username: session.user.username,
            caption: captionRef.current.value,
            profileImg: session.user.image,
            timestamp: serverTimestamp(),
            user_id: session.user.uid
        })
        console.log("New Doc added with id", docRef.id);


        const imageRef = ref(storage, `posts/${docRef.id}/image`);

        await uploadString(imageRef,selectedFile, "data_url").then(async snapshot => {
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(doc(db, 'posts', docRef.id), {
                image: downloadURL
            });
        });
        setOpen(false);
        setLoading(false);
        setSelectedFile(null);


    }

    const addImageToPost = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }
        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        };
    };

  return (
    <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
            <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 tranisition-opaicty"/>
                </Transition.Child>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                    &#8203;
                </span>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                    <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-x-sm sm:w-fill sm:p-6">
                        <div>
                            {selectedFile ? (
                                    <img src={selectedFile} className="w-full object-contain cursor-pointer" onClick={() => selctedFile(null)} alt=""/>
                            ) : (
                            <div onClick={() => filePickerRef.current.click()} className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-purple-200 cursor-pointer">
                                <CameraIcon aria-hidden="true" className="h-6 w-6 text-purple-600">

                                </CameraIcon>
                            </div>
                            )}
                            
                            
                            <div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                        Upload a picture
                                    </Dialog.Title>
                                    <div>
                                        <input onChange={addImageToPost} ref={filePickerRef} type="file" hidden/>
                                    </div>
                                    <div className="mt-2">
                                        <input ref={captionRef} type="text" placeholder="Enter a caption..."/>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 sm:mt-6">
                                <button type="button" disabled={!selectedFile} onClick={uploadPost} className="inine-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pruple-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300">
                                    {loading ? "Uploading..." : "Upload Post"}
                                </button>
                            </div>
                        </div>
                    </div>
                </Transition.Child>
            </div>
        </Dialog>
    </Transition.Root>
  )
}

export default Modal
