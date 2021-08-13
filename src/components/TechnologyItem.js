import { useState } from 'react';

const TechnologyItem = ({ data }) => {
    const [hover, setHover] = useState(false);

    const styles = {
        initial: {
            backgroundColor: `${data.color}33`,
            border: `1px solid ${data.color}3d`,
            color: data.color
        },
        hover: {
            backgroundColor: `${data.color}`,
            border: `1px solid ${data.color}3d`,
            color: '#fff'
        }
    };

    return (
        <li key={data.name}>
            <a
                className="technology"
                style={hover ? styles.hover : styles.initial}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                href={data.link}
                target="_blank"
                rel="noreferrer"
            >
                {data.image}
                <span>{data.name}</span>
            </a>
        </li>
    );
};

export default TechnologyItem;
