import Wave from '../assets/svg/wave.svg';

const Section = (props) => {
    return (
        <div className={`section${props.dark ? ' section--dark' : ''}`}>
            {props.wave ? <Wave className="section__wave" /> : null}
            <div className="section__margin">{props.children}</div>
        </div>
    );
};

export default Section;
