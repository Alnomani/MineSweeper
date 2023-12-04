import { useState } from "react";
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
    const [putMarker, setPutMarker] = useState(false);
    // prettier-ignore
    const marker: string= "🚩";

    let realContent: string = content.toString();
    let cellClass = "normal-cell";
    if (content === -1) {
        realContent = "💣";
    } else if (content === 0) {
        realContent = " ";
        if (visible) {
            cellClass = "empty-cell";
        }
    }

    const updateCell = function updateCell() {
        updateField(position);
    };

    const placeFlag = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        console.log(`right clicked on cell ${position}`);
        if (!visible) {
            setPutMarker(!putMarker);
        }
    };

    return (
        <div
            className={cellClass}
            onClick={updateCell}
            onContextMenu={placeFlag}
        >
            {visible && realContent}
            {!visible && putMarker && marker}
        </div>
    );
}
