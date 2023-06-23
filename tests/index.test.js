import {addEvent} from "../public/scripts";

console.log(addEvent)
describe("test scripts.js", () => {
    console.log('1231231231321321321321321323213213')
    console.log(scripts)
    for(const [methodFunction] of Object.entries(scripts)){
        test("it should exist", () => {
            
            console.log(methodFunction)
            console.log('asdasd');
            expect(methodFunction).toBeTruthy();
        })
    }
});