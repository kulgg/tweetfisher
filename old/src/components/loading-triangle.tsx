import Image from "next/image";

function LoadingTriangle() {
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

export default LoadingTriangle;
