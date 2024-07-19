const Loading = () => {
  return (
    <div className="flex flex-col space-y-8 items-center justify-center mx-auto w-full">
      <div
        className="animate-spin inline-block size-20 border-[10px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
      <p className="text-slate-500 text-lg font-medium">Loading...</p>
    </div>
  );
};

export default Loading;
