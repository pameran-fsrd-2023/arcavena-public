const Nirmana = ({
  size,
  data,
  onCellClick,
}: {
  size: "small" | "medium";
  data: string[][];
  onCellClick?: (rowIndex: number, colIndex: number) => void;
}) => {
  const numRows = size === "small" ? 5 : 10;
  const numCols = size === "small" ? 5 : 10;

  return (
    <div
      className={
        size === "small"
          ? "grid aspect-square h-full w-full grid-cols-5 gap-0"
          : "grid aspect-square h-full w-full grid-cols-10 gap-0"
      }
    >
      {data
        .slice(0, numRows)
        .map((row, rowIndex) =>
          row
            .slice(0, numCols)
            .map((color, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="h-[100%] w-[100%] cursor-pointer"
                style={{ backgroundColor: color }}
                onClick={() =>
                  onCellClick ? onCellClick(rowIndex, colIndex) : {}
                }
              ></div>
            )),
        )}
    </div>
  );
};

export default Nirmana;
