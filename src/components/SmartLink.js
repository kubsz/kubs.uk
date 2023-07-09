import Link from 'next/link';

const SmartLink = ({ href, children }) => {
    return href[0] === '/' ? <Link href={href}>{children}</Link> : <a href={href}>{children}</a>;
};

export default SmartLink;
