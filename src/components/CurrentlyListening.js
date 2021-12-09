import PlayButton from '../components/PlayButton';

import { convertTime } from '../lib/utils';
import Badge from './Badge';

const CurrentlyListening = ({ data, progress }) => {
    return (
        <>
            <div className="pg-listening__header-image-container">
                <img className="pg-listening__header-image" src={data.item.album.images[0].url} />
            </div>
            <div className="pg-listening__header-main">
                <Badge modifiers={['light', 'shadow']}>Currently Playing</Badge>
                <h1 className="pg-listening__header-title">{data.item.name}</h1>
                <h4 className="pg-listening__header-subtitle">{data.item.artists.map((x) => x.name).join(', ')}</h4>
                <div className="pg-listening__header-footer">
                    <PlayButton paused={data.is_playing === false} />
                    <div className="pg-listening__header-timeline-container">
                        <span className="pg-listening__header-timeline-time">{convertTime(progress)}</span>
                        <div className="pg-listening__header-timeline">
                            <div
                                className="pg-listening__header-timeline-inner"
                                style={{
                                    width: `${(progress / data.item.duration_ms) * 100}%`
                                }}
                            ></div>
                        </div>
                        <span className="pg-listening__header-timeline-time">{convertTime(data.item.duration_ms)}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CurrentlyListening;
