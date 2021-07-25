import { useState } from 'react';

const useTooltip = () => {
    let [tooltip, setTooltip] = useState(false);
    let [tooltipContent, setTooltipContent] = useState({});

    let handleTooltip = (content = false, node, width = '20rem', type = null) => {
        setTooltip(!tooltip);
        if (content) {
            setTooltipContent({
                content,
                node,
                width,
                type
            });
        }
    };

    return { tooltip, handleTooltip, tooltipContent };
};

export default useTooltip;
