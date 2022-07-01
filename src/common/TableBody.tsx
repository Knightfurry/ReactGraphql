 /*
   create table row.
  */
   export const TableRows =  (rowData: { key: any; index: any;}, tableHeader: any)=>{
    const { key, index } = rowData;
    const tableCell = Object.keys(tableHeader);
    const columnData = tableCell.map((keyD, i) => {
      if(keyD==='name')
      return <td key={i} ><a href={key.url} target={"_blank"} rel="noreferrer">{key[keyD]}</a></td>;
      return <td key={i}>{key[keyD]}</td>;
    });
    return <tr key={index}>{columnData}</tr>;
  }


  export const tableData = (dataPerPage: any[], tableHeader: any) => {
    return dataPerPage.map((key: any, index: any) => TableRows({ key, index },tableHeader));
  };