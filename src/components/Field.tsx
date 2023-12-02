import { useState } from "react";
import "./Field.css";
import Cell from "./Cell";
import IDict from "../classes/IDict";
import Vector2 from "../classes/Vector2";

interface Props {
    field: number[][];
    visibilityDict: IDict;
    connectedComponentSets: Set<string>[];
    bombLocations: Vector2[];
}

export default function Field(props: Props) {
    const { field, visibilityDict, connectedComponentSets, bombLocations } =
        props;
    const [visibilityDictState, setVisibilityDict] = useState(visibilityDict);
    const [gameOver, setGameOver] = useState(false);

    console.table(field);
    console.log("executed App");
    function updateField(location: Vector2) {
        const locationKey = location.toString();
        if (gameOver) {
            return;
        }
        if (field[location.x][location.y] > 0) {
            setVisibilityDict({ ...visibilityDictState, [locationKey]: true });
        } else if (field[location.x][location.y] === 0) {
            const connectedSet: Set<string> | null =
                getConnectedComponents(locationKey);
            const locations: { [propName: string]: boolean } = {};
            if (connectedSet !== null) {
                connectedSet.forEach((locationKey) => {
                    locations[locationKey] = true;
                });
                setVisibilityDict({ ...visibilityDictState, ...locations });
            }
        } else {
            console.log("bomb found. ------------");
            const locations: { [propName: string]: boolean } = {};
            bombLocations.forEach((bombLocation) => {
                locations[bombLocation.toString()] = true;
            });
            setVisibilityDict({ ...visibilityDictState, ...locations });
            setGameOver(true);
        }
    }

    function getConnectedComponents(
        clickedLocation: string
    ): Set<string> | null {
        let set: Set<string> | null = null;
        connectedComponentSets.forEach((currentSet) => {
            if (currentSet.has(clickedLocation)) {
                set = currentSet;
                return currentSet;
            }
        });
        return set;
    }

    function mapRow(row: number[], i: number) {
        return (
            <div key={i.toString()} className="row">
                {row.map(mapCol, { i: i })}
            </div>
        );
    }

    function mapCol(this: { i: number }, col: number, j: number) {
        const strKey: string = this.i.toString() + j.toString();
        return (
            <Cell
                key={strKey}
                position={new Vector2(this.i, j)}
                visible={visibilityDictState[strKey]}
                content={col}
                updateField={updateField}
            />
        );
    }

    return <div className="field-container">{field.map(mapRow)}</div>;
}

/*{ {field.map(function (row, i) {
                    return (
                        <div key={i.toString()} className="row">
                            {row.map((col, j) => (
                                <Cell
                                    key={i.toString() + j.toString()}
                                    position={new Vector2(i, j)}
                                    visible={
                                        visibilityDictState[
                                            i.toString() + j.toString()
                                        ]
                                    }
                                    content={col}
                                    updateField={updateField}
                                />
                            ))}
                        </div>
                    );
                })} }*/
