import { parse } from 'node-html-parser';
import axios from 'axios';

export const getGithubContributions = async () => {
    const contributions = await axios.get('https://github.com/users/kubsz/contributions');
    const root = parse(contributions.data);

    const days = Array.from(root.querySelectorAll('.ContributionCalendar-day'));

    const months = days.reduce(
        (acc, curr) => {
            if (!curr._attrs['data-date']) return acc;
            const month = Number(curr._attrs['data-date'].split('-')[1]);
            acc[month - 1] += Number(curr._attrs['data-level']);
            return acc;
        },
        Array.from(Array(12).keys()).map((_i) => 0)
    );

    return months;
};
