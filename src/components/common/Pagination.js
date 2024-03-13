function Pagination({ curPage, totalPage, startPage, endPage, onPageChange }) {
    const pageChange = (page) => {
        onPageChange(page);
    };

    const prevHandler = () => {
        if (startPage > 1) {
            onPageChange(startPage - 1);
        }
    };

    const nextHandler = () => {
        if (endPage < totalPage) {
            onPageChange(endPage + 1);
        }
    };

    let row = [];
    if (startPage > 1) {
        row.push(<li key="prev" className="page-item"><button className="page-link" onClick={prevHandler}>&laquo;</button></li>);
    }
    for (let i = startPage; i <= endPage; i++) {
        if (curPage === i) {
            row.push(<li key={i} className="page-item active"><button className="page-link" onClick={() => pageChange(i)}>{i}</button></li>);
        } else {
            row.push(<li key={i} className="page-item"><button className="page-link" onClick={() => pageChange(i)}>{i}</button></li>);
        }
    }
    if (endPage < totalPage) {
        row.push(<li key="next" className="page-item"><button className="page-link" onClick={nextHandler}>&raquo;</button></li>);
    }

    return (

        <nav aria-label="Page navigation"   className={"text-center"}>
            <ul className="pagination justify-content-center">
                {row}
            </ul>
        </nav>
    );
}

export default Pagination;
