import fs from "fs/promises"
import path from "path"

const filePath = path.join(__dirname, "../src/utils/popularStreamers.json");

export const checkIfJsonExists = async function() {
    try {
        await fs.access(filePath);
        console.log("Json found");
    } catch (error) {
        if (error instanceof Error && "code" in error) {
            try {
                const initialObject = { "data": []}
                const initialData = JSON.stringify(initialObject, null, 2);
                await fs.writeFile(filePath, initialData, 'utf-8');
                console.log('Json not found, has been created now.');
            }
            catch (error) {
                console.error("блабла", error);
                throw error
            }
        } 
        else {
            console.error("Could neither find the json file not create it", error);
            throw error;
        }
    }
}