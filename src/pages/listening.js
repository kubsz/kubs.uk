import { useState } from 'react';

import Link from 'next/link';

import useSWRFetcher from '../hooks/useSWRFetcher';

import ArrowButtons from '../components/ArrowButtons';
import Badge from '../components/Badge';
import Layout from '../components/Layout';
import PlayButton from '../components/PlayButton';
import Section from '../components/Section';

const Listening = () => {
    const [topTrackPage, setTopTrackPage] = useState(1);
    const top_artists = [
        'https://lite-images-i.scdn.co/image/ab67616d00001e02bba7cfaf7c59ff0898acba1f',
        'https://lite-images-i.scdn.co/image/ab67706c0000da846f25572514ee3025326335bc',
        'https://i.scdn.co/image/ab6761610000e5eba4fe9e7039edf6c60113e741',
        'https://i.scdn.co/image/ab6761610000e5eb1908e1a8b79abf71d5598944',
        'https://i.scdn.co/image/ab6761610000e5eb076a7a770365df607fe8047a'
    ];

    const { data: top_tracks } = useSWRFetcher('/api/spotify/top-tracks');
    const { data: currently_playing } = useSWRFetcher('/api/spotify/currently-playing', null, 3000);

    const handlePageChange = (newPage) => {
        setTopTrackPage(newPage);
    };

    if (!top_tracks || !currently_playing) {
        return <h1>loading...</h1>;
    }

    console.log(
        (currently_playing.data.progress_ms / currently_playing.data.item.duration_ms) * 100,
        currently_playing.data.item.duration_ms,
        currently_playing.data.progress_ms
    );

    return (
        <Layout noGaps>
            <Section noPadding className="pg-listening__header">
                <div className="pg-listening__header-image-container">
                    <img className="pg-listening__header-image" src={currently_playing.data.item.album.images[0].url} />
                </div>
                <div className="pg-listening__header-main">
                    <Badge modifiers={['light', 'shadow']}>Currently Playing</Badge>
                    <h1 className="pg-listening__header-title">{currently_playing.data.item.name}</h1>
                    <h4 className="pg-listening__header-subtitle">{currently_playing.data.item.artists.map((x) => x.name).join(', ')}</h4>
                    <div className="pg-listening__header-footer">
                        <PlayButton paused={currently_playing.data.is_playing === false} />
                        <div className="pg-listening__header-timeline-container">
                            <span className="pg-listening__header-timeline-time">
                                {Math.floor(currently_playing.data.progress_ms / 1000 / 60)}:
                                {`${Math.floor((currently_playing.data.progress_ms / 1000) % 60)}`.length === 1
                                    ? `0${Math.floor((currently_playing.data.progress_ms / 1000) % 60)}`
                                    : Math.floor((currently_playing.data.progress_ms / 1000) % 60)}
                            </span>
                            <div className="pg-listening__header-timeline">
                                <div
                                    className="pg-listening__header-timeline-inner"
                                    style={{
                                        width: `${(currently_playing.data.progress_ms / currently_playing.data.item.duration_ms) * 100}%`
                                    }}
                                ></div>
                            </div>
                            <span className="pg-listening__header-timeline-time">
                                {Math.floor(currently_playing.data.item.duration_ms / 1000 / 60)}:
                                {`${Math.floor((currently_playing.data.item.duration_ms / 1000) % 60)}`.length === 1
                                    ? `0${Math.floor((currently_playing.data.item.duration_ms / 1000) % 60)}`
                                    : Math.floor((currently_playing.data.item.duration_ms / 1000) % 60)}
                            </span>
                        </div>
                    </div>
                </div>
                {/* <div className="pg-listening__header-image-container">
                    <img className="pg-listening__header-image" src="https://i.scdn.co/image/ab67616d00001e02bd6587e9a32c161be8c71100" />
                </div>
                <div className="pg-listening__header-main">
                    <Badge modifiers={['light', 'shadow']}>Most Popular of the Week</Badge>
                    <h1 className="pg-listening__header-title">Fair Trade</h1>
                    <h4 className="pg-listening__header-subtitle">Drake ft. Travis Scott</h4>
                    <PlayButton />
                </div> */}
            </Section>
            <Section theme="light" className="pg-listening__body" shadow>
                {/* <MusicNotes /> */}
                <div className="pg-listening__body-section">
                    <div className="heading-container">
                        <h3 className="heading-secondary">Monthly Top Tracks</h3>
                        <ArrowButtons pages={3} currentPage={topTrackPage} handlePageChange={handlePageChange} />
                    </div>
                    <div className="pg-listening__horizontal-row-outer-container">
                        <div
                            className="pg-listening__horizontal-row-container"
                            style={{ width: '300%', marginLeft: `-${topTrackPage - 1}00%` }}
                        >
                            {[0, 1, 2].map((_, i) => (
                                <ul key={_} className="pg-listening__horizontal-row pg-listening__horizontal-row--6">
                                    {[...top_tracks.data.items].slice(i * 6, (i + 1) * 6).map((track) => (
                                        <li className="song-card" key={track.id}>
                                            <div className="song-card__image-container">
                                                <img className="song-card__image" src={track.album.images[0].url} />
                                            </div>
                                            <div className="song-card__main">
                                                <h5 className="song-card__name">{track.name}</h5>
                                                <p className="song-card__artists">{track.artists.map((x) => x.name).join(', ')}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="pg-listening__body-section pg-listening__body-section--split">
                    <div className="pg-listening__body-column">
                        <div className="pg-listening__body-section">
                            <h3 className="heading-secondary">Recently Played Songs</h3>
                            <ul className="pg-listening__song-list">
                                <li className="song-row">
                                    <span className="song-row__date">2m</span>
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/en/3/37/Be_Honest_single_cover.jpg"
                                        alt="Song image"
                                        className="song-row__image"
                                    />
                                    <div className="song-row__main">
                                        <h4 className="song-row__title">Be Honest</h4>
                                        <p className="song-row__artists">Jorja Smith (feat. Burna Boy)</p>
                                    </div>
                                    <div className="song-row__time">5:32</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="pg-listening__body-column">
                        <div className="pg-listening__body-section">
                            <div className="heading-container">
                                <h3 className="heading-secondary">Monthly Top Artists</h3>
                                <Link href="/">
                                    <a className="heading-see-all">See All</a>
                                </Link>
                            </div>
                            <ul className="pg-listening__horizontal-row pg-listening__horizontal-row--5">
                                {top_artists.map((artist) => (
                                    <li className="song-card song-card--rounded" key={artist}>
                                        <div className="song-card__image-container">
                                            <img className="song-card__image" src={artist} />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="pg-listening__body-section">
                            <h3 className="heading-secondary">My Top Genres</h3>
                        </div>
                    </div>
                </div>
            </Section>
        </Layout>
    );
};

export default Listening;
