const assert = require('chai');
const render = require('../js/render.js');
const mock = require('./mock.js');

  describe("pdfjs", () => {
    mock();
    it("should make pdfjs example", async () => {
      const dom = await render('./index.html');
      dom.window.document
        .querySelector("#btn")
        .dispatchEvent(new dom.window.Event("click"));
      const pdfFile = dom.window.document.querySelector("#pdfjs");
      console.log("Contents of pdf element: ", pdfFile.innerHTML);
    });
  });