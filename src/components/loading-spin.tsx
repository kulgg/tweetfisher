import React from "react";
import Image from "next/image";

function LoadingSpin() {
  return (
    <div>
      <Image src="/tail-spin.svg" height={24} width={24} alt={"Loading..."} />
    </div>
  );
}

export default LoadingSpin;
