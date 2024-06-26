import { PropsWithChildren } from "react";
import Wrapper from "../assets/stylingWrappers/Table";

interface ITableHeaderProps {
  tableCaption: string;
  tableHeader: string[];
}

function Table({
  tableCaption,
  tableHeader,
  children,
}: PropsWithChildren<ITableHeaderProps>) {
  return (
    <Wrapper>
      <caption>{tableCaption}</caption>
      <thead
        className="table-head"
        style={{ backgroundColor: "var(--yellow-light)" }}
      >
        <tr>
          {tableHeader.map((h, index) => (
            <th key={index}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </Wrapper>
  );
}

export default Table;
