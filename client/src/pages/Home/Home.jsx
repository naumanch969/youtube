import React, { useEffect } from 'react'
import { VideoCard } from '../../components'
import { getRandomVideos, getTrendedVideos, subscribedVideos } from '../../redux/actions/video'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'


const Home = ({ type }) => {

  const dispatch = useDispatch()
  const { title } = useParams()
  const { vidoes, isFetching, error } = useSelector(state => state.video)

  useEffect(() => {
    type == 'random' && dispatch(getRandomVideos())
    type == 'explore' && dispatch(getTrendedVideos())
    type == 'subscribed' && dispatch(subscribedVideos())
    type == 'search' && dispatch(searchByTitle(title))
  }, [])

  return (
    <div className='flex flex-wrap justify-between ' >

      {
        vidoes?.map((video, index) => (
          <VideoCard video={video} key={index} />
        ))
      }

    </div>
  )
}

export default Home