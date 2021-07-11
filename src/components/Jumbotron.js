import SingleInput from './SingleInput';

const JumboTron = () => {
    return (
        <section className="jumbotron">
            <div className="jumbotron__main">
                <span className="jumbotron__top-text">UI/UX Design</span>
                <h1 className="jumbotron__heading">
                    Building <span>Fun</span>, <span>Creative</span>, <span>Innovative</span> User Interfaces
                </h1>
                <p className="jumbotron__text">
                    I have a profound passion for web development, specialising in react.js, UI/UX principles & SEO optimization. Dismissing
                    the boring nerdy stuff, I also love music, travelling, and lifting weights! Get in touch with me at me@kubs.uk.
                </p>
                <SingleInput placeholder="Email Address" name="email" buttonText="Connect With Me" />
            </div>
            <div className="jumbotron__graphic-container">
                <img className="jumbotron__graphic" src="/me.png" alt="Who's that good looking guy?" />
            </div>
        </section>
    );
};

export default JumboTron;
