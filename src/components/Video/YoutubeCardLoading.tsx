const YoutubeCardLoading = () => {
  return (
    <>
      <div className="w-[20rem] rounded-2xl bg-white p-1 transition-all duration-300 animate-pulse x-sm:w-full">
        {/* Placeholder for the image */}
        <div className="w-full h-44 bg-gray-300 rounded-[10px]" />

        {/* Placeholder for the title */}
        <div className="mt-3">
          <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
        </div>

        {/* Placeholder for the tags */}
        {/* <div className="flex flex-wrap gap-2 pt-[3px]">
          <div className="h-4 w-10 bg-gray-300 rounded"></div>
          <div className="h-4 w-12 bg-gray-300 rounded"></div>
          <div className="h-4 w-8 bg-gray-300 rounded"></div>
        </div> */}

        {/* Placeholder for the description */}
        <div className="mt-2">
          <div className="h-4 w-full bg-gray-300 rounded"></div>
          {/* <div className="h-4 w-5/6 bg-gray-300 rounded mt-1"></div> */}
          <div className="h-4 w-2/3 bg-gray-300 rounded mt-1"></div>
        </div>
      </div>
    </>
  );
};

export default YoutubeCardLoading;
