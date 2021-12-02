const GitCommitGraph = (props) => {
    return (
        <div
            className="git-commit-graph"
            style={{
                gridTemplateRows: `repeat(${props.rows}, ${props.boxSize})`,
                gridTemplateColumns: `repeat(${props.columns}, ${props.boxSize})`,
                gridGap: props.gap || '.5rem',
                width: props.width || 'auto',
                height: props.height || 'auto'
            }}
        >
            {props.children}
        </div>
    );
};

export default GitCommitGraph;
