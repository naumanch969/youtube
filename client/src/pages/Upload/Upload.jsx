import { Close } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebase'
import { useNavigate } from 'react-router-dom';
import { createVideo } from '../../redux/actions/video';
import { useDispatch } from 'react-redux'

const Upload = () => {

    ///////////////////////////////////// VARIABLES ///////////////////////////////////
    const navigate = useNavigate()
    const dispatch = useDispatch()

    ///////////////////////////////////// STATES ///////////////////////////////////
    const [video, setVideo] = useState(null)
    const [thumbnail, setThumbnail] = useState(null)
    const [videoPercentage, setVideoPercentage] = useState(0)
    const [thumbnailPercentage, setThumbnailPercentage] = useState(0)
    const [videoData, setVideoData] = useState({ title: '', description: '', tags: [], video: '', thumbnail: '' })

    ///////////////////////////////////// USE EFFECTS ////////////////////////////////
    useEffect(() => { video && uploadFile(video, 'thumbnail') }, [video])
    useEffect(() => { thumbnail && uploadFile(thumbnail, 'video') }, [thumbnail])
    useEffect(() => {
        console.log(videoData)
    }, [videoData])
    useEffect(() => {
        console.log(thumbnailPercentage, videoPercentage)
    }, [thumbnailPercentage, videoPercentage])

    ///////////////////////////////////// FUNCTION ///////////////////////////////////
    const uploadFile = (file, type) => {
        const name = new Date().getTime() + file.name
        const storageRef = ref(storage, name)
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100
                type == 'thumbnail' ? setThumbnailPercentage(Math.ceil(progress)) : setVideoPercentage(Math.ceil(progress))
            },
            (error) => {
                console.log(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setVideoData(pre => ({ ...pre, [type]: downloadURL }))
                })
            }
        )
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        name == 'tags'
            ?
            setVideoData({ ...videoData, tags: value.split(',') })
            :
            setVideoData({ ...videoData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createVideo(videoData))

    }


    return (
        <div className='w-full h-full flex justify-center items-center ' >
            <form onSubmit={handleSubmit} className="w-[600px] h-auto bg-dark-light-main text-dark-text p-[20px] flex flex-col gap-[20px] relative ">

                <h2 className='text-[24px] text-center ' >Upload a New Video</h2>

                <div className="flex flex-col md:gap-[8px] ">
                    <label className='text-[14px] ' >Video:</label>
                    {
                        videoPercentage > 0
                            ?
                            (
                                videoData.video
                                    ?
                                    <div className="">
                                        <span className='text-white text-center ' >Uploaded {videoPercentage}%</span>
                                    </div>
                                    :
                                    <div className="flex justify-start items-center gap-[8px] min-h-[50px] border-dark-soft border-[1px] text-dark-text rounded-[3px] p-[10px] bg-transparent">
                                        <span className='text-white text-center ' >Uploading {videoPercentage}%</span>
                                        <div className='w-full h-[4px] bg-dark-soft rounded-[4px] ' >
                                            <div className='h-full bg-white rounded-[4px] ' style={{ width: `${videoPercentage}%` }} />
                                        </div>
                                    </div>
                            )
                            :
                            <input type="file" accept='video/*' name='video' onChange={(e) => setVideo(e.target.files[0])} className='border-dark-soft border-[1px] text-dark-text rounded-[3px] p-[10px] bg-transparent cursor-pointer ' />
                    }
                </div>
                <input type="text" placeholder='Title' name='title' value={videoData.title} onChange={handleChange} className='border-dark-soft border-[1px] text-dark-text rounded-[3px] p-[10px] bg-transparent ' />
                <textarea type="text" placeholder='Description' name='description' value={videoData.description} onChange={handleChange} rows={8} className='border-dark-soft border-[1px] text-dark-text rounded-[3px] p-[10px] bg-transparent ' />
                <input type="text" placeholder='Tags, septarated by comma' name='tags' value={videoData.tags?.join(',')} onChange={handleChange} className='border-dark-soft border-[1px] text-dark-text rounded-[3px] p-[10px] bg-transparent ' />
                <label className='text-[14px] ' >Thumbnail:</label>
                <div className="flex flex-col md:gap-[8px] ">
                    {
                        thumbnailPercentage > 0
                            ?
                            (
                                videoData.thumbnail
                                    ?
                                    <div className="">
                                        <span className='text-white text-center ' >Uploaded {thumbnailPercentage}%</span>
                                    </div>
                                    :
                                    <div className="flex justify-start items-center gap-[8px] min-h-[50px] border-dark-soft border-[1px] text-dark-text rounded-[3px] p-[10px] bg-transparent">
                                        <span className='text-white text-center ' >Uploading {thumbnailPercentage}%</span>
                                        <div className='w-full h-[4px] bg-dark-soft rounded-[4px] ' >
                                            <div className='h-full bg-white rounded-[4px] ' style={{ width: `${thumbnailPercentage}%` }} />
                                        </div>
                                    </div>
                            )
                            :
                            <input type="file" accept='image/*' name='thumbnail' onChange={(e) => setThumbnail(e.target.files[0])} className='border-dark-soft border-[1px] text-dark-text rounded-[3px] p-[10px] bg-transparent cursor-pointer ' />
                    }
                </div>
                <button type='submit' className='rounded-[3px] border-none px-[20p] py-[10px] font-medium cursor-pointer bg-dark-soft hover:bg-[#555] text-dark-soft-text ' >Upload</button>

            </form>
        </div>
    )
}

export default Upload