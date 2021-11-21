import { useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import useSWRFetcher from '../hooks/useSWRFetcher';

import ArrowButtons from '../components/ArrowButtons';
import Badge from '../components/Badge';
import Layout from '../components/Layout';
import PlayButton from '../components/PlayButton';
import Section from '../components/Section';

import { formatDistance } from 'date-fns';
import Spinner from '../components/Spinner';

import { FaPlay } from 'react-icons/fa';

const Listening = () => {
    const [topTrackPage, setTopTrackPage] = useState(1);

    const { data: top_tracks } = useSWRFetcher('/api/spotify/top-tracks');
    const { data: top_artists } = useSWRFetcher('/api/spotify/top-artists');
    const { data: currently_playing } = useSWRFetcher('/api/spotify/currently-playing', null, 3000);
    const { data: recently_played } = useSWRFetcher('/api/spotify/recently-played', null, 3000);

    const handlePageChange = (newPage) => {
        setTopTrackPage(newPage);
    };

    const convertTime = (time) => {
        return `${Math.floor(time / 1000 / 60)}:${
            `${Math.floor((time / 1000) % 60)}`.length === 1 ? `0${Math.floor((time / 1000) % 60)}` : Math.floor((time / 1000) % 60)
        }`;
    };

    const totals = {
        topTracks: 6 * 6,
        topTracksSlide: 6,
        recentPlayed: 10,
        topArtists: 25
    };
    return (
        <Layout noGaps>
            <Section noPadding className="pg-listening__header u-center">
                {!currently_playing ? (
                    <Spinner />
                ) : (
                    <>
                        <div className="pg-listening__header-image-container">
                            <img className="pg-listening__header-image" src={currently_playing.item.album.images[0].url} />
                        </div>
                        <div className="pg-listening__header-main">
                            <Badge modifiers={['light', 'shadow']}>Currently Playing</Badge>
                            <h1 className="pg-listening__header-title">{currently_playing.item.name}</h1>
                            <h4 className="pg-listening__header-subtitle">
                                {currently_playing.item.artists.map((x) => x.name).join(', ')}
                            </h4>
                            <div className="pg-listening__header-footer">
                                <PlayButton paused={currently_playing.is_playing === false} />
                                <div className="pg-listening__header-timeline-container">
                                    <span className="pg-listening__header-timeline-time">{convertTime(currently_playing.progress_ms)}</span>
                                    <div className="pg-listening__header-timeline">
                                        <div
                                            className="pg-listening__header-timeline-inner"
                                            style={{
                                                width: `${(currently_playing.progress_ms / currently_playing.item.duration_ms) * 100}%`
                                            }}
                                        ></div>
                                    </div>
                                    <span className="pg-listening__header-timeline-time">
                                        {convertTime(currently_playing.item.duration_ms)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </Section>
            <Section theme="light" className="pg-listening__body" shadow>
                {/* <MusicNotes /> */}
                <div className="pg-listening__body-section">
                    <div className="heading-container">
                        <h3 className="heading-secondary">Monthly Top Tracks</h3>
                        <ArrowButtons
                            pages={top_tracks ? Math.ceil(top_tracks.items.length / 6) : 1}
                            currentPage={topTrackPage}
                            handlePageChange={handlePageChange}
                        />
                    </div>
                    <div
                        className={`pg-listening__horizontal-row-outer-container${
                            !top_tracks ? ' u-shine-animation u-shine-animation--right' : ''
                        }`}
                    >
                        <div
                            className="pg-listening__horizontal-row-container"
                            style={{
                                width: `${top_tracks ? Math.ceil(top_tracks.items.length / 6) : 6}00%`,
                                marginLeft: `-${topTrackPage - 1}00%`,
                                gridTemplateColumns: `repeat(${top_tracks ? Math.ceil(top_tracks.items.length / 6) : 6}, 1fr)`
                            }}
                        >
                            {Array.from(Array(Math.ceil(totals.topTracks / totals.topTracksSlide)).keys()).map((_, i) => (
                                <ul key={_} className="pg-listening__horizontal-row pg-listening__horizontal-row--6">
                                    {top_tracks
                                        ? [...top_tracks.items].slice(i * 6, (i + 1) * 6).map((track) => (
                                              <li className="song-card" key={track.id}>
                                                  <a href={track.uri} className="song-card__image-container song-card__track">
                                                      <img className="song-card__image" src={track.album.images[0].url} />
                                                      <FaPlay size="50px" className="song-card__track-icon" />
                                                  </a>
                                                  <div className="song-card__main">
                                                      <h5 className="song-card__name">{track.name}</h5>
                                                      <p className="song-card__artists">{track.artists.map((x) => x.name).join(', ')}</p>
                                                  </div>
                                              </li>
                                          ))
                                        : Array.from(Array(totals.topTracksSlide)).map((x) => (
                                              <div key={x} className="song-card song-card--placeholder">
                                                  <img className="song-card--placeholder__image" src="/transparent.png" />
                                                  <div className="song-card--placeholder__info">
                                                      <div className="song-card--placeholder__title"></div>
                                                      <div className="song-card--placeholder__subtitle"></div>
                                                  </div>
                                              </div>
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
                            <ul
                                className={`pg-listening__song-list${
                                    !recently_played ? ' u-shine-animation u-shine-animation--diagonal' : ''
                                }`}
                            >
                                {recently_played
                                    ? [...recently_played.items].map((item) => (
                                          <li className="song-row" key={item.played_at}>
                                              <img src={item.track.album.images[0].url} alt="Song image" className="song-row__image" />
                                              <div className="song-row__main">
                                                  <h4 className="song-row__title">{item.track.name}</h4>
                                                  <p className="song-row__artists">{item.track.artists.map((x) => x.name).join(', ')}</p>
                                              </div>
                                              <div className="song-row__time-container">
                                                  <div className="song-row__time">{convertTime(item.track.duration_ms)}</div>
                                                  <span className="song-row__date">
                                                      {formatDistance(new Date(item.played_at), new Date(), { addSuffix: true })}
                                                  </span>
                                              </div>
                                          </li>
                                      ))
                                    : Array.from(Array(totals.recentPlayed)).map((x) => (
                                          <div key={x} className="song-row song-row--placeholder">
                                              <img className="song-row--placeholder__image" src="/transparent.png" />
                                              <div className="song-row--placeholder__content">
                                                  <div className="song-row--placeholder__main">
                                                      <div className="song-row--placeholder__main-name"></div>
                                                      <div className="song-row--placeholder__main-artist"></div>
                                                  </div>
                                                  <div className="song-row--placeholder__info">
                                                      <div className="song-row--placeholder__info-length"></div>
                                                      <div className="song-row--placeholder__info-time"></div>
                                                  </div>
                                              </div>
                                          </div>
                                      ))}
                            </ul>
                        </div>
                    </div>
                    <div className="pg-listening__body-column">
                        <div className="pg-listening__body-section">
                            <div className="heading-container">
                                <h3 className="heading-secondary">Monthly Top Artists</h3>
                                {/* <Link href="/">
                                    <a className="heading-see-all">See All</a>
                                </Link> */}
                            </div>
                            <ul
                                className={`pg-listening__horizontal-row pg-listening__horizontal-row--5${
                                    !top_artists ? ' u-shine-animation u-shine-animation--diagonal' : ''
                                }`}
                            >
                                {top_artists
                                    ? top_artists.items.map((artist) => (
                                          <li className="song-card song-card--rounded" key={artist.id}>
                                              <div className="song-card__image-container">
                                                  <img className="song-card__image" src={artist.images[0].url} />
                                              </div>
                                              <span className="song-card__label">{artist.name}</span>
                                          </li>
                                      ))
                                    : Array.from(Array(totals.topArtists)).map((x) => (
                                          <li className="song-card song-card--placeholder" key={x}>
                                              <img
                                                  className="song-card--placeholder__image song-card--placeholder__image--rounded"
                                                  src="/transparent.png"
                                              />
                                              <div className="song-card--placeholder__name-small"></div>
                                          </li>
                                      ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </Section>
        </Layout>
    );
};

export default Listening;
