const Sidenav = ({ active, closeSidenav }) => {
    return (
        <div className={`sidenav__container${active ? ' sidenav__container--active' : ''}`} onClick={closeSidenav}>
            <div className="sidenav">
                <ul className="sidenav__list"></ul>
            </div>
        </div>
    );
};

export default Sidenav;
