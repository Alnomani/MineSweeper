import BombMapGenerator from "../classes/BombMapGenerator";
import Field from "./Field";
import IDict from "../classes/IDict";
import Vector2 from "../classes/Vector2";

export default function MineSweeper() {
    const bombGenerator: BombMapGenerator = new BombMapGenerator(5, 5);
    const field: number[][] = bombGenerator.getField();
    const visibilityDict: IDict = bombGenerator.createVisbililityDict();
    const connectedComponentSets: Set<Vector2>[] =
        bombGenerator.connectedComponentSets;

    return (
        <Field
            field={field}
            visibilityDict={visibilityDict}
            connectedComponentSets={connectedComponentSets}
        />
    );
}
