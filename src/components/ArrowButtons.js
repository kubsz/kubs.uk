import { MdChevronRight, MdChevronLeft } from 'react-icons/md';

const ArrowButtons = ({ pages, currentPage, handlePageChange }) => {
    return (
        <div className="heading-buttons">
            <button
                className={`heading-buttons__button${currentPage - 1 > 0 ? '' : ' heading-buttons__button--inactive'}`}
                onClick={() => currentPage - 1 > 0 && handlePageChange(currentPage - 1)}
            >
                <MdChevronLeft />
            </button>
            <button
                className={`heading-buttons__button${currentPage + 1 <= pages ? '' : ' heading-buttons__button--inactive'}`}
                onClick={() => currentPage + 1 <= pages && handlePageChange(currentPage + 1)}
            >
                <MdChevronRight />
            </button>
        </div>
    );
};

export default ArrowButtons;
