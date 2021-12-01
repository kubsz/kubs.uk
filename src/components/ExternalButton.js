const ExternalButton = ({ children, href, className }) => {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={`btn${className ? ` ${className}` : ''}`}>
            {children}
        </a>
    );
};

export default ExternalButton;
