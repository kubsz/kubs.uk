import Wave from '../assets/svg/wave.svg';

const Section = ({ children, className, modifiers = [] }) => {
    return (
        <div className={`section${modifiers ? ` ${modifiers.map((x) => `section--${x}`).join(' ')}` : ''}`}>
            {modifiers.indexOf('wave') > -1 ? <Wave className="section__wave" /> : null}
            <div className={`section__margin${className ? ` ${className}` : ''}`}>{children}</div>
        </div>
    );
};

export default Section;
