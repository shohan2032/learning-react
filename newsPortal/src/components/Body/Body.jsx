import React from 'react'
import Filtering from './Filtering/Filtering'
import AllNews from './AllNews/AllNews'
function body({category}) {
  return (
    <>
    <Filtering />
    <AllNews category={category}/>
    </>
  )
}

export default body