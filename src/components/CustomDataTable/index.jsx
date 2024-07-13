import React from 'react'
import DataTable from 'react-data-table-component'
import { TailSpin } from 'react-loader-spinner'

const CustomDataTable = ({ loading, columns, data, ExpandedComponent, paginationTotalRows, currentPage, totalPages, onChangeRowsPerPage, paginationPerPage, onChangePage }) => {
   const customStyles = {
      headRow: {
         style: {
            backgroundColor: 'var(--bg-modal-head)',
            fontWeight: 'bold',
            color: "var(--color-modal-head)",
            boxShadow: 'var(--shadow-1)',
            borderTopLeftRadius: 'var(--radius-2)',
            borderTopRightRadius: 'var(--radius-2)'
         },
      },
      rows: {
         style: {
            backgroundColor: 'var(--bg-modal-head)',
            color: "var(--color-modal-head)",
            minHeight: '42px',
            boxShadow: 'var(--shadow-1)'
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
      // pagination: {
      //    style: {
      //       backgroundColor: 'var(--bg-modal-head)',
      //       color: "var(--color-modal-head)",
      //    },
      // },
      // button: {
      //    style: {
      //       backgroundColor: 'var(--color-modal-head) !important',
      //       color: "var(--bg-modal-head) !important",
      //    },
      // },
   }

   const EmptyTableMessage = () => (
      loading ? (
         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', width: '100%', background: 'var(--bg-modal-head) !important', color: 'var(--color-modal-head) !important' }}>
            <TailSpin
               height="20"
               width="20"
               color="var(--color-scroll)"
               ariaLabel="tail-spin-loading"
               radius="5"
               wrapperStyle={{}}
               wrapperClass=""
            />
         </div>) : (
         <div style={{ textAlign: 'center', padding: '20px', width: '100%', background: 'var(--bg-modal-head) !important', color: 'var(--color-modal-head) !important' }}>
            Aucune donnée disponible pour le moment.
         </div>
      )
   )

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
            paginationComponentOptions={{
               rowsPerPageText: 'total par page:',
               rangeSeparatorText: 'sur',
               noRowsPerPage: false,
            }}
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
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--bg-modal-head) !important', color: 'var(--color-modal-head) !important' }}>
               <TailSpin
                  height="20"
                  width="20"
                  color="var(--color-scroll)"
                  ariaLabel="tail-spin-loading"
                  radius="5"
                  wrapperStyle={{}}
                  wrapperClass=""
               />
            </div>
         )}
      </>

   )
}

export default CustomDataTable