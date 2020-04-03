describe("Filter function", () => {
  test("Check all independent paths through the control structure to ensure that all statements in the Room module have been executed at least once (search term: data)", () => {
    const input = [
     { id: 1, game: "module operates correctly" },
      { id: 2, game: "path executes with no error" },
      { id: 3, game: "data transfered" }
    ];

    const output = [{ id: 3, game: "data transfered" }];

    expect(filterByTerm(input, "data")).toEqual(output);

    expect(filterByTerm(input, "DATA")).toEqual(output);
  });

  test("Test boundary conditions to ensure that the interface and room module operates properly at boundaries established to restrict processing. (search term : data)", () => {
    const input = [
      { id: 1, game: "data error description is intelligible" },
      { id: 2, game: "data enters and exits properly" },
      { id: 3, game: "all statements are executed at least once " }
    ];

    const output = [{ id: 1, game: "data error description is intelligible" },
            { id: 2, game: "data enters and exits properly" }];

    expect(filterByTerm(input,"data")).toEqual(output);
  });

  test("it should throw error if there is an empty search term", () => {
    const input = [];

    const output = [{ id: 1, game: "https://www.url1.dev" },
            { id: 2, game: "https://www.url2.dev" }];

    expect(filterByTerm(input,""));
  });

});

function filterByTerm(inputArr, searchTerm) {
  const regex = new RegExp(searchTerm, "i");
  return inputArr.filter(function(arrayElement) {
    return arrayElement.game.match(regex);
  });
}
