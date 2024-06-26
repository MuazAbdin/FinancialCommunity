import { ChangeEvent, FormEvent, useState } from "react";
import {
  FaMagnifyingGlass,
  FaAnglesDown,
  FaAnglesUp,
  FaAnglesLeft,
  FaAnglesRight,
} from "react-icons/fa6";
import { Form, useSubmit } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface ISearcBarProps {
  pagesCount: number;
  currentPage: number;
  className?: string;
}

function SearchBar({ className, pagesCount, currentPage }: ISearcBarProps) {
  const [show, setShow] = useState(false);
  const toggleDisplay = () => {
    setShow((prev) => !prev);
  };

  const [query, setQuery] = useState("");
  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };

  const submit = useSubmit();

  const handleSubmit = (event: FormEvent<HTMLButtonElement>, page: number) => {
    event.preventDefault();

    const fd = new FormData(event.currentTarget.form!);
    const query = fd.get("search") || "";
    const side = fd.getAll("side") || [];
    const type = fd.getAll("type") || [];
    const category = fd.getAll("category") || [];
    const start = fd.get("start") || "";
    const end = fd.get("end") || "";

    // console.log({ query, side, type, category, start, end, page });

    const params = new URLSearchParams({
      query,
      side,
      type,
      category,
      start,
      end,
      page,
    });

    submit(params);
    setShow(false);
  };

  return (
    <Form className={className} noValidate>
      <div className="search-controller">
        <section className="filters-list">
          {show ? (
            <FaAnglesUp onClick={toggleDisplay} />
          ) : (
            <FaAnglesDown onClick={toggleDisplay} />
          )}
          <Filters show={show} />
        </section>
        <input
          type="search"
          id="search"
          name="search"
          placeholder="Search by Account Number"
          value={query}
          onChange={handleQueryChange}
        />
        <button className="btn" onClick={(event) => handleSubmit(event, 1)}>
          <FaMagnifyingGlass />
        </button>
      </div>
      <RangeDatePicker />
      <Pagenation
        pagesCount={pagesCount}
        currentPage={currentPage}
        handleSubmit={handleSubmit}
      />
    </Form>
  );
}

export default SearchBar;

const FILTERS_OPTIONS = [
  { name: "side", options: ["Payee", "Payor"] },
  {
    name: "type",
    options: ["Deposit", "Withdrawal", "Transfer", "Loan Payment"],
  },
  {
    name: "category",
    options: [
      "Entertainment",
      "Food",
      "Government",
      "Healthcare",
      "Housing",
      "Insurance",
      "Miscellaneous",
      "Payments",
      "Salary",
      "Transportation",
    ],
  },
];

function Filters({ show }: { show: boolean }) {
  return (
    <section className={`filters ${show ? "show" : ""}`}>
      {FILTERS_OPTIONS.map((f) => (
        <section key={f.name} className="options-group">
          <h5 className="options-group__title">{f.name}</h5>
          <menu className="filter-options">
            {f.options.map((opt) => (
              <li key={opt} className="c-flex">
                <input type="checkbox" id={opt} name={f.name} value={opt} />
                <label htmlFor={opt}>{opt}</label>
              </li>
            ))}
          </menu>
        </section>
      ))}
    </section>
  );
}

function RangeDatePicker() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  // console.log(startDate);
  return (
    <fieldset className="range-date-picker c-flex">
      <span>from</span>
      <DatePicker
        showIcon
        toggleCalendarOnIconClick
        id="start"
        name="start"
        placeholderText="MM/DD/YYYY"
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
      <span>to</span>
      <DatePicker
        showIcon
        toggleCalendarOnIconClick
        id="end"
        name="end"
        placeholderText="MM/DD/YYYY"
        selected={endDate}
        onChange={(date: Date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
    </fieldset>
  );
}

interface IPagenationProps {
  pagesCount: number;
  currentPage: number;
  handleSubmit: (event: FormEvent<HTMLButtonElement>, page: number) => void;
}

function Pagenation({
  pagesCount,
  currentPage,
  handleSubmit,
}: IPagenationProps) {
  return (
    <section className="pagenation c-flex">
      <button
        className="btn page-left c-flex"
        disabled={currentPage <= 1}
        onClick={(event) => handleSubmit(event, currentPage - 1)}
      >
        <FaAnglesLeft />
      </button>
      {Array(pagesCount)
        .fill(null)
        .map((_, i) => (
          <button
            key={i}
            className={`btn ${currentPage === i + 1 ? "current" : ""}`}
            onClick={(event) => handleSubmit(event, i + 1)}
          >
            {i + 1}
          </button>
        ))}
      <button
        className="btn page-right c-flex"
        disabled={currentPage >= pagesCount}
        onClick={(event) => handleSubmit(event, currentPage + 1)}
      >
        <FaAnglesRight />
      </button>
    </section>
  );
}
