import React, { useMemo } from 'react';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from 'react-table';
import Filter from './Filter';
import { Table, Container, Button } from 'react-bootstrap';

const ReactTable = ({ COLUMNS = [], DATA = [] }) => {
  const columns = useMemo(() => COLUMNS, [COLUMNS]);
  const data = useMemo(() => DATA, [DATA]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,

    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,

    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination);

  const { globalFilter, pageIndex } = state;
  return (
    <Container className="my-2">
      <Filter filter={globalFilter} setFilter={setGlobalFilter} />
      <Table striped bordered hover responsive {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => {
            return (
              // Applying header group props and header props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((cell) => {
                  return (
                    <th {...cell.getHeaderProps(cell.getSortByToggleProps())}>
                      {cell.render('Header')}

                      {cell.isSorted ? (
                        cell.isSortedDesc ? (
                          <i className="fa-sharp fa-solid fa-sort-up"></i>
                        ) : (
                          <i className="fa-sharp fa-solid fa-sort-down"></i>
                        )
                      ) : (
                        ''
                      )}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            page.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <td {...cell.getCellProps()}>
                          {
                            // Render the cell contents
                            cell.render('Cell')
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </Table>
      <Container className="w-100 d-flex justify-content-around">
        <Button
          variant="warning"
          onClick={previousPage}
          disabled={canPreviousPage ? false : true}
        >
          Previous
        </Button>
        <Button
          variant="warning"
          onClick={nextPage}
          disabled={canNextPage ? false : true}
        >
          Next
        </Button>
      </Container>
      <p className="text-center my-2">
        Page {pageIndex + 1} of {pageOptions.length}
      </p>
    </Container>
  );
};

export default ReactTable;
