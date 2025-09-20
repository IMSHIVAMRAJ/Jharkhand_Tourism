import { useEffect, useRef } from "react";
import { FaRegNewspaper } from "react-icons/fa";

const LatestUpdates = () => {
  const tickerRef = useRef(null);

  useEffect(() => {
    const ticker = tickerRef.current;
    let animation;

    const scroll = () => {
      if (ticker.scrollLeft >= ticker.scrollWidth - ticker.clientWidth) {
        ticker.scrollLeft = 0; // reset when reaches end
      } else {
        ticker.scrollLeft += 1; // move speed
      }
      animation = requestAnimationFrame(scroll);
    };

    animation = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animation);
  }, []);

  const updates = [
    "Timeline for tourism policy 2018",
    "The registration of the Yatra year 2025 has been started",
    "New eco-tourism hotspots to be launched soon",
    "Jharkhand introduces new travel app for tourists",
  ];

  return (
    <div className="flex items-center bg-gray-200 overflow-hidden">
      {/* Fixed Left Label */}
      <div className="flex items-center gap-2 bg-red-700 text-white px-4 py-2 font-semibold whitespace-nowrap">
        <FaRegNewspaper />
        Latest Updates
      </div>

      {/* Scrolling Content */}
      <div
        ref={tickerRef}
        className="flex-1 overflow-hidden whitespace-nowrap py-2"
      >
        <div className="inline-flex space-x-8 text-gray-800 font-medium">
          {updates.map((update, index) => (
            <span key={index} className="flex items-center">
              {update}
              <a
                href="#"
                className="ml-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full"
              >
                Read More
              </a>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestUpdates;
