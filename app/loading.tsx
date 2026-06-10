
import React from 'react'

const loading = () => {
  return (
    <> 
    <div>loading</div>
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white-900"></div>
    </div>
    </>
   
  )
}

export default loading