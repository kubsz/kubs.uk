import { useState } from 'react';

const useTagFilter = () => {
    const [filters, setFilters] = useState([]);

    const toggleFilter = (filter) => {
        const index = filters.indexOf(filter);

        if (index > -1) {
            setFilters([...filters].filter((x) => x !== filter));
        } else {
            setFilters([...filters, filter]);
        }
    };

    return [filters, toggleFilter];
};
export default useTagFilter;
