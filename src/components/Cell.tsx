interface Props {
    visible: boolean;
    content: number;
}

function Cell({ visible, content }: Props) {
    return (
        <>
            <div className="cell">{visible && <p>{content}</p>}</div>
        </>
    );
}

export default Cell;
