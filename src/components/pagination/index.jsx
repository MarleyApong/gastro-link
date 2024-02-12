import React from 'react'
import * as RemixIcons from "react-icons/ri"
import ReactPaginate from 'react-paginate'
import './pagination.scss'

const Pagination = ({ pageable }) => {
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
                {
                    pageable.page && (
                        <>
                            <span>Pg {pageable.page ? pageable.page : 1} / {pageable.totalPages ? pageable.totalPages : 1}</span>
                            <ReactPaginate
                                previousLabel={<RemixIcons.RiArrowDropLeftFill size={44} />}
                                nextLabel={<RemixIcons.RiArrowDropRightFill size={44} />}
                                breakLabel={"..."}
                                pageCount={pageable.totalPages}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={3}
                                onPageChange={handlePageClick}
                                containerClassName={"pagination-container"}
                                pageClassName={"page-items"}
                                pageLinkClassName={"page-links"}
                                previousClassName={"page-items"}
                                previousLinkClassName={"page-links"}
                                nextClassName={"page-items"}
                                nextLinkClassName={"page-links"}
                                breakClassName={"page-items"}
                                breakLinkClassName={"page-links"}
                                activeClassName={"active"}
                            />
                            <span>total: {pageable.currentElements} / {pageable.totalElements}</span>
                        </>
                    )
                }

            </div>
        </div>
    )
}

export default Pagination