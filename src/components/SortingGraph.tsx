import React, { FC, useEffect, useRef, useState } from "react";
import styles from "../styles/SortingGraph.module.scss";
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from "../DefaultValues";

interface IProps {
  arraySize: number;
  array: number[];
  maxValue: number;
  isSorting: boolean;
  swappedBars: { left?: number; right?: number };
}

const SortingGraph: FC<IProps> = ({
  arraySize,
  array,
  maxValue,
  swappedBars,
  isSorting,
}) => {
  const [graphHeight, setGraphHeight] = useState(DEFAULT_HEIGHT);
  const [graphWidth, setGraphWidth] = useState(DEFAULT_WIDTH);

  const graphRef = useRef<HTMLDivElement>(null);

  const handleSizeChange = () => {
    setGraphWidth(graphRef.current?.clientWidth || DEFAULT_WIDTH);
  };

  useEffect(() => {
    setGraphHeight(graphRef.current?.clientHeight || DEFAULT_HEIGHT);
    setGraphWidth(graphRef.current?.clientWidth || DEFAULT_WIDTH);

    window.addEventListener("resize", handleSizeChange);
    return () => {
      window.removeEventListener("resize", handleSizeChange);
    };
  }, []);

  const getColorStyle = (index: number) => {
    if (!isSorting) return "aqua";
    if (swappedBars.left === index) return "#ff4953";
    else if (swappedBars.right === index) return "#656f7b";
    return "aqua";
  };

  return (
    <div className={styles.graph} ref={graphRef}>
      {array.map((num, index) => {
        return (
          <div
            key={index}
            className={styles.bar}
            style={{
              height: `${(num / maxValue) * graphHeight}px`,
              width: `${graphWidth / arraySize - 5}px`,
              backgroundColor: `${getColorStyle(index)}`,
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default SortingGraph;
