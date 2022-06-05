import { program } from "commander";
import { createAction, addCptAction, addPageAction, addStoreAction } from "./action.js";

export default () => {
    program
        .command('create <project> [otherArgs...]')
        .description('clone a respository into a new create directory')
        .action(createAction)

    program
        .command('addcpt <name>')
        .description('add a new componment, default dir src/components/<name>')
        .action(addCptAction)

    program
        .command('addpage <name>')
        .description('add new page, default, dir src/views/<name>')
        .action(addPageAction)

    program
        .command('addstore <name>')
        .description('add new store module, dir src/store/<name>.js')
        .action(addStoreAction)
}