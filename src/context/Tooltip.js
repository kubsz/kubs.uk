import { createContext } from 'react';
import useTooltip from '../hooks/useTooltip';
import Tooltip from '../components/Tooltip';

let TooltipContext;
let { Provider } = (TooltipContext = createContext());

let TooltipProvider = (props) => {
    let { tooltip, handleTooltip, tooltipContent } = useTooltip();
    return (
        <Provider value={{ tooltip, handleTooltip, tooltipContent }}>
            <Tooltip />
            {props.children}
        </Provider>
    );
};

export { TooltipContext, TooltipProvider };
