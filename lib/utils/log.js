import chalk from "chalk";

export const blue = (msg) => {
    console.log(chalk.blue(msg))
}

export const green = (msg) => {
    console.log(chalk.green(msg))
}

export const error = (msg) => {
    console.log(chalk.bgRed(msg))
}