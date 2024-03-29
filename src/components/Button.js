import Link from 'next/link';

const Button = ({ children, href, className, external = false }) => {
    return external ? (
        <a href={href} target="_blank" rel="noreferrer noopener" className={`btn${className ? ` ${className}` : ''}`}>
            {children}
        </a>
    ) : (
        <Link href={href} className={`btn${className ? ` ${className}` : ''}`}>
            {children}
        </Link>
    );
};

export default Button;
