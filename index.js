const contacts = require("./contacts.js");
const { program } = require("commander");

program
  .option("-a, --action <type>", "выберите действие")
  .option("-i, --id <type>", "идентификатор пользователя")
  .option("-n, --name <type>", "имя пользователя")
  .option("-e, --email <type>", "электронная почта пользователя")
  .option("-p, --phone <type>", "телефон пользователя");

program.parse();

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      return console.log(allContacts);
    case "get":
      const contactById = await contacts.getContactById(id);
      return console.log(contactById);
    case "add":
      const newContact = await contacts.addContact({
        name,
        email,
        phone,
      });
      return console.log(newContact);
    case "update":
      const updateContact = await contacts.updateContactById(id, {
        name,
        email,
        phone,
      });
      return console.log(updateContact);
    case "remove":
      const deleteContact = await contacts.removeContact(id);
      return console.log(deleteContact);
    default:
      console.warn("\x1B[31m Неизвестный тип действия!");
  }
};

invokeAction(argv);
