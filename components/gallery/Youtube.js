import classNames from "classnames";
import { formatDistance } from "date-fns";
import Image from "next/image";
import linkifyHtml from "linkifyjs/html";
import { useRef, useState } from "react";

export default function Youtube({ videos }) {
  const title = "Youtube Videos";
  const [currentVideoIndex, setCurrentVideoIndex] = useState(null);
  const currentVideoRef = useRef(null);

  function selectVideoByIndex(index) {
    if (index > videos.length - 1) {
      setCurrentVideoIndex(0);
    } else {
      if (index < 0) {
        setCurrentVideoIndex(videos.length - 1);
      } else {
        setCurrentVideoIndex(index);
      }
    }

    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  }
  return (
    <div>
    <div className="mx-auto max-w-6xl p-4 lg:p-8">
      <div
        className={classNames("bg-gray-800 pt-20 p-12 mb-4 relative", {
          hidden: currentVideoIndex === null,
        })}
        ref={currentVideoRef}
      >
        <div className="absolute top-0 right-0">
          <button
            className="p-2 bg-gray-500 hover:bg-gray-600 focus:bg-gray-600"
            type="button"
            onClick={() => selectVideoByIndex(currentVideoIndex - 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            className="p-2 bg-gray-500 hover:bg-gray-600 focus:bg-gray-600"
            type="button"
            onClick={() => selectVideoByIndex(currentVideoIndex + 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <button
            className="p-2 bg-gray-400 hover:bg-gray-600 focus:bg-gray-600"
            type="button"
            onClick={() => setCurrentVideoIndex(null)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {currentVideoIndex !== null && (
          <>
            <div className="mb-3 text-md aspect-w-16 aspect-h-9">
              <iframe
                src={`https://www.youtube.com/embed/${videos[currentVideoIndex].snippet.resourceId.videoId}?autoplay=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <h2 className="text-3xl font-medium my-6">
              {videos[currentVideoIndex].snippet.title}
            </h2>
            <p
              className="mb-3 text-md"
              dangerouslySetInnerHTML={{
                __html: linkifyHtml(
                  videos[currentVideoIndex].snippet.description?.replace(
                    /\n/g,
                    " <br />"
                  ),
                  {
                    target: { url: "_blank" },
                  }
                ),
              }}
            ></p>
          </>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
        {videos.map(
          (
            {
              snippet: {
                title,
                publishedAt,
                thumbnails,
                resourceId: { videoId },
              },
            },
            index
          ) => {
            return (
              <button
                key={videoId}
                className="text-left"
                onClick={() => selectVideoByIndex(index)}
              >
                <Image
                  src={thumbnails.medium?.url}
                  height={thumbnails.medium?.height}
                  width={thumbnails.medium?.width}
                />
                <div className="flex flex-col justify-between mt-2">
                  <div className="line-clamp-3 text-sm font-medium">
                    {title}
                  </div>
                  <div className="text-gray-700 text-xs mt-2">
                    {formatDistance(new Date(publishedAt), new Date())} Ago
                  </div>
                </div>
              </button>
            );
          }
        )}
      </div>
    </div>
  </div>
);
}