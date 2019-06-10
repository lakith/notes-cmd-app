const yargs = require('yargs');
const notes = require('./notes.js')

yargs.command({
    command:'add',
    describe: 'add notes',
    builder: {
        title: {
            describe:"Note Title",
            demandOption: true,
            type:"string"
        },
        body: {
            describe: "Note Body",
            demandOption: true,
            type: "string"
        }
    },
    handler: (argv) => {
        notes.addnotes(argv.title,argv.body);
    }
})

yargs.command({
    command:'read',
    describe: 'read notes',
    handler: () => {
        const data = notes.getNotes();
        console.log(data);
    }
})

yargs.command({
    command:"remove",
    describe: "remoce content",
    builder: {
        title: {
            describe:"Note Title",
            demandOption: true,
            type:"string"
        }
    },
    handler: (argv) => {
        notes.removeNotes(argv.title);
    }
})

yargs.command({
    command:"list",
    describe:"List your notes",
    handler: () => {
        notes.listNotes();
    }
    
})

yargs.argv;