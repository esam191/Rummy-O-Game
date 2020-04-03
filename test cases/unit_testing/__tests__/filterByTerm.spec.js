describe("Filter function", () => {
  test("it should filter by a search term (link)", () => {
    const input = [
      { id: 1, url: "https://www.url1.dev" },
      { id: 2, url: "https://www.url2.dev" },
      { id: 3, url: "link between data : transferable" }
    ];

    const output = [{ id: 3, url: "link between data : transferable" }];

    expect(filterByTerm(input, "link")).toEqual(output);

    expect(filterByTerm(input, "LINK")).toEqual(output);
  });

  test("it should filter by a search term (uRl)", () => {
    const input = [
      { id: 1, url: "deployment url functions" },
      { id: 2, url: "url running" },
      { id: 3, url: "https://www.link3.dev" }
    ];

    const output = [{ id: 1, url: "deployment url functions" },
            { id: 2, url: "url running" }];

    expect(filterByTerm(input,"uRl")).toEqual(output);
  });

  test("it should throw error if there is an empty search term", () => {
    const input = [];

    const output = [{ id: 1, url: "https://www.url1.dev" },
            { id: 2, url: "https://www.url2.dev" }];

    expect(filterByTerm(input,""));
  });

});

function filterByTerm(inputArr, searchTerm) {
  const regex = new RegExp(searchTerm, "i");
  return inputArr.filter(function(arrayElement) {
    return arrayElement.url.match(regex);
  });
}