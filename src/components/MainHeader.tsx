import React, { useEffect, useState } from "react";
import styles from "../styles/MainHeader.module.scss";

const MainHeader = () => {
  const HEADER_TEXT = "Sorting Algorithms Visualizer";
  // const getHeaderText = (): Map<number, string> => {
  //   const indexToCharMap = new Map<number, string>([]);

  //   HEADER_TEXT.split("").forEach((char, index) => {
  //     indexToCharMap.set(index, char);
  //   });

  //   return new Map(Array.from(indexToCharMap).reverse());
  // };

  // const [headerText, setHeaderText] = useState(getHeaderText());
  // const [isSorted, setIsSorted] = useState(false);

  // const sleep = (): void => {
  //   for (let i = 0; i < 250000000; i++);
  // };

  // const reverseAndSort = async () => {
  //   for (let i = 0, j = headerText.size - 1; i <= j; i++, j--) {
  //     setHeaderText((headerText) => {
  //       let temp = headerText.get(i);
  //       headerText.set(i, headerText.get(j) || "");
  //       headerText.set(j, temp || "");
  //       return headerText;
  //     });
  //     sleep();
  //   }
  //   setIsSorted(true);
  // };

  // useEffect(() => {
  //   (async function () {
  //     if (!isSorted) await reverseAndSort();
  //   })();
  // }, []);

  // useEffect(() => {
  //   console.log(headerText.get(0));
  // }, [headerText.]);

  // console.log("hi", isSorted, headerText);

  return (
    <header className={styles.header}>
      {/* <h1>{Array.from(headerText.values())}</h1> */}
      <h1>{HEADER_TEXT}</h1>
    </header>
  );
};

export default MainHeader;
