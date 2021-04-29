import './index.scss'
import React from 'react';
import PropTypes from 'prop-types';

Pagination.propTypes = {
    pagination: PropTypes.object.isRequired,
    onPageChange: PropTypes.func
};
Pagination.defaultProps = {
    onPageChange: null
};
function Pagination(props) {
    const { pagination, onPageChange } = props;
    const { _page, _limit, _totalItems } = pagination;

    const totalPage = Math.ceil(_totalItems / _limit);

    const handlePageChange = (newPage) => {
        console.log(newPage)
        if (onPageChange) {
            onPageChange(newPage)
        }
    }
    console.log(pagination)
    return (
        <div className="pagination-shopbasic">
            <button
                disabled={_page <= 1 && true}
                onClick={() => handlePageChange(_page - 1)}
            >Prev</button>
            <button
                disabled={_page >= totalPage && true}
                onClick={() => handlePageChange(_page + 1)}
            >Next</button>
        </div>
    );
}

export default Pagination;