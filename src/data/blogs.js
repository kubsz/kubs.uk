import WebIcon from '../assets/svg/blog/web.svg';
import CSSLabIcon from '../assets/svg/blog/csslab.svg';
import HytaleGuideIcon from '../assets/svg/blog/hytaleguide.svg';

export default [
    {
        title: 'A Little Look Around my Portfolio',
        description: 'Take a little gander around my portfolio with me, uncovering all of its deepest and darkest secrets...',
        date: 'August 13, 2021',
        tags: [
            {
                name: 'Announcement',
                backgroundColor: '#f5424b'
            },
            {
                name: 'Development',
                backgroundColor: '#475dff',
                color: '#fff'
            }
        ],
        slug: 'a-little-look-around-my-portfolio',
        graphic: {
            direction: 45,
            colors: ['#f57171', '#6c5fe8'],
            icon: <WebIcon />
        }
    },
    {
        title: 'Why CSSLab?',
        description: 'Learn about my newest project CSSLab, what it has to offer and what development is to come in the near future!',
        date: 'July 21, 2021',
        slug: 'why-csslab',
        tags: [
            {
                name: 'Development',
                backgroundColor: '#475dff',
                color: '#fff'
            },
            {
                name: 'Educational',
                backgroundColor: '#008537',
                color: '#fff'
            }
        ],
        graphic: {
            direction: 45,
            colors: ['#516ad1', '#68caf8'],
            icon: <CSSLabIcon />
        }
    },
    {
        title: 'HytaleGuide: The First of Many',
        description: 'Learn more about HytaleGuide, the first website published using the dynamic codebase explained in this article.',
        date: 'June 3, 2021',
        slug: 'hytaleguide-the-first-of-many',
        tags: [
            {
                name: 'Development',
                backgroundColor: '#475dff',
                color: '#fff'
            },
            {
                name: 'Personal',
                backgroundColor: '#db63ff',
                color: '#fff'
            }
        ],
        graphic: {
            direction: 135,
            colors: ['#503a6d', '#202a4e 40%', '#0f1733'],
            icon: <HytaleGuideIcon style={{ padding: 35 }} />
        }
    }
];
