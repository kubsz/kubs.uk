import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import useSWRFetcher from '../hooks/useSWRFetcher';

import randomNumbers from '../data/randomNumbers';

import GitCommitGraph from './GitCommitGraph';
import Spinner from './Spinner';
import TooltipTrigger from './TooltipTrigger';

const Jumbotron = ({ githubContribitons, projectCount }) => {
    const { data: github_contributions } = useSWRFetcher('/api/github-contributions', { data: githubContribitons });

    const imageContainerRef = useRef(null);

    const [email, setEmail] = useState('');
    const [imageRect, setImageRect] = useState({ center: {} });

    useEffect(() => {
        const containerRect = imageContainerRef.current.getBoundingClientRect();
        const rect = imageContainerRef.current.querySelector('img').getBoundingClientRect();

        let obj = {
            left: rect.left - containerRect.left,
            top: rect.top - containerRect.top,
            width: rect.width,
            height: rect.height
        };

        obj.center = { x: obj.left + rect.width / 2, y: obj.top + rect.height / 2 };

        setImageRect(obj);
    }, []);

    return (
        <section className="jumbotron">
            <div className="jumbotron__main">
                <span className="jumbotron__top-text">UI/UX Design</span>
                <h1 className="jumbotron__heading">
                    Converting <span>Complex</span> Problems into <span>Beautiful</span>, <span>Intuitive</span> Designs
                </h1>
                <p className="jumbotron__text">Full stack web developer specialising in react.js, based in the UK.</p>

                <div className="single-input">
                    <input
                        placeholder="Email Address"
                        type="text"
                        className="single-input__input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Link href={email ? { pathname: 'contact', query: { email } } : '/contact'} className="single-input__button">
                        Let's Chat
                    </Link>
                </div>
            </div>
            <div ref={imageContainerRef} className="jumbotron__graphic-container">
                <Image
                    // unoptimized={true}
                    quality={100}
                    priority={true}
                    className="jumbotron__graphic"
                    src="/me.png"
                    alt="Kubs Korkmaz - Web Developer"
                    width={433}
                    height={410}
                />
                <div className="jumbotron__info-box jumbotron__info-box--fixed">
                    <span>{projectCount}</span>
                    <p>Projects Completed</p>
                </div>
                <div className="jumbotron__info-box jumbotron__info-box--fixed">
                    {!github_contributions ? (
                        <Spinner modifiers={['small', 'light']} />
                    ) : (
                        <>
                            <span>
                                <TooltipTrigger
                                    className="jumbotron__info-tooltip"
                                    code
                                    content="github_contributions.reduce((a, b) => a + b, 0)"
                                    width="32rem"
                                >
                                    {github_contributions.reduce((a, b) => a + b, 0)}
                                </TooltipTrigger>
                            </span>
                            <p>Yearly Git Commits</p>
                            <GitCommitGraph rows={2} columns={6} boxSize="1.2rem" gap=".4rem" width="9.3rem">
                                {github_contributions.map((count, i) => (
                                    <div
                                        key={i}
                                        className="git-commit-graph__box"
                                        style={{
                                            backgroundColor: `rgba(94, 58, 239, ${
                                                Math.max(...github_contributions) === 0 ? 0 : count / Math.max(...github_contributions)
                                            }`
                                        }}
                                    />
                                ))}
                            </GitCommitGraph>
                        </>
                    )}
                </div>
                {imageRect
                    ? randomNumbers.map((rd, i) => {
                          const circleSize = rd.size + 1;
                          return (
                              <span
                                  key={i}
                                  className={`jumbotron__asset jumbotron__asset--${i % 2 ? 'line' : 'circle'}`}
                                  style={{
                                      top: `${imageRect.center.y + Math.floor(rd.top) + 60}px`,
                                      left: `${imageRect.center.x + Math.floor(rd.left)}px`,
                                      transform: `rotate(${rd.rotate}deg)`,
                                      opacity: i % 2 ? rd.opacity + 0.3 : rd.opacity,
                                      width: i % 2 ? `${rd.size + 1.5}rem` : `${circleSize}rem`,
                                      height: i % 2 ? `${rd.size / 5 + 0.15}rem` : `${circleSize}rem`
                                  }}
                              />
                          );
                      })
                    : null}
            </div>
        </section>
    );
};

export default Jumbotron;
