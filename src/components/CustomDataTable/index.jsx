import React from 'react'
import DataTable from 'react-data-table-component'
import { TailSpin } from 'react-loader-spinner'

const CustomDataTable = ({ loading, columns, data, ExpandedComponent, paginationTotalRows, currentPage, totalPages, onChangeRowsPerPage, paginationPerPage, onChangePage }) => {
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
            minHeight: '45px',
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

   const EmptyTableMessage = () => (
      loading ? (
         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
            <TailSpin
               visible={true}
               height="20"
               width="20"
               color="var(--user-color)"
               ariaLabel="tail-spin-loading"
               radius="1"
               wrapperStyle={{}}
               wrapperClass=""
            />
         </div>) : (
         <div style={{ textAlign: 'center', padding: '20px' }}>
            Aucune donnée disponible pour le moment.
         </div>
      )
   )

   const baseHeight = 200
   const threshold = 10
   const calculatedHeight = Math.max(baseHeight, data.length * 50)

   const paginationOption = () => {
      custom: () => {
         const rowsPerPageSelector = document.querySelector('.rdt_TableRowPerPage')
         if (rowsPerPageSelector) {
            rowsPerPageSelector.style.height = `${Math.max(baseHeight, data.length * 50)}px`
         }
      }
   }

   return (
      <>
         <DataTable
            className="CustomerData"
            columns={columns}
            data={data}
            // selectableRows
            responsive
            striped
            highlightOnHover
            customStyles={customStyles}
            expandableRowsComponent={ExpandedComponent}
            noDataComponent={<EmptyTableMessage />}
            // paginationComponentOptions={paginationOption}
            // progressPending={true}
            // progressComponent={<TailSpin
            //    visible={true}
            //    height="20"
            //    width="20"
            //    color="var(--user-color)"
            //    ariaLabel="tail-spin-loading"
            //    radius="3"
            //    wrapperStyle={{}}
            //    wrapperClass=""
            // />}

            pagination
            paginationServer
            paginationTotalRows={paginationTotalRows}
            paginationPerPage={paginationPerPage}
            currentPage={currentPage}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            totalPages={totalPages}
            paginationRowsPerPageOptions={[10, 15, 20, 30]}
         />
         {loading && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               <TailSpin
                  visible={true}
                  height="20"
                  width="20"
                  color="var(--user-color)"
                  ariaLabel="tail-spin-loading"
                  radius="3"
                  wrapperStyle={{}}
                  wrapperClass=""
               />
            </div>
         )}
      </>

   )
}

export default CustomDataTable