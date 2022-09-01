import React, { FC, useEffect, useRef, useState } from "react";
import styles from "../styles/SortingGraph.module.scss";
import {
  NUMBERS_RANGE,
  DEFAULT_ARRAY,
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
} from "../DefaultValues";

const SortingGraph: FC<{ arraySize: number }> = (props) => {
  const [array, setArray] = useState<number[]>(DEFAULT_ARRAY);
  const [maxValue, setMaxValue] = useState(Number.MIN_VALUE);
  const [graphHeight, setGraphHeight] = useState(DEFAULT_HEIGHT);
  const [graphWidth, setGraphWidth] = useState(DEFAULT_WIDTH);

  const graphRef = useRef<HTMLDivElement>(null);

  const randomInt = (max: number, min: number) =>
    Math.round(Math.random() * (max - min)) + min;

  const createRandomArray = (size: number) => {
    let maxValue = Number.MIN_VALUE;
    let randomArray = [];

    for (let i = 0; i < size; i++) {
      let randNum = randomInt(NUMBERS_RANGE.MIN, NUMBERS_RANGE.MAX);
      randomArray.push(randNum);
      maxValue = Math.max(maxValue, randNum);
    }
    setMaxValue(maxValue);
    return randomArray;
  };

  useEffect(() => {
    setGraphHeight(graphRef.current?.clientHeight || DEFAULT_HEIGHT);
    setGraphWidth(graphRef.current?.clientWidth || DEFAULT_WIDTH);
    setArray(createRandomArray(props.arraySize));
  }, []);

  return (
    <div className={styles.graph} ref={graphRef}>
      {array.map((num, index) => {
        return (
          <div
            key={index}
            className={styles.bar}
            style={{
              height: `${((num / maxValue) * graphHeight)}px`,
              width: `${(graphWidth / props.arraySize - 5)}px`,
            }}
          >
            {num}
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(SortingGraph);
