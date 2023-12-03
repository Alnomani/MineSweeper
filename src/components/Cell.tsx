import Vector2 from "../classes/Vector2";
import "./Cell.css";

interface Props {
    position: Vector2;
    visible: boolean;
    content: number;
    updateField: (location: Vector2) => void;
}

export default function Cell(props: Props) {
    const { position, visible, content, updateField } = props;
    let realContent: string = content.toString();
    let cellClass = "normal-cell";
    if (content === -1) {
        realContent = "X";
    } else if (content === 0) {
        realContent = " ";
        if (visible) {
            cellClass = "empty-cell";
        }
    }

    const updateCell = function updateCell() {
        updateField(position);
    };

    return (
        <div className={cellClass} onClick={updateCell}>
            {visible && realContent}
        </div>
    );
}
