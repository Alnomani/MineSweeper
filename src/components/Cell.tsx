import "./Cell.css";

interface Props {
    position: string;
    visible: boolean;
    content: number;
    updateField: (location: string) => void;
}

function Cell({ position, visible, content, updateField }: Props) {
    let realContent: string = content.toString();
    if (content === -1) {
        realContent = "B";
    } else if (content === 0) {
        realContent = "E";
    }

    const updateCell = function updateCell() {
        updateField(position);
    };

    return (
        <>
            <div className="cell" onClick={updateCell}>
                {visible && realContent}
            </div>
        </>
    );
}

export default Cell;
