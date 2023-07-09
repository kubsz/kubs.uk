const TagFilter = ({ items, filters, toggleFilter, filterMessage = 'Showing results that included ' }) => {
    const getColor = (color, dark = false) => {
        const hex = color[0] === '#';

        let col, colDark;

        if (hex) {
            colDark = `${color}8c`;
            col = `${color}4d`;
        } else {
            colDark = `rgba(${color}, .55)`;
            col = `rgba(${color}, .3)`;
        }

        return dark ? colDark : col;
    };

    console.log(items);
    return (
        <>
            <ul className="tag-filter__list">
                {items.map(({ name, color, image, value }) => {
                    const active = filters.findIndex((x) => x === value) > -1;
                    const filtersExist = filters.length > 0;

                    return (
                        <li key={value} className="tag-filter__item">
                            <button
                                className={`tag-filter${filtersExist ? (active ? ' tag-filter--active' : ' tag-filter--inactive') : ''}`}
                                onClick={() => toggleFilter(value)}
                                style={
                                    active
                                        ? {
                                              backgroundColor: getColor(color),
                                              color: getColor(color),
                                              boxShadow: `0 2px 0 0 ${getColor(color, true)}`,
                                              borderColor: getColor(color)
                                          }
                                        : {}
                                }
                            >
                                {image || <div className="tag-filter__box" style={{ backgroundColor: getColor(color, true) }}></div>}
                                <span>{name}</span>
                            </button>
                        </li>
                    );
                })}
            </ul>
            {filters.length ? (
                <p className="tag-filter__text">
                    {filterMessage}
                    {filters.map((filter) => {
                        const filterObj = items.find((x) => x.name === filter);
                        return (
                            <span key={filter}>
                                <span
                                    onClick={() => toggleFilter(filterObj.name)}
                                    style={{
                                        backgroundColor: getColor(filterObj.color),
                                        borderColor: getColor(filterObj.color)
                                    }}
                                >
                                    {filter}
                                </span>
                            </span>
                        );
                    })}
                </p>
            ) : null}
        </>
    );
};

export default TagFilter;
