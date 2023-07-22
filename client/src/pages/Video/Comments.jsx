import React, { useEffect } from 'react'
import { image6, image7 } from '../../assets'
import { useDispatch, useSelector } from 'react-redux'
import { getCertainUsers } from '../../redux/actions/user'

const Comments = ({ comments }) => {

    const dispatch = useDispatch()
    const userIds = comments.map(comment => comment.userId)
    const { users } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getCertainUsers(userIds))
    }, [])

    const findedUser = (userId) => {
        const findedUsers = users.find(u => u._id == userId)
        return findedUsers[0]
    }

    const Comment = ({ comment }) => (
        <div className="flex gap-[10px] ">
            <img src={findedUser(comment.userId).image} alt="" className='w-[50px] h-[50px] rounded-full ' />
            <div className="flex flex-col gap-[2px] ">
                <div className="flex items-center gap-[5px] ">
                    <h3 className='text-[14px] font-medium text-dark-text ' >J{findedUser(comment.userId).username}</h3>
                    <span className='text-[12px] font-light text-dark-soft-text '  >{comment.createdAt}</span>
                </div>
                <span className='text-[11px] text-[#ccc] ' >{comment.description}</span>
            </div>
        </div>
    )


    return (
        <div className=' ' >

            <div className="flex items-center gap-[10px] ">
                <img src={image6} alt="" className="w-[50px] h-[50px] object-cover rounded-full " />
                <input type="text" placeholder='Add a comment...' className=' outline-none text-[14px] w-full border-b-[1px] border-dark-soft-text text-dark-soft-text bg-transparent ' />
            </div>

            <div className='w-full flex flex-col gap-[1rem] mt-[2rem] ' >
                {
                    comments.map((comment, index) => (
                        <Comment comment={comment} key={index} />
                    ))
                }
            </div>


        </div>
    )
}

export default Comments