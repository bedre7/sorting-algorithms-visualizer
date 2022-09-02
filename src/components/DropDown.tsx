import React, { FC, ChangeEvent } from "react";
import styles from "../styles/DropDown.module.scss";
import { SORTBY } from "../DefaultValues";

const DropDown: FC<{ value: string; onChange: (value: string) => void }> = (
  props
) => {
  const dropdownChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    props.onChange(e.target.value);
  };

  return (
    <div className={styles.dropdown}>
      <label>Sort By</label>
      <select
        name="sortby"
        id="sortby"
        value={props.value}
        onChange={dropdownChangeHandler}
      >
        <option value={SORTBY.BUBBLE_SORT}>{SORTBY.BUBBLE_SORT}</option>
        <option value={SORTBY.INSERTION_SORT}>{SORTBY.INSERTION_SORT}</option>
        <option value={SORTBY.HEAP_SORT}>{SORTBY.HEAP_SORT}</option>
        <option value={SORTBY.MERGE_SORT}>{SORTBY.MERGE_SORT}</option>
        <option value={SORTBY.QUICK_SORT}>{SORTBY.QUICK_SORT}</option>
        <option value={SORTBY.SELECTION_SORT}>{SORTBY.SELECTION_SORT}</option>
      </select>
    </div>
  );
};

export default DropDown;
