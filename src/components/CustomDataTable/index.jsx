import React from 'react'
// import 'customDataTable.scss'
import DataTable from 'react-data-table-component'

const CustomDataTable = ({ columns, data, ExpandedComponent }) => {
   const customStyles = {
      headRow: {
         style: {
            // backgroundColor: 'var(--color-modal-head)',
            fontWeight: 'bold',
            color: "var(--color-3)",
         },
      },
      rows: {
         style: {
            height: '0px',
         },
      },
      headCells: {
         style: {
            paddingLeft: '25px',
         },
      },
      cells: {
         style: {
            paddingLeft: '25px',
         },
      },
   }

   return (
      <DataTable
         className="CustomerData"
         columns={columns}
         data={data}
         // selectableRows
         responsive
         pagination
         striped
         highlightOnHover
         customStyles={customStyles}
         expandableRowsComponent={ExpandedComponent}
      />
   )
}

export default CustomDataTable