import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
export default function ImagePreviewer({ imageSources }) {
  const count = imageSources.length > 3 ? 3 : imageSources.length;
  const styles = {
    grid: {
      1: "grid grid-cols-1 gap-2 my-2",
      2: "grid sm:grid-cols-2 gap-2 my-2",
      3: "grid sm:grid-cols-3 gap-2 my-2",
    },
    image: {
      1: "w-full h-full",
      2: "sm:w-60 sm:h-60",
      3: "sm:w-44 sm:h-44",
    },
  };

  const [showCarousel, setShowCarousel] = useState(false);
  useEffect(() => {
    if (showCarousel) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [showCarousel]);
  return (
    <div className="flex justify-center items-center">
      <div className={styles.grid[count]}>
        {imageSources &&
          imageSources.map((source, i) => {
            return (
              <img
                key={i}
                src={source}
                className={styles.image[count]}
                onClick={() => {
                  debugger;
                  setShowCarousel(true);
                }}
              />
            );
          })}
      </div>
      {showCarousel && (
        <ImageCarousel
          images={imageSources}
          position={1}
          onExit={() => setShowCarousel(false)}
        />
      )}
    </div>
  );
}

function ImageCarousel({ images, position, onExit }) {
  return (
    <div className=" flex justify-center items-center fixed h-full top-0 w-full z-10 flex-column">
      <div
        className="opacity-50 backdrop-blur-lg bg-gray-100 absolute w-full h-full "
        onClick={onExit}
      ></div>
      <div className="z-50 flex flex-col items-end pt-2">
        <AiOutlineClose size={"2em"} className="mb-2 " onClick={onExit} />
        {images && (
          <div className="p-3 aspect-video">
            {images.map((image, i) => (
              <div className={i != 0 ? "hidden" : ""}>
                <img
                  key={"sd" + i}
                  src={image}
                  className="w-11/12 max-w-screen-lg max-h-screen md:sm object-cover	"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
