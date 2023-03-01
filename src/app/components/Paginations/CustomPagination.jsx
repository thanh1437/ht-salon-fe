import React, { useState } from 'react';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
function CustomPagination(props) {
    const { page, pageSize, count, updatePageData } = props;

    let [pageIndex, setPageIndex] = useState(page);
    let [numOfPage, setNumOfPage] = useState(5);
    let [isMaxPage, setIsMaxPage] = useState(false);
    let [isCustomPage, setIsCustomPage] = useState(false);

    const handleChangePage = (source) => {
        let maxPage =
            count % pageSize != 0 ? count / pageSize : count / pageSize + 1;
        if (source >= 0 && source < numOfPage) {
            setPageIndex(source);
            if (source == 0) {
                setIsCustomPage(false);
                setIsMaxPage(false);
                setNumOfPage(5);
            }

            if (source >= 4 && source < maxPage) {
                setNumOfPage(source + 3);
                setIsMaxPage(true);
                setIsCustomPage(false);
            }
            if (source >= 6 && source < maxPage) {
                setIsCustomPage(true);
                if (source == Math.floor(maxPage)) {
                    setIsMaxPage(false);
                }
            }
        }
        updatePageData(source, pageSize);
    };

    const html = (pageIndex, index) => {
        return (
            <button
                className={
                    'table-pagination__action d-flex-center ' +
                    (pageIndex === index ? '--active' : '')
                }
                onClick={() => handleChangePage(index)}
            >
                {index + 1}
            </button>
        );
    };

    const renderPage = () => {
        let element = [];
        let moreButton = (
            <button className="table-pagination__action d-flex-center">
                ...
            </button>
        );
        for (let i = 0; i < numOfPage; i++) {
            if (isCustomPage) {
                if (i < 2) {
                    element.push(html);
                }
                if (i > pageIndex - 3 && i < pageIndex + 4) {
                    element.push(html);
                }
            } else {
                element.push(html);
            }
        }
        if (isMaxPage) {
            element.push(moreButton);
        }
        if (isCustomPage) {
            element.splice(2, 0, moreButton);
        }
        return element;
    };

    return (
        <div className="table-pagination mt-4 d-flex">
            <button
                className={
                    'table-pagination__action d-flex-center ' +
                    (pageIndex == 0 ? '--disabled' : '')
                }
                onClick={() => handleChangePage((pageIndex -= 1))}
            >
                <KeyboardArrowLeft />
            </button>
            <div className="table-pagination__list mx-3 d-flex-center">
                {renderPage()}
            </div>
            <button
                className={
                    'table-pagination__action d-flex-center ' +
                    (pageIndex == numOfPage - 1 ? '--disabled' : '')
                }
                onClick={() => handleChangePage((pageIndex += 1))}
            >
                <KeyboardArrowRight />
            </button>
        </div>
    );
}

export default CustomPagination;
