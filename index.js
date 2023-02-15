const { listContacts, getContactById, removeContact, addContact } = require('./modules/contacts');
const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction ({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
        const contacts = await listContacts();
		console.table(contacts)
            break;
        
    case "get":
        const contactGet = await getContactById(id);
        if (!contactGet) {
			console.log(`Contact with id ${id} not found`);
			}
			console.table(contactGet);
			break;


    case "add":
        const contactAdd = await addContact(name, email, phone);
        console.table(contactAdd)
            break;

    case "remove":
        const contactDel = await removeContact(id);
        console.table(contactDel)
            break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);






// const Calc = require('calc-js').Calc;

// console.log(process.argv);

// const [,, a,b] = process.argv

// console.log(new Calc(parseInt(a)).sum(parseInt(b)).finish())

// const path = require('path');

// console.log(path.resolve('contacts.json'))
//2//
// const path = require('path');
// const fs = require('fs');

// fs.readFile(path.resolve('./db/contacts.json'), 'utf8', (error, data) => {
//     if(error) {
//         console.error(error)
//     }
//     if (data) {
//         console.log(data)
//     }
// })

// const path = require('path');
// const fs = require('fs').promises;

// fs.readFile(path.resolve('./db/contacts.json'), 'utf8').then(data => { console.log(data) }).catch(error => {
//     console.log(error)
// })
