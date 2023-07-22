import { AccountCircleOutlined, SearchOutlined } from '@mui/icons-material'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const [query, setQuery] = useState('')

  const handleSearch = () => {
    navigate(`/serach/${query}`)
  }

  return (
    <div className='sticky top-0 bg-dark-light-main h-[56px] ' >
      <div className="flex justify-between items-center relative h-full px-[20px] ">

        <form onSubmit={handleSearch} className="flex items-center justify-between h-[36px] text-dark-soft-text p-[5px] border-[1px] border-dark-soft-text rounded-[4px] w-[40%] ">
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search' className='flex-[11] border-none outline-none bg-transparent ' />
          <button type='submit' className='flex-[1]' ><SearchOutlined className='' /></button>
        </form>

        <Link to='/auth/login' className='w-max flex items-center gap-[5px] py-[4px] px-[10px] bg-transparent border-[1px] border-[#3ea6ff] text-[#3ea6ff] rounded-[3px] font-medium cursor-pointer ' >
          <AccountCircleOutlined />
          <span>Sign In</span>
        </Link>

      </div>
    </div>
  )
}

export default Navbar