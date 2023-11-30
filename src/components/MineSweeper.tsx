import BombMapGenerator from "../BombMapGenerator";
import Field from "./Field";
import IDict from "../IDict";

export default function MineSweeper() {
    const bombGenerator: BombMapGenerator = new BombMapGenerator(10, 10);
    const field: number[][] = bombGenerator.getField();
    const visibilityDict: IDict = bombGenerator.createVisbililityDict();

    return <Field field={field} visibilityDict={visibilityDict} />;
}
