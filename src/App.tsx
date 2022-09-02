import React, { useState, useEffect, useCallback } from "react";
import "./App.scss";
import Controls from "./components/Controls";
import MainHeader from "./components/MainHeader";
import SortingGraph from "./components/SortingGraph";
import { DEFAULT_ARRAY, SORTBY } from "./DefaultValues";
import {
  bubbleSort,
  heapSort,
  insertionSort,
  mergeSort,
  randomizeArray,
} from "./SortingAlgorithms";

function App() {
  const [array, setArray] = useState<number[]>(DEFAULT_ARRAY);
  const [arraySize, setArraySize] = useState(20);
  const [sortBy, setSortBy] = useState(SORTBY.BUBBLE_SORT);
  const [maxValue, setMaxValue] = useState(Number.MIN_VALUE);
  const [sortingSpeed, setSortingSpeed] = useState(50);
  const [swappedBars, setSwappedBars] = useState({});
  const [isSorting, setIsSorting] = useState(false);

  const createRandomArray = useCallback(() => {
    let maxValue = Number.MIN_VALUE;
    const randomArray = randomizeArray(arraySize);

    for (const randNum of randomArray) {
      maxValue = Math.max(maxValue, randNum);
    }

    setMaxValue(maxValue);
    setArray(randomArray);
  }, [arraySize]);

  const sortHandler = async () => {
    setIsSorting(true);
    switch (sortBy) {
      case SORTBY.BUBBLE_SORT:
        await bubbleSort(array, sortingSpeed, setSwappedBars);
        break;
      case SORTBY.INSERTION_SORT:
        await insertionSort(array, sortingSpeed, setSwappedBars);
        break;
      case SORTBY.MERGE_SORT:
        await mergeSort(array, sortingSpeed, setSwappedBars);
        break;
      case SORTBY.HEAP_SORT:
        await heapSort(array, sortingSpeed, setSwappedBars);
        break;
      case SORTBY.SELECTION_SORT:
        await heapSort(array, sortingSpeed, setSwappedBars);
        break;
      case SORTBY.QUICK_SORT:
        await heapSort(array, sortingSpeed, setSwappedBars);
        break;
    }
    setIsSorting(false);
  };

  useEffect(() => {
    createRandomArray();
  }, [arraySize, createRandomArray]);

  return (
    <div className="App">
      <MainHeader />
      <SortingGraph
        maxValue={maxValue}
        array={array}
        arraySize={arraySize}
        swappedBars={swappedBars}
        isSorting={isSorting}
      />
      <Controls
        sortBy={sortBy}
        isSorting={isSorting}
        onSort={sortHandler}
        arraySize={arraySize}
        sortingSpeed={sortingSpeed}
        arrayRandomizeHandler={createRandomArray}
        onDropdownChange={(sortBy) => setSortBy(sortBy)}
        onSizeChange={(size) => setArraySize(size)}
        onSpeedChange={(speed) => setSortingSpeed(speed)}
      />
    </div>
  );
}

export default App;
