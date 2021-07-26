import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import Portal from './Portal';

const TooltipTrigger = (props) => {
    const [tooltipActive, setTooltipActive] = useState(false);
    const [position, setPosition] = useState({});

    const offset = 15;

    const handleMouseEnter = (e) => {
        console.log(e);
        setPosition({
            top: e.clientY - offset,
            left: e.clientX + offset
        });
        setTooltipActive(true);
    };

    const handleMouseLeave = () => setTooltipActive(false);
    const handleMouseMove = (e) => setPosition({ top: e.clientY - offset, left: e.clientX + offset });

    return (
        <>
            <span
                className="tooltip__trigger"
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {props.children}
            </span>
            {tooltipActive && (
                <Portal id="root__overlay">
                    <div className="tooltip tooltip--code" style={{ ...position, width: props.width }}>
                        <SyntaxHighlighter language="javascript" style={tomorrow}>
                            {props.content}
                        </SyntaxHighlighter>
                    </div>
                </Portal>
            )}
        </>
    );
};

export default TooltipTrigger;
