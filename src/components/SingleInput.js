const SingleInput = (props) => {
    return (
        <div className="single-input">
            <input placeholder={props.placeholder} type="text" className="single-input__input" />
            <button className="single-input__button">{props.buttonText}</button>
        </div>
    );
};

export default SingleInput;
