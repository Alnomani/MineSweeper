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
    const [gameId, setGameId] = useState(Math.random() * 1000);

    function startNewGame() {
        setBombGenerator(new BombMapGenerator(10, 10, 1 / 6));
        setVisibilityDict(bombGenerator.createVisbililityDict());
        setGameId(Math.random() * 1000);
    }

    function updateVisibilityDict(updatedDict: IDict) {
        setVisibilityDict(updatedDict);
    }

    return (
        <>
            <Field
                key={gameId}
                bombGenerator={bombGenerator}
                visibilityDict={visibilityDictState}
                updateVisibilityDict={updateVisibilityDict}
            />
            <div className="button-container">
                <button onClick={startNewGame}>New Game</button>
            </div>
        </>
    );
}
