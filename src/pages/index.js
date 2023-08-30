import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import './index.css'

export default function () {
    return (
        <Layout description='极简但多功能的服务器面板软件.支持热重载JS插件；简单易上手，对萌新服主非常友好'>
            <div id='index-page-container'>
                <div id='index-page-bg'></div>
                <div id='index-page-bg-mask'></div>
                <div id='index-page-main'>
                    <div id='logo'>
                        <span>Serein</span>
                    </div>
                    <div id='index-page-description'>
                        极简但多功能的服务器面板软件
                    </div>
                    <div id='index-page-button-container'>
                        <div id='index-page-button'>
                            <Link
                                className="button button--secondary button--lg"
                                to="/docs/intro">
                                📍介绍
                            </Link>
                        </div>
                        <div id='index-page-button'>
                            <Link
                                className="button button--secondary button--lg"
                                href="https://github.com/Zaitonn/Serein/releases/latest">
                                📦下载
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}