import { useState, useContext, useEffect } from 'react';

import { TooltipContext } from '../context/Tooltip';

import { createPortal } from 'react-dom';

const Tooltip = () => {
    const [tooltipMounted, setTooltipMounted] = useState(false);
    const [classes, setClasses] = useState(null);

    let { tooltipContent, tooltip } = useContext(TooltipContext);

    useEffect(() => {
        if (!tooltip && tooltipMounted) {
            setClasses('tooltip--exit');
            setTimeout(() => {
                setTooltipMounted(false);
            }, 300);
            return;
        } else {
            if (!tooltipMounted && tooltip) {
                setTooltipMounted(true);
                setClasses(null);
            }
        }
    }, [tooltip]);

    if (tooltipMounted) {
        const rect = tooltipContent.node.getBoundingClientRect();

        return createPortal(
            <div
                style={{ left: rect.left, top: rect.top - 15, width: tooltipContent.width }}
                className={`tooltip${tooltipContent.type ? ` tooltip--${tooltipContent.type}` : ''}${classes ? ` ${classes}` : ''}`}
            >
                {tooltipContent.content}
            </div>,
            document.querySelector('.root__overlay')
        );
    } else return null;
};

export default Tooltip;
