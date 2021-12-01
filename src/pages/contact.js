import { useRef, useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import config from '../data/config';

import Layout from '../components/Layout';
import Section from '../components/Section';

import FormSection from '../components/FormSection';
import { validateEmail } from '../lib/utils';
import axios from 'axios';

const Contact = () => {
    const { query } = useRouter();

    useEffect(() => {
        setEmail(query.email);
    }, [query]);

    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const formRef = useRef(null);

    useEffect(() => {
        if (errorMessage !== '' && successMessage !== '') setSuccessMessage('');
        if (successMessage !== '' && errorMessage !== '') setErrorMessage('');
    }, [errorMessage, successMessage]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const obj = { name, company, email, message };

        for (const [key, value] of Object.entries(obj)) {
            if (key !== 'company' && !value.length) return setErrorMessage(`Please enter your ${key}.`);
            if (key === 'email' && !validateEmail(email)) return setErrorMessage(`Please enter a valid email.`);
        }

        const { status, error } = await axios.post('/api/contact', obj);

        if (status !== 200) return setErrorMessage(error);

        [setName, setCompany, setEmail, setMessage, setErrorMessage].forEach((func) => func(''));
        return setSuccessMessage('Thanks for submitting your contact request!');
    };

    return (
        <Layout crumbs={[{ label: 'Contact' }]} noGaps>
            <Section className="pg-contact">
                <div className="pg-contact__side">
                    <h1>Get in Touch</h1>
                    <p>Looking for a project quote, interested in pricing, or simply have a question? Feel free to get in touch!</p>
                    <div className="pg-contact__side-footer">
                        <div className="pg-contact__side-footer-section">
                            <h5 className="pg-contact__side-footer-section-title">Keep up with me:</h5>
                            <ul className="pg-contact__socials-list">
                                {config.links.socials.map(({ url, icon }) => (
                                    <li key={url} className="pg-contact__socials-item">
                                        <a href={url} target="_blank" rel="noreferrer">
                                            {icon}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="pg-contact__side-footer-section">
                            <h5 className="pg-contact__side-footer-section-title">Based:</h5>
                            <span className="pg-contact__side-footer-section-text">Milton Keynes, United Kingdom</span>
                        </div>
                    </div>
                </div>
                <div className="pg-contact__main">
                    <h3 className="pg-contact__main-title">
                        👋
                        <span>
                            Say hello <span>world</span>
                        </span>
                    </h3>

                    <form className="form" onSubmit={handleSubmit} ref={formRef}>
                        <FormSection
                            element="input"
                            value={name}
                            name="name"
                            label="Name"
                            placeholder="Your name"
                            onKeyDown={(text) => setName(text)}
                        />

                        <FormSection
                            element="input"
                            value={company}
                            name="company"
                            label="Company"
                            placeholder="Your company"
                            optional
                            onKeyDown={(text) => setCompany(text)}
                        />

                        <FormSection
                            element="input"
                            type="email"
                            value={email}
                            name="email"
                            label="Email"
                            placeholder="Email address"
                            onKeyDown={(text) => setEmail(text)}
                        />

                        <FormSection
                            modifiers={['100']}
                            element="textarea"
                            value={message}
                            name="message"
                            label="Message"
                            placeholder="Start typing your message..."
                            onKeyDown={(text) => setMessage(text)}
                        />
                        <FormSection modifiers={['100']} element="button" label="Submit Message" />
                        {errorMessage ? <p className="form__message form__message--error">{errorMessage}</p> : null}
                        {successMessage ? <p className="form__message form__message--success">{successMessage}</p> : null}
                    </form>
                </div>
            </Section>
        </Layout>
    );
};

export default Contact;
