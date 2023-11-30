import { useState } from "react";
import "./Field.css";
import Cell from "./Cell";
import IDict from "../IDict";

interface Props {
    field: number[][];
    visibilityDict: IDict;
}

export default function Field({ field, visibilityDict }: Props) {
    const [visibilityDictState, setVisibilityDict] = useState(visibilityDict);

    console.table(field);
    console.log("executed App");
    function updateField(location: string) {
        // console.log(location);
        // console.log(visibilityDictState[location]);
        // console.log(visibilityDictState);
        // console.log({ ...visibilityDictState, "00": true });
        setVisibilityDict({ ...visibilityDictState, [location]: true });
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
                                    position={i.toString() + j.toString()}
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
