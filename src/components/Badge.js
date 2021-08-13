const Badge = ({ style, children }) => {
    return (
        <span className="badge" style={style || {}}>
            {children}
        </span>
    );
};

Badge.defaultProps = {
    color: 'default'
};

export default Badge;
