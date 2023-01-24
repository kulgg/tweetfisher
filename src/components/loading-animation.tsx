import React from "react";
import Image from "next/image";

function LoadingAnimation() {
  return (
    <div>
      <Image
        src="/ball-triangle.svg"
        height={24}
        width={24}
        alt={"Loading..."}
      />
    </div>
  );
}

export default LoadingAnimation;
