import React, { useEffect, useRef, useState } from 'react'
import Storage from "../firebase/storage/index"
import { UploadTask } from 'firebase/storage'
import FireStore from '../firebase/firestore'
import Header from '../components/Header'
import Ultis from '../utils'

export default function upload() {
    const [file, setFile] = useState<File>(false as any)
    const [title, setTitle] = useState<string>(false as any)
    const [category, setCategory] = useState<string>(false as any)
    const [image, setImage] = useState<HTMLImageElement>(false as any)
    const [video, setVideo] = useState<HTMLVideoElement>(false as any)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [uploading, setUploading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState<number>(0)
    const inputRef = useRef<HTMLInputElement>(null)
    const uploadRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        videoRef.current.src = video.src
    }, [video])
    const handleTitle = (event: Event) => {
        // @ts-expect-error
        const input = event.target.value
        setTitle(input)
    }
    const handleCategory = (event: Event) => {
        // @ts-expect-error
        const input = event.target.value

        if (input != "Select a Category") {
            console.log(input)
            setCategory(input)
        }
    }
    const acquireFile = (event: Event) => {
        setProgress(0)
        setLoading(true)
        //@ts-expect-error
        const file = event.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            const url = reader.result
            let video = document.createElement('video')
            let canvas = document.createElement('canvas')
            let context = canvas.getContext('2d')
            video.preload = 'metadata'
            video.muted = true
            video.playsInline = true;
            video.setAttribute('crossOrigin', 'anonymous');
            video.controls = true
            video.src = url as string
            setVideo(video)
            setLoading(false)
            // @ts-expect-error
            videoRef.current.addEventListener('loadeddata', function () {
                // @ts-expect-error
                videoRef.current.pause()
                context?.drawImage(video, 0, 0, canvas.width, canvas.height);
                let dataUri = canvas.toDataURL('image/jpeg');
                let img = document.createElement('img')
                img.src = dataUri
                setImage(img)
            })
            // @ts-expect-error
            videoRef.current.addEventListener('pause', function () {
                // @ts-expect-error
                videoRef.current.pause()
                context?.drawImage(video, 0, 0, canvas.width, canvas.height);
                let dataUri = canvas.toDataURL('image/jpeg');
                let img = document.createElement('img')
                img.src = dataUri
                setImage(img)
                console.log(img)
            })
            // @ts-expect-error
            videoRef.current.addEventListener('seeked', function () {
                // @ts-expect-error
                videoRef.current.pause()
                context?.drawImage(video, 0, 0, canvas.width, canvas.height);
                let dataUri = canvas.toDataURL('image/jpeg');
                let img = document.createElement('img')
                img.src = dataUri
                setImage(img)
                console.log(img)
            })
            video.play();
        }
        setFile(file)
    }
    const uploadFile = async () => {
        const meta = { title, category, image: image.src }
        const path = "/" + title.trim().replaceAll(" ", "-").toLowerCase()
        await Storage.upload(file, meta).then(({ bytesTransferred, totalBytes, task }) => {
            const meta = { title, category, image: image.src, path }
            task.on("state_changed", ({ bytesTransferred, totalBytes }) => {
                const progress = bytesTransferred / totalBytes * 100
                setProgress(progress)
            }, null, () => {
                const progress = bytesTransferred / totalBytes * 100
                setProgress(progress)
            })
            FireStore.Videos.POST.meta(meta)
            if (bytesTransferred == totalBytes) {
                cancelUpload()
            }
        })
        setUploading(true)
    }
    const cancelUpload = () => {
        //@ts-expect-error
        uploadRef.current.value = null as any
        //@ts-expect-error
        inputRef.current.value = null as any
        //@ts-expect-error
        videoRef.current = null as any
        setImage(false as any)
        setFile(false as any)
    }
    const safe = ![image, file, video, title, category].includes(false as any)
    const cancelable = [image, file, video, title, category].includes(true as any)

    return (
        <div className="flex justify-center items-center w-1/3 ml-auto mr-auto h-screen flex-col">
            <div
                className="relative w-full mr-auto ml-auto overflow-hidden mb-5"
                style={{ paddingTop: "42.857143%" }}
            >
                <div
                    className="absolute top-0 right-0 bottom-0 left-0 w-full h-full"
                    style={{
                        display: !loading ? "none" : "initial",
                        zIndex: 1
                    }}
                >
                    Loading
                </div>
                <video
                    className="absolute top-0 right-0 bottom-0 left-0 w-full h-full"
                    controls={true}
                    ref={videoRef}
                    allowFullScreen
                    // data-gtm-yt-inspected-2340190_699="true"
                    id="240632615"
                ><source src={video.src} />
                </video>

            </div>
            <div className="mb-3 w-full justify-center items-center" >
                {/* @ts-expect-error */}
                <input aria-label='upload' onChange={acquireFile} ref={uploadRef} type="file" id="formFile"
                    className="form-control block w-full text-xl font-normal text-gray-700 bg-white bg-clip-padding rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
                <form
                    onSubmit={upload}
                    className="flex flex-1 pr-3 flex-row w-full justify-center items-center">
                    <div className='flex flex-col w-full mr-2 ml-3'>
                        <label htmlFor="email" className="block py-3 text-white">
                            Video Name
                        </label>
                        <div className='w-full'>
                            <div className="flex items-center p-2 border rounded-md">
                                <input
                                    // @ts-expect-error
                                    onChange={handleTitle}
                                    ref={inputRef}
                                    type="text"
                                    placeholder="You Video's Name"
                                    id="title"
                                    className="w-full p-1 ml-3 text-gray-500 outline-none bg-transparent"
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col w-full' >
                        <label htmlFor="email" className="block py-3 text-white">
                            Category
                        </label>
                        <div className='w-full'>
                            <div className="flex items-center p-2 border rounded-md">
                                <select
                                    // @ts-expect-error
                                    onChange={handleCategory}
                                    title="category"
                                    placeholder="Category"
                                    id="category"
                                    className="w-full p-1 ml-3 text-gray-500 outline-none bg-transparent"
                                >
                                    <option>Select a Category</option>
                                    {Ultis.collections.map((collection) => {
                                        return <option key={collection} >{collection}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="w-full bg-gray-200 rounded-full justify-center items-center p-0.5 mt-5">
                    <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full" style={{
                        width: `${progress}%`
                    }}>{progress}%</div>
                </div>
                <div className="flex w-full bg-inherit items-center justify-center mt-6 pr-7 flex-row">
                    <button
                        disabled={!safe ? true : false}
                        onClick={uploadFile}
                        className="px-6 py-3 text-green-900 duration-100 bg-white rounded-md shadow-md focus:shadow-none ring-offset-2 ring-white focus:ring-2 mr-2"
                    >
                        Upload
                    </button>
                    <button
                        disabled={cancelable ? true : false}
                        onClick={cancelUpload}
                        className="px-4 py-2 text-sm text-white duration-100 border rounded-md hover:border-white active:shadow-lg"
                    >
                        cancel
                    </button>
                </div>
            </div>
        </div>
    )
}
