import React from 'react'

const Recommendations = ({videos}) => {
  return (
    <div className='' >

      {
        videos.map((video, index) => (
          <VideoCard video={video} key={index} type='sm' />
        ))
      }

    </div>
  )
}

export default Recommendations