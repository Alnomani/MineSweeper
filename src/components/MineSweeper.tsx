import { useState } from "react";
import BombMapGenerator from "../classes/BombMapGenerator";
import Field from "./Field";
import IDict from "../classes/IDict";

export default function MineSweeper() {
    const [bombGenerator, setBombGenerator] = useState(
        new BombMapGenerator(10, 10, 1 / 6)
    );
    const [visibilityDictState, setVisibilityDict] = useState(
        bombGenerator.createVisbililityDict()
    );
    const [isGameOver, setIsGameOver] = useState(false);

    function startNewGame() {
        setBombGenerator(new BombMapGenerator(10, 10, 1 / 6));
        setVisibilityDict(bombGenerator.createVisbililityDict());
        setIsGameOver(false);
    }

    function updateVisibilityDict(updatedDict: IDict) {
        setVisibilityDict(updatedDict);
    }

    return (
        <>
            <Field
                bombGenerator={bombGenerator}
                visibilityDict={visibilityDictState}
                isGameOver={isGameOver}
                updateVisibilityDict={updateVisibilityDict}
            />
            <div className="button-container">
                <button onClick={startNewGame}>New Game</button>
            </div>
        </>
    );
}
