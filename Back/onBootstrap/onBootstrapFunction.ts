import { getRandomClip } from "../src/service/clipOfTheDayServices";
import { checkIfJsonExists } from "./checkIfJsonExists";
import { updateStreamersList } from "./updateStreamersList";

export const onBootstrapFunction = async function() {
    await checkIfJsonExists();
    await updateStreamersList();
}