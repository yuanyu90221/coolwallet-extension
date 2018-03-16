function reverse(name) {
  return name.split("").reverse().join("")
}

describe("A test for reverse functions", ()=>{
  it("reverse word", () => {
    expect("DCBA").toEqual(reverse("ABCD"));
  })
})