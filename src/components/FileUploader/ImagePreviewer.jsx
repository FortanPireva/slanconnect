export default function ImagePreviewer({ imageSources }) {
  const count = imageSources.length > 3 ? 3 : imageSources.length;
  const styles = {
    grid: {
      1: "grid grid-cols-1 gap-2 my-2",
      2: "grid grid-cols-2 gap-2 my-2",
      3: "grid grid-cols-3 gap-2 my-2",
    },
    image: {
      1: "w-full h-full",
      2: "w-60 h-60",
      3: "w-44 h-44",
    },
  };
  return (
    <div className="flex justify-center items-center">
      <div className={styles.grid[count]}>
        {imageSources &&
          imageSources.map((source, i) => {
            return <img key={i} src={source} className={styles.image[count]} />;
          })}
      </div>
    </div>
  );
}
