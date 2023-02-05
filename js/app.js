var currPage = 1;

function change(){
  pdfjs();
}

function pdfjs() {
  const promise = new Promise((resolve, reject) => {
    resolve('Success!');
  });
  
  promise.then((value) => {
    console.log('value: ', value);
    // Expected output: "Success!"
  });
  
  pdfjsLib.getDocument(
    'http://localhost:8080/document.pdf',
    window.document,
    window
  ).promise.then(function (data) {
          pdfDoc = data;
          pdfDoc.getPage(1).then (handlePages);
      })
      .catch((err) => {
          console.log(err.message);
      });
}
function handlePages (page) {
  const pdfLocation = document.querySelector('#pdfjs');
  // load the whole pages
  const viewport = page.getViewport({ scale: 1 });
  var canvas = document.createElement( "canvas" );
  canvas.setAttribute("class", "shadow p-1 mb-1 bg-white rounded")
  const ctx = canvas.getContext("2d");
  canvas.height = viewport.height;
  canvas.width = viewport.width;
    // Render PDF page into canvas context
    const renderCtx = {
      canvasContext: ctx,
      viewport: viewport,
    };
  page.render(renderCtx);
//Move to next page
pdfLocation.appendChild( canvas );
currPage++;
if (  pdfDoc !== null && currPage <=  pdfDoc._pdfInfo.numPages )
  {
    pdfDoc.getPage( currPage ).then( handlePages );
  }
};