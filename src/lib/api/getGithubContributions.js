import { parse } from 'node-html-parser';
import axios from 'axios';

export const getGithubContributions = async () => {
    const contributions = await axios.get('https://github.com/users/kubsz/contributions');
    const root = parse(contributions.data);

    const days = Array.from(root.querySelectorAll('.ContributionCalendar-day'));

    const data = Array.from(Array(12).keys()).fill(0);

    for (const day of days) {
        const { ['data-date']: date, ['data-count']: count } = day._attrs;
        if (!date || !count) continue;

        const month = date.split('-')[1] * 1;
        data[month - 1] += count * 1;
    }

    return data;
};
