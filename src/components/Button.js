import Link from 'next/link';

const Button = ({ children, href, className }) => {
    return (
        <Link href={href}>
            <a className={`btn${className ? ` ${className}` : ''}`}>{children}</a>
        </Link>
    );
};

export default Button;
