import '../scss/main.scss';

import { TooltipProvider } from '../context/Tooltip';

const App = ({ Component, pageProps }) => {
    return (
        <TooltipProvider>
            <Component {...pageProps} />
        </TooltipProvider>
    );
};

export default App;
