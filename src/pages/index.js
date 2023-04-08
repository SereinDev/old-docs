import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import './index.css'

export default function () {
    return (
        <Layout>
            <div id='index-page-container'>
                <div id='index-page-bg'></div>
                <div id='index-page-bg-mask'></div>
                <div id='index-page-main'>
                    <div id='logo'>
                        <img src='/img/Serein.png'></img>
                        <span>Serein</span>
                    </div>
                    <div id='index-page-description'>
                        新时代极简服务器面板
                    </div>
                    <div id='index-page-button-container'>
                        <div id='index-page-button'>
                            <Link
                                className="button button--secondary button--lg"
                                to="/docs/intro">
                                查看文档
                            </Link>
                        </div>
                        <div id='index-page-button'>
                            <Link
                                className="button button--secondary button--lg"
                                href="https://github.com/Zaitonn/Serein/releases/latest">
                                下载
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}