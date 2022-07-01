import React, {useState, useEffect, useRef}from "react";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import {tableData} from "./common/TableBody";
import {HeadRow} from "./common/TableHeader";

const tableHeader = {
  name: "Name",
  stargazerCount: "🌟 Stars",
  forkCount: "🍴 Forks",
};

export default function Table (props: any){
  const countPerPage = 10;
  // initial state for serach field.
  const [value, setValue] = useState("");
  // initial state for pagination.
  const [currentPage, setCurrentPage] = useState(1);
  // initial state for page data.
  const [dataPerPage, setDataPerpage] = useState(
    cloneDeep(props.tableData.slice(0, countPerPage))
  );

  /**
   * Item to be serched by name in table and return
   * Reset the pagination.
   */
  const searchData = useRef(
    throttle(val => {
      const query = val.toLowerCase();
      setCurrentPage(1);
      const data = cloneDeep(
        props.tableData
          .filter((item: { name: string; }) => item.name.toLowerCase().indexOf(query) > -1)
          .slice(0, countPerPage)
      );
      setDataPerpage(data);
    }, 400)
  );
 /*
   initialize component with pagination 1 when serchfield is empty.
   rerender when serch is performed.
  */
  useEffect(() => {
    if (!value) {
      updatePage(1);
    } else {
      searchData.current(value);
    }
  }, [value]);

  /*
    updated page data when pagination changes.
   */
  const updatePage = (p:any) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setDataPerpage(cloneDeep(props.tableData.slice(from, to)));
  };

  return (
    <>
      <div className="search">
        <input
          placeholder="Search owner by name"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </div>
      {dataPerPage.length ? <div>
        <table>
        <thead>
          <tr>{HeadRow(tableHeader)}</tr>
        </thead>
        <tbody className="trhover">{tableData(dataPerPage, tableHeader)}</tbody>
      </table>
      <Pagination
        pageSize={countPerPage}
        onChange={updatePage}
        current={currentPage}
        total={props.tableData.length}
      />
      {/* when search results are empty */}
      </div>:<div className="nodata"> NO Data Available</div>}
    </>
  );
};
