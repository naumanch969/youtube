import React, { useEffect } from 'react'
import { ThumbUpOutlined, ThumbDownOffAltOutlined, ReplyOutlined, AddTaskOutlined } from '@mui/icons-material'
import { image3, image8 } from '../../assets'
import { VideoCard } from '../../components'
import Comments from './Comments'
import Recommendations from './Recommendations'
import { useDispatch, useSelector } from 'react-redux'
import { getVideo, getVideosByTag } from '../../redux/actions/video'
import { getUser } from '../../redux/actions/user'
import { getComments } from '../../redux/actions/comment'
import { useParams } from 'react-router-dom'

const Video = () => {

  const { videoId } = useParams()
  const dispatch = useDispatch()
  const { currentVideo: video, videos } = useSelector(state => state.video)
  const { currentUser: user } = useSelector(state => state.user)
  const { comments } = useSelector(state => state.comment)

  useEffect(() => {
    dispatch(getVideo(videoId))
  }, [videoId])

  useEffect(() => {
    dispatch(getUser(video?.userId))
    dispatch(getVideosByTag(video?.tags))
    dispatch(getComments(video?._id))
  }, [video])


  return (
    <div className='flex gap-[24px] ' >

      <div className="flex-[5] ">
        <div className="videoWrapper">

          {/* video */}
          {/* <video src={video.video} controls className='h-[720px] w-full ' /> */}
          <img src={image8} className='h-[720px] max-h-[75vh] w-full rounded-[2px] ' />

          {/* video detail */}
          <h2 className='text-[18px] font-semibold mt-[10px] mb-[10px] text-dark-text ' >{video.title}</h2>

          <div className="flex items-center justify-between ">
            <div className="text-dark-soft-text flex gap-[12px] text-[14px] ">
              <span>{video.views} views</span>
              <span>{video.createdAt}</span>
            </div>
            <div className="flex gap-[20px] text-dark-text ">
              <button className='flex items-center gap-[5px] cursor-pointer '  ><ThumbUpOutlined style={{ fontSize: '22px' }} /> <span className='text-[14px]' >{video.likes.length}</span></button>
              <button className='flex items-center gap-[5px] cursor-pointer '  ><ThumbDownOffAltOutlined style={{ fontSize: '22px' }} /> <span className='text-[14px]' >Dislike</span></button>
              <button className='flex items-center gap-[5px] cursor-pointer '  ><ReplyOutlined style={{ fontSize: '22px' }} /> <span className='text-[14px]' >Share</span></button>
              <button className='flex items-center gap-[5px] cursor-pointer '  ><AddTaskOutlined style={{ fontSize: '22px' }} /> <span className='text-[14px]' >Save</span></button>
            </div>
          </div>

          <hr className='border-[.5px] border-dark-soft my-[12px] ' />

          {/* channel detail */}
          <div className="flex justify-between mb-[1rem] ">
            <div className="flex items-start gap-[8px] ">
              <img src={image3} alt="" className='h-[50px] w-[50px] rounded-full ' />
              <div className="flex flex-col text-dark-text ">
                <span className='font-medium ' >Lama Dev</span>
                <span className='text-dark-soft-text text-[12px] ' >{user.subscribers} subscribers</span>
                <p className="text-[13px] ">{user.detail}</p>
              </div>
            </div>
            <button className='bg-[#cc1a00] text-white font-medium border-none rounded-[3px] h-max cursor-pointer py-[10px] px-[20px] ' >Subscribe</button>
          </div>

          <hr className='border-[.5px] border-dark-soft my-[12px] ' />

          {/* comments */}
          <Comments comments={comments} />

        </div>
      </div>

      <div className="flex-[2] ">
        <Recommendations videos={videos} />
      </div>

    </div>
  )
}

export default Video