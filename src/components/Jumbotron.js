import { urlObjectKeys } from 'next/dist/next-server/lib/utils';
import { useEffect, useRef, useState } from 'react';
import SingleInput from './SingleInput';

const JumboTron = () => {
    const imageContainerRef = useRef(null);
    const imageRef = useRef(null);

    const [imageRect, setImageRect] = useState({ center: {} });

    useEffect(() => {
        const containerRect = imageContainerRef.current.getBoundingClientRect();
        const rect = imageRef.current.getBoundingClientRect();

        console.log(containerRect, rect);

        let obj = {
            left: rect.left - containerRect.left,
            top: rect.top - containerRect.top,
            width: rect.width,
            height: rect.height
        };

        obj.center = { x: obj.left + rect.width / 2, y: obj.top + rect.height / 2 };

        setImageRect(obj);
    }, []);

    console.log(imageRect);
    return (
        <section className="jumbotron">
            <div className="jumbotron__main">
                <span className="jumbotron__top-text">UI/UX Design</span>
                <h1 className="jumbotron__heading">
                    Building <span>Fun</span>, <span>Creative</span>, <span>Innovative</span> User Interfaces
                </h1>
                <p className="jumbotron__text">
                    I have a profound passion for web development, specialising in react.js, UI/UX principles & SEO optimization. Dismissing
                    the boring nerdy stuff, I also love music, travelling, and lifting weights!
                </p>
                <SingleInput placeholder="Email Address" name="email" buttonText="Connect With Me" />
            </div>
            <div ref={imageContainerRef} className="jumbotron__graphic-container">
                <img ref={imageRef} className="jumbotron__graphic" src="/me.png" alt="Who's that good looking guy?" />
                {imageRect
                    ? [...Array(50)].map((x, i) => {
                          const circleSize = Math.random() + 1;
                          return (
                              <span
                                  key={i}
                                  className={`jumbotron__asset jumbotron__asset--${i % 2 ? 'line' : 'circle'}`}
                                  style={{
                                      top: `${imageRect.center.y + Math.floor(Math.random() * 500 - 250)}px`,
                                      left: `${imageRect.center.x + Math.floor(Math.random() * 500 - 300)}px`,
                                      transform: `rotate(${Math.random() * 360}deg)`,
                                      opacity: i % 2 ? Math.random() + 0.3 : Math.random() - 0.4,
                                      width: i % 2 ? `${Math.random() + 1.5}rem` : `${circleSize}rem`,
                                      height: i % 2 ? `${Math.random() / 5 + 0.15}rem` : `${circleSize}rem`
                                  }}
                              />
                          );
                      })
                    : null}
            </div>
        </section>
    );
};

export default JumboTron;
