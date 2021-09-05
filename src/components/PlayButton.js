import { BsFillPlayFill } from 'react-icons/bs';

const PlayButton = ({ paused }) => {
    return (
        <button className="play-button">
            <BsFillPlayFill size="3rem" />
        </button>
    );
};

export default PlayButton;
