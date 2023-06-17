import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import './index.css'

export default function () {
    return (
        <Layout description='新时代极简服务器面板，内置多种常用功能，超适合萌新和老手服主；支持C#/JS混合开发插件，有着最丰富的API，插件生态超完善！'>
            <div id='index-page-container'>
                <div id='index-page-bg'></div>
                <div id='index-page-bg-mask'></div>
                <div id='index-page-main'>
                    <div id='logo'>
                        <span>Serein</span>
                    </div>
                    <div id='index-page-description'>
                        新时代极简服务器面板
                    </div>
                    <div id='index-page-button-container'>
                        <div id='index-page-button'>
                            <Link
                                className="button button--secondary button--lg"
                                to="/docs">
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