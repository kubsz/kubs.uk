const Badge = ({ style, children }) => {
    return (
        <span className="badge" style={style || {}}>
            {children}
        </span>
    );
};

export default Badge;
