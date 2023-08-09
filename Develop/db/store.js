const fs = require('fs');
const util = require('util');

const uuid = require('uuid/v1');
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

class Store {
  write(note) {
    return writeFileAsync('db/db.json', JSON.stringify(note));
  }
  read() {
    return readFileAsync('db/db.json', 'utf8');
  }

  getNotes() {
    return this.read().then((notes) => {
      let parsed = '';
      try {
        parsed = [].concat(JSON.parse(notes));
      } catch (err) {
        parsed = [];
      }
      return parsed;
    });
  }

  writeNotes(note) {
    const { title, text } = note;
    if (title == undefined || text == undefined) {
      throw new Error("Your note can't be blank");
    }
    const newNote = { title, text, id: uuid() };
    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  }

  deleteNotes(id) {
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filteredNotes) => this.write(filteredNotes));
  }
}

module.exports = new Store();


