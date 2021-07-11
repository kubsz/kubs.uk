import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import SingleInput from './SingleInput';

import GitCommitGraph from './GitCommitGraph';

import randomNumbers from '../data/randomNumbers';
import commits from '../data/commits';

const Jumbotron = () => {
    const imageContainerRef = useRef(null);

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
                    Building <span>Fun</span>, <span>Creative</span> and <span>Innovative</span> User Interfaces
                </h1>
                <p className="jumbotron__text">
                    I have a profound passion for web development, specialising in react.js, UI/UX principles & SEO optimization. Dismissing
                    the boring nerdy stuff, I also love music, travelling, and lifting weights!
                </p>
                <SingleInput placeholder="Email Address" name="email" buttonText="Connect With Me" />
            </div>
            <div ref={imageContainerRef} className="jumbotron__graphic-container">
                <Image
                    unoptimized={true}
                    className="jumbotron__graphic"
                    src="/me.png"
                    alt="Who's that good looking guy?"
                    width="433"
                    height="410"
                />
                <div className="jumbotron__info-box">
                    <span>47</span>
                    <p>Completed Projects</p>
                </div>
                <div className="jumbotron__info-box">
                    <span>237</span>
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
