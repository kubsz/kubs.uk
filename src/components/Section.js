import Wave from '../assets/svg/wave.svg';

const Section = ({ children, theme, wave, className, noPadding }) => {
    return (
        <div
            className={`section${noPadding ? ' section--no-padding' : ''}${theme ? ` section--${theme}` : ''}${
                wave ? ' section--wave' : ''
            }`}
        >
            {wave ? <Wave className="section__wave" /> : null}
            <div className={`section__margin${className ? ` ${className}` : ''}`}>{children}</div>
        </div>
    );
};

export default Section;
