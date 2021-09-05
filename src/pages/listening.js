import Badge from '../components/Badge';
import Layout from '../components/Layout';
import MusicNotes from '../components/MusicNotes';
import PlayButton from '../components/PlayButton';
import Section from '../components/Section';

const Listening = () => {
    return (
        <Layout noGaps>
            <Section noPadding className="pg-listening__header">
                <div className="pg-listening__header-image-container">
                    <img className="pg-listening__header-image" src="https://i.scdn.co/image/ab67616d00001e02bd6587e9a32c161be8c71100" />
                </div>
                <div className="pg-listening__header-main">
                    <Badge modifiers={['light', 'shadow']}>Most Popular of the Week</Badge>
                    <h1 className="pg-listening__header-title">Fair Trade</h1>
                    <h4 className="pg-listening__header-subtitle">Drake ft. Travis Scott</h4>
                    <PlayButton />
                </div>
            </Section>
            <Section theme="light" className="pg-listening__body">
                <MusicNotes />
                <p>hey</p>
            </Section>
        </Layout>
    );
};

export default Listening;
