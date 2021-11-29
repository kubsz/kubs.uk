const FormSection = ({ modifiers = [], element, value, name, type = 'text', placeholder, label, optional, onKeyDown }) => {
    let jsx = '';
    switch (element) {
        case 'input':
            jsx = (
                <input
                    type={type}
                    className="form__input"
                    placeholder={placeholder}
                    id={name}
                    name={name}
                    onChange={({ target: { value } }) => onKeyDown(value)}
                    value={value}
                />
            );
            break;
        case 'textarea':
            jsx = (
                <textarea
                    name={name}
                    id={name}
                    rows={3}
                    className="form__textarea"
                    placeholder={placeholder}
                    onChange={({ target: { value } }) => onKeyDown(value)}
                    value={value}
                ></textarea>
            );
            break;
        case 'button':
            jsx = <button className="btn btn--primary">Submit Message</button>;
            break;
    }

    return (
        <div className={[`form__section`, [...modifiers].map((x) => `form__section--${x}`)].join(' ')} data-optional={optional}>
            {jsx}
            {element !== 'button' && (
                <label htmlFor={name} className="form__label">
                    {label}
                </label>
            )}
        </div>
    );
};

export default FormSection;
