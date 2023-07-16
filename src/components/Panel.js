import React from 'react';
import Link from '@docusaurus/Link';

import './Panel.css';

export default function () {
    return (<>
        <div id='panel-main-container'>
            <div>
                <div>
                    <Link
                        className="button button--secondary button--lg"
                        to="/resources">
                        🛒查看所有资源
                    </Link>
                </div>

                <div>
                    <Link
                        className="button button--secondary button--lg"
                        to="/resources/tags">
                        🏷按标签查找
                    </Link>
                </div>
            </div>

            <div>
                <div>
                    <Link
                        className="button button--secondary button--lg"
                        to="/resources/archive">
                        ⌚按时间查找
                    </Link>
                </div>

                <div>
                    <Link
                        className="button button--secondary button--lg"
                        to="/publish">
                        💡发布自己的作品
                    </Link>
                </div>
            </div>
        </div>
    </>)
}