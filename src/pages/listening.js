import { useState, useEffect } from 'react';

import { formatDistance } from 'date-fns';

import useSWRFetcher from '../hooks/useSWRFetcher';
import { convertTime } from '../lib/utils';

import ArrowButtons from '../components/ArrowButtons';
import Layout from '../components/Layout';
import Section from '../components/Section';
import Spinner from '../components/Spinner';
import CurrentlyListening from '../components/CurrentlyListening';

import { FaPlay } from 'react-icons/fa';

import SadFace from '../assets/svg/sad-face.svg';

const Listening = () => {
    const [topTrackPage, setTopTrackPage] = useState(1);
    const [breakpoint, setBreakpoint] = useState(0);

    const { data: top_tracks } = useSWRFetcher('/api/spotify/top-tracks');
    const { data: top_artists } = useSWRFetcher('/api/spotify/top-artists');
    const { data: currently_playing } = useSWRFetcher('/api/spotify/currently-playing', null, 3000);
    const { data: recently_played } = useSWRFetcher('/api/spotify/recently-played', null, 3000);

    const [totals, setTotals] = useState({ topTracks: 6 * 6, topTracksSlide: 6, recentPlayed: 10, topArtists: 25 });

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        switch (breakpoint) {
            case 400:
                return setTotals({ ...totals, topTracksSlide: 2 });
            case 576:
                return setTotals({ ...totals, topTracksSlide: 3 });
            case 768:
                return setTotals({ ...totals, topTracksSlide: 4 });
            case 992:
                return setTotals({ ...totals, topTracksSlide: 5 });
            case 1400:
                return setTotals({ ...totals, topTracksSlide: 6 });
        }
    }, [breakpoint]);

    const handlePageChange = (newPage) => {
        setTopTrackPage(newPage);
    };

    const handleResize = () => {
        const width = window.innerWidth;

        const breakpoints = [400, 576, 768, 992, 1400];

        const bp = breakpoints.find((x) => width < x);

        if (bp !== breakpoint) setBreakpoint(() => bp);
    };

    return (
        <Layout noGaps>
            <Section modifiers={['no-padding']} className="pg-listening__header u-center">
                {currently_playing ? (
                    currently_playing.status === 204 ? (
                        <div className="pg-listening__header-error">
                            <SadFace />
                            <h4 className="pg-listening__header-error-title">Stuck in Silence</h4>
                            <p>I'm not currently listening to any music! Check my recently listened to music below.</p>
                        </div>
                    ) : (
                        <CurrentlyListening data={currently_playing} />
                    )
                ) : (
                    <Spinner />
                )}
            </Section>
            <Section className="pg-listening__body" modifiers={['shadow']}>
                {/* <MusicNotes /> */}
                <div className="pg-listening__body-section">
                    <div className="heading-container">
                        <h3 className="heading-secondary">Monthly Top Tracks</h3>
                        <ArrowButtons
                            pages={top_tracks ? Math.ceil(top_tracks.items.length / totals.topTracksSlide) : 1}
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
                                width: `${
                                    top_tracks
                                        ? Math.ceil(top_tracks.items.length / totals.topTracksSlide)
                                        : totals.topTracks / totals.topTracksSlide
                                }00%`,
                                marginLeft: `-${topTrackPage - 1}00%`,
                                gridTemplateColumns: `repeat(${
                                    top_tracks ? Math.ceil(top_tracks.items.length / totals.topTracksSlide) : totals.topTracksSlide
                                }, 1fr)`
                            }}
                        >
                            {Array.from(Array(Math.ceil(totals.topTracks / totals.topTracksSlide)).keys()).map((_, i) => (
                                <ul
                                    key={_}
                                    className="pg-listening__horizontal-row"
                                    style={{
                                        gridTemplateColumns: `repeat(${totals.topTracksSlide}, 1fr)`
                                    }}
                                >
                                    {top_tracks
                                        ? [...top_tracks.items]
                                              .slice(i * totals.topTracksSlide, (i + 1) * totals.topTracksSlide)
                                              .map((track) => (
                                                  <li className="song-card" key={track.id}>
                                                      <a href={track.uri} className="song-card__image-container song-card__track">
                                                          <img className="song-card__image" src={track.album.images[0].url} />
                                                          <FaPlay size="50px" className="song-card__track-icon" />
                                                      </a>
                                                      <div className="song-card__main">
                                                          <h5 className="song-card__name">{track.name}</h5>
                                                          <p className="song-card__artists">
                                                              {track.artists.map((x) => x.name).join(', ')}
                                                          </p>
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
