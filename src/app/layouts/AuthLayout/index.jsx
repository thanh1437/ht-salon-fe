import React from 'react';
import { Card, CardContent } from '@mui/material';
import classNames from 'classnames/bind';
import styles from './Auth.module.scss';

const cx = classNames.bind(styles);

export default function Auth({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Card sx={{ width: '440px' }}>
                <CardContent>{children}</CardContent>
            </Card>
        </div>
    );
}
