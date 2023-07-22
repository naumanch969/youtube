import React from 'react'
import { image1, image2 } from '../assets'
import { Link } from 'react-router-dom'

const VideoCard = ({ type, video }) => {

  console.log('video', video)
  return (
    <Link to='/video/665565' className={`cursor-pointer ${type == 'sm' ? 'flex gap-[10px] mb-[10px] ' : 'flex flex-col gap-[6px] mb-[20px] w-[24%] '} `} >

      <div className={` ${type == 'sm' ? 'h-[120px] flex-[3] ' : 'w-full h-[10rem]'} bg-[#999] rounded-[8px]`} >
        <img src={image1} alt="" className={`rounded-[8px] w-full h-full `} />
      </div>

      <div className={`flex gap-[12px] ${type == 'sm' ? 'mt-0 flex-[2] ' : ' '} `}>
        <img src={image2} alt="" className={`w-[36px] h-[36px] rounded-full bg-[#999] ${type == 'sm' ? 'hidden' : 'block'} `} />
        <div className="">
          <h1 className='text-[12px] font-medium text-dark-text ' >Learn how to build full stack social media MERN application</h1>
          <p className='text-[10px] text-dark-soft-text ' >Lama dev</p>
          <div className="flex justify-start items-center gap-[1rem] text-[9px] text-dark-soft-text ">
            <span className=' ' >5k views</span>
            <span className=' ' >1 day ago</span>
          </div>
        </div>
      </div>

    </Link>
  )
}

export default VideoCard