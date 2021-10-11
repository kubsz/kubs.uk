import { useState } from 'react';

import Link from 'next/link';
import ArrowButtons from '../components/ArrowButtons';

import Badge from '../components/Badge';
import Layout from '../components/Layout';
import MusicNotes from '../components/MusicNotes';
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
    const top_tracks = [
        {
            name: 'Guilty Conscience',
            artist: '070 Shake',
            image: 'https://i.scdn.co/image/ab67616d0000b273a309d9cbb0048a43ab5289a4'
        },
        {
            name: 'Sky',
            artist: 'Playboi Carti',
            image: 'https://upload.wikimedia.org/wikipedia/en/6/6c/Playboi_Carti_-_Whole_Lotta_Red.png'
        },
        {
            name: 'High School Reunion, Prom',
            artist: 'SAINt JHN, Lil Uzi Vert',
            image: 'https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/fnlakp8fweodepdpzizu/saint-jhn-album'
        },
        {
            name: 'Addicted',
            artist: 'Jorja Smith',
            image: 'https://lite-images-i.scdn.co/image/ab67616d00001e0278378dcaccec9e965e0d6351'
        },
        {
            name: 'Violent Crimes',
            artist: 'Kanye West',
            image: 'https://pyxis.nymag.com/v1/imgs/699/1e2/965287137d49b3f29e6ff9c4d0e5a3f07b-01-kanye-west-ye.rsquare.w1200.jpg'
        },
        {
            name: 'Lucid Dreams',
            artist: 'Juice wrld',
            image: 'https://upload.wikimedia.org/wikipedia/en/8/86/Goodbye_%26_Good_Riddance_Album_Cover.jpg'
        }
    ];

    const handlePageChange = (newPage) => {
        setTopTrackPage(newPage);
    };

    return (
        <Layout noGaps>
            <Section noPadding className="pg-listening__header">
                <div className="pg-listening__header-image-container">
                    <img className="pg-listening__header-image" src="https://i.scdn.co/image/ab67616d00001e02bd6587e9a32c161be8c71100" />
                </div>
                <div className="pg-listening__header-main">
                    <Badge modifiers={['light', 'shadow']}>Most Popular of the Week</Badge>
                    <h1 className="pg-listening__header-title">Fair Trade</h1>
                    <h4 className="pg-listening__header-subtitle">Drake ft. Travis Scott</h4>
                    <PlayButton />
                </div>
            </Section>
            <Section theme="light" className="pg-listening__body" shadow>
                {/* <MusicNotes /> */}
                <div className="pg-listening__body-section">
                    <div className="heading-container">
                        <h3 className="heading-secondary">Weekly Top Tracks</h3>
                        <ArrowButtons pages={3} currentPage={topTrackPage} handlePageChange={handlePageChange} />
                    </div>
                    <div className="pg-listening__horizontal-row-outer-container">
                        <div
                            className="pg-listening__horizontal-row-container"
                            style={{ width: '300%', marginLeft: `-${topTrackPage - 1}00%` }}
                        >
                            <ul className="pg-listening__horizontal-row pg-listening__horizontal-row--6">
                                {top_tracks.map((track) => (
                                    <li className="song-card" key={track.name}>
                                        <div className="song-card__image-container">
                                            <img className="song-card__image" src={track.image} />
                                        </div>
                                        <div className="song-card__main">
                                            <h5 className="song-card__name">{track.name}</h5>
                                            <p className="song-card__artists">{track.artist}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <ul className="pg-listening__horizontal-row pg-listening__horizontal-row--6">
                                {top_tracks.map((track) => (
                                    <li className="song-card" key={track.name}>
                                        <div className="song-card__image-container">
                                            <img className="song-card__image" src={track.image} />
                                        </div>
                                        <div className="song-card__main">
                                            <h5 className="song-card__name">{track.name}</h5>
                                            <p className="song-card__artists">{track.artist}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <ul className="pg-listening__horizontal-row pg-listening__horizontal-row--6">
                                {top_tracks.map((track) => (
                                    <li className="song-card" key={track.name}>
                                        <div className="song-card__image-container">
                                            <img className="song-card__image" src={track.image} />
                                        </div>
                                        <div className="song-card__main">
                                            <h5 className="song-card__name">{track.name}</h5>
                                            <p className="song-card__artists">{track.artist}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
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
