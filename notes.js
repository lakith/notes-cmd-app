const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => {
    const data = loadNotes();
    return data;
}

const addNotes = (title,body) => {
    const notes = loadNotes();
    
    const duplicates = notes.filter((note)=>{
        return note.title === title;
    });

    if(duplicates.length === 0){
        notes.push({
            title:title,
            body:body
        });
        saveNotes(notes);
        console.log(chalk.green("Notes Title Added"));
    } else {
        console.log(chalk.red("Notes Title Taken"));
    }


}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.blue("\n\n\t\tPrinting your notes-2\n"))
    notes.forEach((note)=>{
        console.log(note);
    })
    console.log("\n\n")
}

const saveNotes = (notes) => {
    const data = JSON.stringify(notes);
    fs.writeFileSync('notes.json',data);
}

const loadNotes = () => {
    try{
      const dataBuffer = fs.readFileSync("notes.json");
      const dataJson = dataBuffer.toString();
      return JSON.parse(dataJson);  
    } catch (e) {
        return [];
    }
}

const removeNotes = (title) => {
        const notes = loadNotes();
        let index = null;
        notes.forEach((element,i) => {
            if(element.title.localeCompare(title) === 0){
                index = i;
            }
        });
        if(index !== null && index >= 0) 
        {
            notes.splice(index,1);
            saveNotes(notes);
            console.log(chalk.blue("Note removed successfully.."));
        } else {
            console.log(chalk.red("No Note Found.."));
        }
        
}

module.exports = {
    addnotes : addNotes,
    getNotes : getNotes,
    removeNotes : removeNotes,
    listNotes:listNotes
}