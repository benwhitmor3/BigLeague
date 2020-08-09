import React, {useEffect, useMemo, useState} from 'react'
import { useTable, useFilters, useSortBy } from 'react-table'
// A great library for fuzzy filtering/sorting items
import matchSorter from 'match-sorter'
import './Table.css';
import axios from "axios";

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
  <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search from ${count} records`}
              style={{
          width: '100%',
        }}
    />
  )
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
function NumberRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    preFilteredRows.forEach(row => {
      min = Math.min(row.values[id], min)
      max = Math.max(row.values[id], max)
    })
    return [min, max]
  }, [id, preFilteredRows])

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <input
        value={filterValue[0] || ''}
        type="number"
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
        }}
        placeholder={`Min (${min.toFixed(2)})`}
        style={{
          width: '100%',
          marginRight: '0.5rem',
          marginLeft: '0.5rem',
        }}
      />
      to
      <input
        value={filterValue[1] || ''}
        type="number"
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
        }}
        placeholder={`Max (${max.toFixed(2)})`}
        style={{
          width: '100%',
          marginRight: '0.5rem',
          marginLeft: '0.5rem',
        }}
      />
    </div>
  )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val;


// Our table component
function Table({ columns, data}) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useFilters, // useFilters!
    useSortBy,
  );

  return (
    <>
        <h2>Players Table</h2>
      <table {...getTableProps()} >
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' ↓'
                        : ' ↑'
                      : ' '}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>

      </table>
    </>
  )
}

function PlayersTable() {


    const draftPlayer = (player) => {
    console.log({
            player
        });
          axios.put('http://127.0.0.1:8000/api/players/' + player.name + '/',
        {
            name: player.name,
            suit: player.suit,
            age: player.age,
            pv: player.pv,
            epv: player.epv,
            s_epv: player.s_epv,
            franchise: "franchise",
        }
    )
            .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
    })
};

    const columns = useMemo(

    () => [
      {
        Header: 'Name',
        accessor: 'name', // accessor is the "key" in the data
        filter: fuzzyTextFilterFn()
      },
      {
        Header: 'Suit',
        accessor: 'suit', // accessor is the "key" in the data
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'Age',
        accessor: 'age', // accessor is the "key" in the data
        Filter: NumberRangeColumnFilter,
        filter: 'between',
      },
      {
        Header: 'EPV',
        accessor: 'epv', // accessor is the "key" in the data
        Filter: NumberRangeColumnFilter,
        filter: 'between',
        Cell: props => (props.value).toFixed(2),
      },
        {
        Header: 'Franchise',
        accessor: 'franchise', // accessor is the "key" in the data
      },
      {
     Header: 'Draft Player',
     Cell: row => (
         <div>
         <button onClick={() => draftPlayer(row.row.original)}>Draft</button>
         </div>
     ),
    },
    ],
    [],
  );


  const [data, setData] = useState([]);

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
      const result = await axios("http://127.0.0.1:8000/api/players/");
      setData(result.data);
    })();
  }, [draftPlayer]);

  return (
    <div className="Table">
      <Table columns={columns} data={data} />
    </div>
  )
}

export default PlayersTable
