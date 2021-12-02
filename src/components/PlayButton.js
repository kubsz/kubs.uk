import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';

const PlayButton = ({ paused }) => {
    return <button className="play-button">{paused ? <BsFillPlayFill size="3rem" /> : <BsFillPauseFill size="3rem" />}</button>;
};

export default PlayButton;
