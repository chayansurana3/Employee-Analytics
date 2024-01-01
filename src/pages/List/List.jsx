import React, { useEffect, useState } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import './list.css';

function EmployeeList () {
    let [employeeData, setEmployeeData] = useState([]);
    let [theme, setTheme] = useState("light");
    let tdClass = theme === "light" ? null : "theme-td";

    useEffect(() => {
        document.title = "Employee Lists";
        let currTheme = localStorage.getItem("theme") || "light";
        setTheme(currTheme);

        const fetchData = async () => {
            try {
                const response = await fetch('/.netlify/functions/fetch');
                if (response.ok) {
                    const data = await response.json();
                    setEmployeeData(data);
                } else {
                    console.error('Error fetching employee data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching employee data:', error.message);
            }
        };
        fetchData();

    }, []);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Employee ID',
                accessor: 'empId'
            },
            {
                Header: 'First Name',
                accessor: 'firstName'
            },
            {
                Header: 'Last Name',
                accessor: 'lastName',
            },
            {
                Header: 'Department',
                accessor: 'department',
            },
            {
                Header: 'Position',
                accessor: 'position',
            },
            {
                Header: 'Salary',
                accessor: 'salary',
            },
            {
                Header: 'Gender',
                accessor: 'gender',
            },
            {
                Header: 'Age',
                accessor: 'age',
            },
            {
                Header: 'Email',
                accessor: 'email',
            }
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        nextPage,
        previousPage,
        pageOptions,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data: employeeData,
            initialState: { pageIndex: 0, pageSize: 5, sortBy: [{ id: 'empId', desc: false }] },
        },
        useSortBy,
        usePagination
    );

    return (
        <div className="employee-list-page">
            <h1 className={theme === "dark" ? "h1-dark" : null}>Employee List</h1>
            <table {...getTableProps()} className="employee-table">
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td className={tdClass} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    Previous
                </button>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default EmployeeList;