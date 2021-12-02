const Spinner = ({ active, modifiers = [] }) => {
    return <div className={['spinner', ...modifiers.map((x) => `spinner--${x}`)].join(' ')}></div>;
};

export default Spinner;
