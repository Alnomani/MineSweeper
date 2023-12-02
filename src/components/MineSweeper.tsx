import BombMapGenerator from "../classes/BombMapGenerator";
import Field from "./Field";
import IDict from "../classes/IDict";

export default function MineSweeper() {
    const bombGenerator: BombMapGenerator = new BombMapGenerator(10, 10);
    const field: number[][] = bombGenerator.getField();
    const visibilityDict: IDict = bombGenerator.createVisbililityDict();
    const connectedComponentSets: Set<string>[] =
        bombGenerator.connectedComponentSets;

    return (
        <Field
            field={field}
            visibilityDict={visibilityDict}
            connectedComponentSets={connectedComponentSets}
            bombLocations={bombGenerator.bombLocations}
        />
    );
}
