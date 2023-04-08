import React from 'react';
import Giscus from "@giscus/react";
import { useColorMode } from '@docusaurus/theme-common';

export default function GiscusComponent() {
    const { colorMode } = useColorMode();

    return (
        <Giscus
            repo="Zaitonn/Serein-Docs"
            repoId="R_kgDOI5X-eA"
            category="General"
            categoryId="DIC_kwDOI5X-eM4CVoEc"
            term="快来抢沙发！"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="1"
            inputPosition="top"
            theme={colorMode}
            lang="zh-CN"
            loading="lazy"
            crossorigin="anonymous"
            async
        />
    );
}