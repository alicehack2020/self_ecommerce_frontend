import React from 'react'
import { Audio, Triangle } from 'react-loader-spinner'
import "../App.css"
const Loading = ({isLoading}) => {
    return (<div className='floatLoader'>
 <Triangle
    height="80"
    width="80"
    color="#4fa94d"
    ariaLabel="triangle-loading"
    wrapperStyle={{}}
    wrapperClassName=""
    visible={isLoading}
  />
  </div>
  
  )
}

export default Loading