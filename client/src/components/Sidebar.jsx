import React from 'react'
import { Home, Explore, Subscript, LibraryAdd, History, MusicNote, Sports, GamesOutlined, Movie, LiveHelp, Settings, Report, Help, Mode, AccountCircleOutlined } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const Sidebar = () => {

    const links = [
        { name: 'Home', link: '/', icon: Home, },
        { name: 'Explore', link: '/explore', icon: Explore, },
        { name: 'Subscription', link: '/subscription', icon: Subscript, hr: true },
        { name: 'Library', link: '/library', icon: LibraryAdd, },
        { name: 'History', link: '/history', icon: History, hr: true },
        { name: 'Sign In', link: '/auth/login', icon: AccountCircleOutlined, hr: true },
        { name: 'Music', link: '/music', icon: MusicNote, heading: true },
        { name: 'Sports', link: '/sports', icon: Sports, },
        { name: 'Gaming', link: '/gaming', icon: GamesOutlined, },
        { name: 'Movies', link: '/movies', icon: Movie, },
        { name: 'News', link: '/news', icon: Home, },
        { name: 'Live', link: '/live', icon: LiveHelp, hr: true },
        // { name: 'Settings', icon: Settings, },
        // { name: 'Report', icon: Report, },
        // { name: 'Help', icon: Help, },
        { name: 'Light Mode', icon: Mode, },
    ]

    return (
        <div className='flex-[2] shadow-box sticky top-0 bg-dark-light-main h-screen text-dark-text ' >
            <div className="">

                <Link to='/' className="flex justify-start items-center gap-[5px] ml-[1rem] h-[56px] sticky top-0 ">
                    <img src="" alt="" className='h-[25px]  ' />
                    <span className='font-bold ' >Lamatube</span>
                </Link>

                <div style={{ height: 'calc(100vh - 56px)' }} className="flex flex-col gap-[7.5px] p-[1rem] overflow-y-scroll ">
                    {
                        links.map((link, index) => (
                            <div key={index} className=' ' >
                                {
                                    link.name == 'Sign In'
                                        ?
                                        <div className="flex flex-col gap-[4px] ">
                                            <span className='text-[13px] ' >Sign in to like videos, comment, and subscribe.</span>
                                            <Link to={link.link} className='w-max flex items-center gap-[5px] py-[4px] px-[10px] bg-transparent border-[1px] border-[#3ea6ff] text-[#3ea6ff] rounded-[3px] font-medium cursor-pointer ' >
                                                <link.icon />
                                                <span>{link.name}</span>
                                            </Link>
                                        </div>
                                        :
                                        <>
                                            {link.heading && <h2 className="font-medium text-dark-soft-text text-[14px]">Best of Lamatube</h2>}
                                            <Link to={link.link} key={index} className="flex items-center gap-[6px] hover:bg-dark-soft px-[4px] py-[6px] rounded-[4px] cursor-pointer ">
                                                <link.icon style={{ fontSize: '18px' }} />
                                                <span className='text-[14px] ' >{link.name}</span>
                                            </Link>
                                        </>
                                }
                                {link.hr && <hr className='my-[6px] border-[.5px] border-dark-soft ' />}
                            </div>
                        ))
                    }

                </div>


            </div>
        </div>
    )
}

export default Sidebar