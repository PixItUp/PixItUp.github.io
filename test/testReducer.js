import {reducer} from "../src/reducer.js"
import type {Event} from "../src/event.js"
import type {Prompt} from "../src/event.js"
import {makeModel} from "../src/model.js"
import type {StartGame} from "../src/event.js"
import type {Draw} from "../src/event.js"

let testModel = makeModel()
console.log(testModel)

let setNameTest = {id: 0, data: {type: "SetName", name: "same-ingo"}}
let updatesTest1 = reducer(setNameTest, 0, testModel)
console.log(testModel)
console.log("here comes the update test")
console.log(updatesTest1)

let setNameTest2 = {id: 0, data: {type: "SetName", name: "tame-ingo"}}
let updatesTest2 = reducer(setNameTest2, -20.4, testModel)
console.log(testModel)
console.log("here comes the update test PART TWO ELECTRIC BOOGALOO")
console.log(updatesTest2)

let startGameTest = {id: 0, data: {type: "StartGame"}}
reducer(startGameTest, 0, testModel)
console.log(testModel)

let promptTest = {id: 0, data: {type: "Prompt", prompt: "A bird in the hand is worth seven pounds of silver."}}
let promptTest2 = {id: 0, data: {type: "Prompt", prompt: "Only two things are certain in life, and they are tautologically the same thing."}}
reducer(promptTest, 0, testModel)
/*console.log(testModel)
console.log("client 0 says")
console.log(testModel.mode.lines.get(0))
console.log("client -20.4 says")
console.log(testModel.mode.lines.get(-20.4))*/
reducer(promptTest2, -20.4, testModel)
/*console.log(testModel)
console.log("client 0 says")
console.log(testModel.mode.lines.get(0))
console.log("client -20.4 says")
console.log(testModel.mode.lines.get(-20.4))*/

console.log("OKAY FOLKS WE ARE GOING TO TEST THE DRAW EVENT NOW")

let drawTest = {id: 0, data: {type: "Draw", drawing: {dataURI: "oh hi"}}}
reducer(drawTest, 0, testModel)
console.log(testModel)
console.log(testModel.mode.lines.get(0))
