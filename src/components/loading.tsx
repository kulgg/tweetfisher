import React from 'react'
import Image from 'next/image'

function LoadingAnimation() {
  return (
    <div>
        <Image src="/ball-triangle.svg" height={30} width={30} alt={"Loading..."}/>
    </div>
  )
}

export default LoadingAnimation