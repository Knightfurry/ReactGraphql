// Create table header.
export const HeadRow = (tableHeader:object) => {
    return Object.values(tableHeader).map((title, index) => (
      <td key={index}>{title}</td>
    ));
    
  }