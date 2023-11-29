// import { useState } from "react";
import "./App.css";
import Cell from "./components/Cell";
import BombMap from "./BombMap";

function App() {
    // const [count, setCount] = useState(0);
    const field = new BombMap(5, 5).getField();
    // field.map((row) => row.map((col) => <Cell visible={true} content={col} />));
    console.table(field);
    return (
        <>
            <div className="field-container">
                {field.map(function (row, i) {
                    return (
                        <div className="row">
                            {row.map((col, j) => (
                                <Cell
                                    key={i.toString() + j.toString()}
                                    visible={true}
                                    content={col}
                                />
                            ))}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default App;
