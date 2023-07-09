import React, { useState } from 'react';
import Overview from './Overview';
import DetailList from './DetailList';
import { init } from './Service'

import './index.css';

// @ts-check


export default function () {
    const [datas, setDatas] = useState([]);
    init().then(v => setDatas(v));
    return (
        <>
            <Overview datas={datas} />
            <DetailList datas={datas} />
        </>
    )
}