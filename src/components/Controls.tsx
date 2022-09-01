import React, { ChangeEvent, useState } from "react";
import styles from "../styles/Controls.module.scss";
import { NUMBERS_RANGE } from "../DefaultValues";
import RangeSlider from "./RangeSlider";

const SORTBY = {
  BUBBLE_SORT: "Bubble Sort",
  INSERTION_SORT: "Insertion Sort",
  HEAP_SORT: "Heap Sort",
  MERGE_SORT: "Merge Sort",
  QUICK_SORT: "Quick Sort",
};

const Controls = () => {
  const [arraySize, setArraySize] = useState(0);
  const [sortingSpeed, setSortingSpeed] = useState(0);

  const changeHandler = (event: any) => {
    if (event.target.name == "Size") {
      setArraySize(event.target.value || 0);
    } else if (event.target.name == "Speed") {
      setSortingSpeed(event.target.value || 0);
    }
  };

  return (
    <div className={styles.controls}>
      <RangeSlider
        value={arraySize}
        name="Size"
        min={NUMBERS_RANGE.MIN}
        max={NUMBERS_RANGE.MAX}
        onChange={changeHandler}
      />
      <RangeSlider
        value={sortingSpeed}
        name="Speed"
        min={NUMBERS_RANGE.MIN}
        max={NUMBERS_RANGE.MAX}
        onChange={changeHandler}
      />

      <div className={styles.dropdown}>
        <label>Sort By</label>
        <select name="sortby" id="sortby">
          <option value="bubble">{SORTBY.BUBBLE_SORT}</option>
          <option value="insertion">{SORTBY.INSERTION_SORT}</option>
          <option value="heap">{SORTBY.HEAP_SORT}</option>
          <option value="merge">{SORTBY.MERGE_SORT}</option>
          <option value="quick">{SORTBY.QUICK_SORT}</option>
        </select>
      </div>
      <div className={styles.buttons}>
        <button className={styles.button}>Sort</button>
        <button className={styles.button}>Randomize</button>
      </div>
    </div>
  );
};

export default Controls;
