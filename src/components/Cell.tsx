import "./Cell.css";

interface Props {
    visible: boolean;
    content: number;
}

function Cell({ visible, content }: Props) {
    let realContent: string = content.toString();
    if (content === -1) {
        realContent = "B";
    } else if (content === 0) {
        realContent = " ";
    }
    return (
        <>
            <div className="cell">{visible && realContent}</div>
        </>
    );
}

export default Cell;
