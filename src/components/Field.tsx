import { useState } from "react";
import "./Field.css";
import Cell from "./Cell";
import IDict from "../classes/IDict";
import Vector2 from "../classes/Vector2";

interface Props {
    field: number[][];
    visibilityDict: IDict;
    connectedComponentSets: Set<string>[];
}

export default function Field(props: Props) {
    const { field, visibilityDict, connectedComponentSets } = props;
    const [visibilityDictState, setVisibilityDict] = useState(visibilityDict);

    console.table(field);
    console.log("executed App");
    function updateField(location: Vector2) {
        const locationKey = location.toString();
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
                console.log(locations);
                setVisibilityDict({ ...visibilityDictState, ...locations });
            }
        } else {
            console.log("bomb found. ------------");
        }
    }

    function getConnectedComponents(
        clickedLocation: string
    ): Set<string> | null {
        console.log(clickedLocation);
        console.log(connectedComponentSets);
        let set: Set<string> | null = null;
        connectedComponentSets.forEach((currentSet) => {
            if (currentSet.has(clickedLocation)) {
                set = currentSet;
                return currentSet;
            }
        });
        return set;
    }

    return (
        <>
            <div className="field-container">
                {field.map(function (row, i) {
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
                })}
            </div>
        </>
    );
}
