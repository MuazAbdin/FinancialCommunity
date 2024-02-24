import styled from "styled-components";

const Wrapper = styled.main`
  flex-grow: 1;
  overflow-y: scroll;
  background-color: var(--background-color-transparent);
  font-family: var(--main-font);
  padding: 1rem;
  display: grid;
  gap: 1rem;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr 3fr;
  grid-template-areas:
    "aside header"
    "aside content";
  justify-items: stretch;
  align-items: flex-start;

  header {
    grid-area: header;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.25em;
    color: var(--text-color);
  }

  a:visited {
    text-decoration: none;
    color: var(--highlight-color);
  }

  .active {
    background-color: var(--highlight-background-color);
  }
`;

export default Wrapper;