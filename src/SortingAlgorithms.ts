import { NUMBERS_RANGE, SPEED_RANGE } from "./DefaultValues";

const randomInt = (max: number, min: number) =>
  Math.round(Math.random() * (max - min)) + min;

const swap = (array: number[], i: number, j: number) => {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
};

export const sleep = (milliSeconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliSeconds));

const calculateDelay = (array: number[], sortingSpeed: number) => {
  const SPEED_FACTOR = 500 / array.length;
  return (SPEED_RANGE.MAX / sortingSpeed) * SPEED_FACTOR;
};

export const randomizeArray = (size: number) => {
  let randomArray = [];

  for (let i = 0; i < size; i++) {
    let randNum = randomInt(NUMBERS_RANGE.MIN, NUMBERS_RANGE.MAX);
    randomArray.push(randNum);
  }

  return randomArray;
};

export const bubbleSort = async (
  array: number[],
  sortingSpeed: number,
  setSwappedBars: ({}) => void
) => {
  let swapped;
  let delay = calculateDelay(array, sortingSpeed);

  for (let i = 0; i < array.length - 1; i++) {
    swapped = false;
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
        setSwappedBars({ left: j, right: j + 1 });
        swapped = true;
        await sleep(delay);
      }
    }

    if (!swapped) break;
  }
};

export const insertionSort = async (
  array: number[],
  sortingSpeed: number,
  setSwappedBars: ({}) => void
) => {
  let delay = calculateDelay(array, sortingSpeed);
  let i, j, key;

  for (i = 1; i < array.length; i++) {
    key = array[i];
    j = i - 1;

    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      setSwappedBars({ left: j, right: j + 1 });
      await sleep(delay);
      j--;
    }
    array[j + 1] = key;
  }
};

const merge = async (
  array: number[],
  sortingSpeed: number,
  setSwappedBars: ({}) => void,
  leftIndex: number,
  middleIndex: number,
  rightIndex: number
) => {
  let delay = calculateDelay(array, sortingSpeed);

  let size1 = middleIndex - leftIndex + 1;
  let size2 = rightIndex - middleIndex;

  let leftArray = new Array(size1);
  let rightArray = new Array(size2);

  for (let i = 0; i < size1; i++) leftArray[i] = array[leftIndex + i];

  for (let i = 0; i < size2; i++) rightArray[i] = array[middleIndex + i + 1];

  let i = 0,
    j = 0,
    k = leftIndex;

  while (i < size1 && j < size2) {
    if (leftArray[i] <= rightArray[j]) {
      array[k] = leftArray[i];
      setSwappedBars({ left: k, right: i });
      i++;
    } else {
      array[k] = rightArray[j];
      setSwappedBars({ left: k, right: middleIndex + j });
      j++;
    }
    k++;
    await sleep(delay);
  }

  while (i < size1) {
    array[k] = leftArray[i];
    setSwappedBars({ left: k, right: i });
    await sleep(delay);
    i++;
    k++;
  }

  while (j < size2) {
    array[k] = rightArray[j];
    setSwappedBars({ left: k, right: middleIndex + j });
    await sleep(delay);
    j++;
    k++;
  }
};

export const mergeSort = async (
  array: number[],
  sortingSpeed: number,
  setSwappedBars: ({}) => void,
  leftIndex = 0,
  rightIndex = array.length
) => {
  if (leftIndex >= rightIndex) return;

  let middleIndex = leftIndex + Math.floor((rightIndex - leftIndex) / 2);
  await mergeSort(array, sortingSpeed, setSwappedBars, leftIndex, middleIndex);
  await mergeSort(
    array,
    sortingSpeed,
    setSwappedBars,
    middleIndex + 1,
    rightIndex
  );
  await merge(
    array,
    sortingSpeed,
    setSwappedBars,
    leftIndex,
    middleIndex,
    rightIndex
  );
};

export const heapSort = async (
  array: number[],
  sortingSpeed: number,
  setSwappedBars: ({}) => void
) => {
  let size = array.length;
  let delay = calculateDelay(array, sortingSpeed);

  for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
    await heapify(array, sortingSpeed, setSwappedBars, i, size);
  }

  for (let i = size - 1; i > 0; i--) {
    swap(array, 0, i);
    setSwappedBars({ left: 0, right: i });
    await sleep(delay);
    await heapify(array, sortingSpeed, setSwappedBars, 0, i);
  }
};

const heapify = async (
  array: number[],
  sortingSpeed: number,
  setSwappedBars: ({}) => void,
  rootIndex: number,
  size: number
) => {
  let largestElementIndex = rootIndex;
  let leftChildIndex = 2 * rootIndex + 1;
  let rightChildIndex = 2 * rootIndex + 2;
  let delay = calculateDelay(array, sortingSpeed);

  if (
    leftChildIndex < size &&
    array[leftChildIndex] > array[largestElementIndex]
  ) {
    largestElementIndex = leftChildIndex;
  }

  if (
    rightChildIndex < size &&
    array[rightChildIndex] > array[largestElementIndex]
  ) {
    largestElementIndex = rightChildIndex;
  }

  if (largestElementIndex !== rootIndex) {
    swap(array, rootIndex, largestElementIndex);
    setSwappedBars({ left: rootIndex, right: largestElementIndex });
    await sleep(delay);
    await heapify(
      array,
      sortingSpeed,
      setSwappedBars,
      largestElementIndex,
      size
    );
  }
};

const partition = async (
  array: number[],
  startIndex: number,
  endIndex: number,
  sortingSpeed: number,
  setSwappedBars: ({}) => void
) => {
  let pivot = array[endIndex];
  let delay = calculateDelay(array, sortingSpeed);

  let i = startIndex - 1;

  for (let j = startIndex; j <= endIndex - 1; j++) {
    if (array[j] < pivot) {
      i++;
      swap(array, i, j);
      setSwappedBars({ left: i, right: j });
      await sleep(delay);
    }
  }
  swap(array, i + 1, endIndex);
  setSwappedBars({ left: i + 1, right: endIndex });
  return i + 1;
};

export const quickSort = async (
  array: number[],
  sortingSpeed: number,
  startIndex = 0,
  endIndex = array.length,
  setSwappedBars: ({}) => void
) => {
  if (startIndex >= endIndex) return;

  let partitionIndex = await partition(
    array,
    startIndex,
    endIndex,
    sortingSpeed,
    setSwappedBars
  );

  await quickSort(
    array,
    sortingSpeed,
    startIndex,
    partitionIndex - 1,
    setSwappedBars
  );
  await quickSort(
    array,
    sortingSpeed,
    partitionIndex + 1,
    endIndex,
    setSwappedBars
  );
};

export const selectionSort = async (
  array: number[],
  sortingSpeed: number,
  setSwappedBars: ({}) => void
) => {
  let delay = calculateDelay(array, sortingSpeed);
  let length = array.length;

  for (let i = 0; i < length - 1; i++) {
    let minElementIndex = i;
    for (let j = i + 1; j < length; j++) {
      if (array[j] < array[minElementIndex]) minElementIndex = j;
    }

    swap(array, minElementIndex, i);
    setSwappedBars({ left: minElementIndex, right: i });
    await sleep(delay);
  }
};
