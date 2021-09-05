const Badge = ({ style, children, modifiers }) => {
    return (
        <span
            className={`${['badge', ...(modifiers?.length ? [...modifiers] : []).filter((x) => x).map((c) => `badge--${c}`)].join(' ')}`}
            style={style || {}}
        >
            {children}
        </span>
    );
};

export default Badge;
