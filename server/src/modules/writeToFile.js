import fs from "fs/promises";

const writeToFile = async (array, path) => {
    await fs.writeFile(path, JSON.stringify(array, null, 2), 'utf8');
}

export default writeToFile;