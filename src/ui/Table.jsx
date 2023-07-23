import styled from "styled-components";
import PropTypes from "prop-types";
import { createContext, useContext } from "react";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.header`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

// 1 create Context
const TableContext = createContext();

// 2 create Parent
function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

// 3 create children
function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role="row" columns={columns}>
      {children}
    </StyledHeader>
  );
}

function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow as="div" role="row" columns={columns}>
      {children}
    </StyledRow>
  );
}
function Body({ data, render }) {
  if (!data.length) return <Empty>No data to show at moment</Empty>;
  return <StyledBody>{data.map(render)}</StyledBody>;
}

// 4 assisting children to parent
Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

// props types
Table.propTypes = {
  children: PropTypes.node,
  columns: PropTypes.string,
};

Header.propTypes = {
  children: PropTypes.node,
};

Row.propTypes = {
  children: PropTypes.node,
};

Body.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      created_at: PropTypes.string,
      description: PropTypes.string,
      discount: PropTypes.number,
      id: PropTypes.number,
      image: PropTypes.string,
      maxCapacity: PropTypes.number,
      name: PropTypes.string,
      regularPrice: PropTypes.number,
    })
  ),
  render: PropTypes.func,
};

export default Table;
