import Link from 'next/link';

const SmartLink = ({ href, children }) => {
    return href[0] === '/' ? (
        <Link href={href}>
            <a>{children}</a>
        </Link>
    ) : (
        <a href={href}>{children}</a>
    );
};

export default SmartLink;
