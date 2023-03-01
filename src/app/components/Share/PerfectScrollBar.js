import React from 'react';
import Scrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

export default function PerfectScrollBar({ children, options }) {
    return (
        <Scrollbar style={{ height: '93%' }} options={options}>
            {children}
        </Scrollbar>
    );
}
