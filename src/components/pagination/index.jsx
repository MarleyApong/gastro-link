import React from 'react'
import * as RemixIcons from "react-icons/ri"
import ReactPaginate from 'react-paginate'
import './pagination.scss'

const Pagination = ({pageable}) => {
    const handlePageClick = (data) => {
        // setRefresh((current) => current + 1)
        // setCurrentPage(data.selected)
      }

    return (
        <div className="Pagination">
            <div className="Show">
                {/* <label htmlFor="">Affichage</label>
                <select name="" id="">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select> */}
            </div>
            <div className="Vh">
                <span>Page {pageable.number ? pageable.number + 1 : 1} / {pageable.totalPages ? pageable.totalPages : 1}</span>
                <ReactPaginate
                    previousLabel={<RemixIcons.RiArrowDropLeftFill size={44} />}
                    nextLabel={<RemixIcons.RiArrowDropRightFill size={44} />}
                    breakLabel={"..."}
                    pageCount={pageable.totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination-content"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                />
                <span>Resultat: 5 / 5</span>
            </div>
        </div>
    )
}

export default Pagination