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
const options = [
  { label: '10', value: 10 },
  { label: '20', value: 20 },
  { label: '30', value: 30 },
];

export default function Table (props: any){
  const [countPerPage, setCountPerPage] = React.useState(10);
  // initial state for serach field.
  const [value, setValue] = useState("");
  // initial state for pagination.
  const [currentPage, setCurrentPage] = useState(1);
  const [updatedPageData, setUpdatedPageData] = useState(cloneDeep(props.tableData));
  // initial state for page data.
  const [dataPerPage, setDataPerpage] = useState(
    cloneDeep(props.tableData.slice(0, countPerPage))
  );
  // change handler for rows parpage dropdown.
  const handleChange = (event:any) => {
    setCountPerPage(event.target.value);
  };

  // reset the page when count per page changes.
  useEffect(() => {
    updatePage(1);
  }, [countPerPage])

  /**
   * Item to be serched by name in table and return
   * Reset the pagination.
   */
  const searchData = useRef(
    throttle(val => {
      const query = val.toLowerCase();
      const data = cloneDeep(
        props.tableData
          .filter((item: { name: string; }) => item.name.toLowerCase().indexOf(query) > -1)
          .slice(0, countPerPage)
      );
      setDataPerpage(data);
      setUpdatedPageData(props.tableData
        .filter((item: { name: string; }) => item.name.toLowerCase().indexOf(query) > -1));
      setCurrentPage(1);

    }, 400)
  );
 /*
   initialize component with pagination 1 when serchfield is empty.
   rerender when serch is performed.
  */
  useEffect(() => {
    if (!value) {
      updatePage(1);
      setUpdatedPageData(cloneDeep(props.tableData));
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
    setDataPerpage(cloneDeep(updatedPageData.slice(from, to)));
  };

  // when serach is done update pagination accordingly.
  useEffect(() => {
    if (!value) {
      updatePage(1);
    }
  }, [updatedPageData]);


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
      <div className="bottomContainer">
      <Pagination
        pageSize={countPerPage}
        onChange={updatePage}
        current={currentPage}
        total={updatedPageData.length}
      />
    <div className="pageCount">
      <label>
        Rows per page: 
        <select value={countPerPage} onChange={handleChange}>
        {options.map((option) => (
            <option value={option.value}> {option.label} </option>
          ))}
        </select>
      </label>
    </div>
    </div>
      {/* when search results are empty */}
      </div>:<div className="nodata"> NO Data Available</div>}
    </>
  );
};
