function ScrollToTop() {
  return (
    <div className="sticky bottom-16 z-10">
      <div className="mx-4 flex justify-end sm:mx-40">
        <div
          onClick={() => scrollTo({ top: 0, left: 0, behavior: "smooth" })}
          className="border-1 cursor-pointer rounded-full border border-gray-500 bg-gray-700 p-2 text-gray-300 hover:border-gray-400 hover:bg-gray-600 hover:text-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default ScrollToTop;
