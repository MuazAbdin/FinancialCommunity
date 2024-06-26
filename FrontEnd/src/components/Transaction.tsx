import { ITransactionProps } from "../types/components";
import { accountNumFormatter } from "../utils/inputFormatters";

function getDate(date: Date): string {
  const month = date.getMonth() + 1; // months from 1-12
  const day = date.getDate();
  return `${day}/${month}`;
}

function Transaction(props: ITransactionProps) {
  const { amount, targetAccount, tag, category, createdAt } = props;
  const amountStyle = tag === "payor" ? "red" : "green";
  const sign = tag === "payor" ? "- " : "";

  return (
    <tr>
      <td>{getDate(new Date(createdAt))}</td>
      <td>{accountNumFormatter(targetAccount)}</td>
      <td>{category}</td>
      <td
        style={{
          backgroundColor: `var(--${amountStyle}-light)`,
          color: `var(--${amountStyle}-dark)`,
          fontWeight: 600,
        }}
      >
        {sign}
        {amount} ₪
      </td>
    </tr>
  );
}

export default Transaction;
