import React from 'react'

const useGetUserID = () => {
  return (
    window.localStorage.getItem("userID")
  )
}

export default useGetUserID