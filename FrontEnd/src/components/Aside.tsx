import {
  FaFileInvoiceDollar,
  FaHandHoldingDollar,
  FaRegCircleUser,
} from "react-icons/fa6";
import Wrapper from "../assets/stylingWrappers/Aside";
import Accordion from "./Accordion";
import { accountNumFormatter } from "../utils/inputFormatters";

const PROFILE_SECTIONS = [
  { name: "overview", to: "" },
  { name: "edit details", to: "edit-details" },
  { name: "change password", to: "change-password" },
];

function Aside({ accountsNums }: { accountsNums: string[] }) {
  const accounts = accountsNums.map((num) => {
    return { name: accountNumFormatter(num), to: `accounts/${num.slice(-6)}` };
  });
  const loans = accounts.map((a) => {
    return { ...a, to: `${a.to}/loan/browse` };
  });

  return (
    <Wrapper>
      <nav>
        <Accordion>
          <Accordion.Item
            id="nav-profile"
            title="profile"
            Icon={FaRegCircleUser}
            subsectoins={PROFILE_SECTIONS}
          />
          <Accordion.Item
            id="nav-accounts"
            title="accounts"
            Icon={FaFileInvoiceDollar}
            subsectoins={accounts}
          />
          <Accordion.Item
            id="nav-loans"
            title="loans"
            Icon={FaHandHoldingDollar}
            subsectoins={loans}
          />
        </Accordion>
      </nav>
    </Wrapper>
  );
}

export default Aside;
