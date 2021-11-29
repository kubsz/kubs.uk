import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import GitCommitGraph from './GitCommitGraph';

import randomNumbers from '../data/randomNumbers';
import commits from '../data/commits';
import TooltipTrigger from './TooltipTrigger';

import projects from '../data/projects';

const Jumbotron = () => {
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
                <p className="jumbotron__text">Full stack web developer speciailising in react.js, based in the UK.</p>

                <div className="single-input">
                    <input
                        placeholder="Email Address"
                        type="text"
                        className="single-input__input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Link href={{ pathname: 'contact', query: { email } }}>
                        <a className="single-input__button">Let's Chat</a>
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
                <div className="jumbotron__info-box">
                    <span>{projects.length}</span>
                    <p>Projects Completed</p>
                </div>
                <div className="jumbotron__info-box">
                    <span>
                        <TooltipTrigger
                            className="jumbotron__info-tooltip"
                            code
                            content="await fetch('/api/git-commits').then(res => res.json())}"
                            width="40rem"
                        >
                            {273}
                        </TooltipTrigger>
                    </span>
                    <p>Yearly Git Commits</p>
                    <GitCommitGraph rows={2} columns={6} boxSize="1.2rem" gap=".4rem" width="9.3rem">
                        {commits.map((opacity, i) => (
                            <div key={i} className="git-commit-graph__box" style={{ opacity }} />
                        ))}
                    </GitCommitGraph>
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
