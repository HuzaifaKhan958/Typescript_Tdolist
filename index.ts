#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let todolist :string[]=[];

async function repeatProgram(){
    
    const response = await inquirer.prompt([{
        name:"repeat",
        type:"list",
        choices:["YES","NO"],
        message:"Do you want to continue?"
    }]);

    return response.repeat === "YES"?true: false;
}

async function ToDoList(){

    let startAgain = true;

    do{
        const answer:{option:string} = await inquirer.prompt([{
            name:"option",
            type:"list",
            choices:["Add Item","Display Item","Remove Item"],
            message:"Select an option: "
        }]);
    
        if (answer.option === "Add Item"){
            const item :{newItem:string}= await inquirer.prompt([{
                name:"newItem",
                type:"input",
                message:"Enter an item to add in the list"
            }]);
    
            todolist.push(item.newItem);
            startAgain = await repeatProgram();
        }
    
        else if(answer.option === "Display Item"){
            if (todolist.length == 0){
                console.log(chalk.red("Your list is empty"));
            }
            todolist.forEach(element => console.log(element));
            startAgain = await repeatProgram();
        }
    
        else if(answer.option === "Remove Item"){
            if (todolist.length == 0){
                console.log(chalk.red("Your list is already empty"));
            }
            else{
                const removeItem :{remove:string} = await inquirer.prompt([{
                    name:"remove",
                    type:"input",
                    message:"Please enter an item you want to remove"
                }]);
        
                let index = todolist.indexOf(removeItem.remove);
                //console.log(index);
                if (index != -1){
                    todolist.splice(index,1);
                }
            }
            startAgain = await repeatProgram();
        }
    }
    while(startAgain !== false);

    

}

ToDoList();
