import "./Field.css";
import Cell from "./Cell";
import IDict from "../classes/IDict";
import Vector2 from "../classes/Vector2";
import BombMapGenerator from "../classes/BombMapGenerator";

// interface Props {
//     field: number[][];
//     visibilityDict: IDict;
//     connectedCellsSets: Set<string>[];
//     bombLocations: Vector2[];
// }
interface Props {
    bombGenerator: BombMapGenerator;
    visibilityDict: IDict;
    isGameOver: boolean;
    updateVisibilityDict: (dict: IDict) => void;
}

export default function Field(props: Props) {
    const { bombGenerator, visibilityDict, isGameOver, updateVisibilityDict } =
        props;
    const field: number[][] = bombGenerator.getField();
    const connectedCellsSets: Set<string>[] = bombGenerator.connectedSets;
    const bombLocations: Vector2[] = bombGenerator.bombLocations;

    // const [visibilityDictState, setVisibilityDict] = useState(visibilityDict);
    // const [isGameOver, setIsGameOver] = useState(false);

    // console.table(field);
    console.log("executed App");
    function updateField(location: Vector2) {
        const locationKey = location.toString();
        if (isGameOver) {
            return;
        }

        if (field[location.x][location.y] > 0) {
            updateVisibilityDict({ ...visibilityDict, [locationKey]: true });
        } else if (field[location.x][location.y] === 0) {
            handleEmptyCellClick(locationKey);
        } else {
            handleBombClick();
        }
    }

    function handleEmptyCellClick(locationKey: string) {
        const connectedSet: Set<string> | null =
            getConnectedCellSet(locationKey);
        const locations: { [propName: string]: boolean } = {};
        if (connectedSet !== null) {
            connectedSet.forEach((locationKey) => {
                locations[locationKey] = true;
            });
            updateVisibilityDict({ ...visibilityDict, ...locations });
        }
    }

    function handleBombClick() {
        console.log("bomb found. ------------");
        const locations: { [propName: string]: boolean } = {};
        bombLocations.forEach((bombLocation) => {
            locations[bombLocation.toString()] = true;
        });
        updateVisibilityDict({ ...visibilityDict, ...locations });
        // setIsGameOver(true);
    }

    function getConnectedCellSet(clickedLocation: string): Set<string> | null {
        let set: Set<string> | null = null;
        connectedCellsSets.forEach((currentSet) => {
            if (currentSet.has(clickedLocation)) {
                set = currentSet;
                return currentSet;
            }
        });
        return set;
    }

    function mapRow(row: number[], rowIndex: number) {
        return (
            <div key={rowIndex.toString()} className="row">
                {row.map(mapCol, { rowIndex: rowIndex })}
            </div>
        );
    }

    function mapCol(this: { rowIndex: number }, col: number, colIndex: number) {
        const strKey: string = this.rowIndex.toString() + colIndex.toString();
        return (
            <Cell
                key={strKey}
                position={new Vector2(this.rowIndex, colIndex)}
                visible={visibilityDict[strKey]}
                content={col}
                updateField={updateField}
            />
        );
    }

    return <div className="field-container">{field.map(mapRow)}</div>;
}
