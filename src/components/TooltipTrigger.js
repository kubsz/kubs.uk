import { useContext, useRef } from 'react';
import { TooltipContext } from '../context/Tooltip';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const TooltipTrigger = (props) => {
    const { handleTooltip } = useContext(TooltipContext);

    const triggerRef = useRef(null);

    const handleMouseEnter = (e) => {
        handleTooltip(
            <SyntaxHighlighter language="javascript" style={tomorrow}>
                {props.content}
            </SyntaxHighlighter>,
            triggerRef.current,
            props.width || '20rem',
            'code'
        );
    };

    const handleMouseLeave = () => {
        handleTooltip(null);
    };

    return (
        <span ref={triggerRef} className="tooltip__trigger" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {'{'}
            {props.children}
            {'}'}
        </span>
    );
};

export default TooltipTrigger;
