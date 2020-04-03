const filterByTerm = require("../src/filterByTerm");


function filterByTerm(inputArr, searchTerm) {
  if (!searchTerm) throw Error("searchTerm cannot be empty");
  if (!inputArr.length) throw Error("inputArr cannot be empty"); // new line
  const regex = new RegExp(searchTerm, "i");
  return inputArr.filter(function(arrayElement) {
    return arrayElement.game.match(regex);
  });
}

module.exports = filterByTerm;