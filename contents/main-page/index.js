const fs = require('fs');
const path = require('path');
const $ = require( 'jquery' );
require( 'jszip' );
require( 'pdfmake' );
require( 'datatables.net-zf' )(window, $);
require( 'datatables.net-autofill-zf' )(window, $);
require( 'datatables.net-buttons-zf' )(window, $);
require( 'datatables.net-buttons/js/buttons.colVis.js' )(window, $);
require( 'datatables.net-buttons/js/buttons.flash.js' )(window, $);
require( 'datatables.net-buttons/js/buttons.html5.js' )(window, $);
require( 'datatables.net-buttons/js/buttons.print.js' )(window, $);
require( 'datatables.net-colreorder-zf' )(window, $);
require( 'datatables.net-fixedcolumns-zf' )(window, $);
require( 'datatables.net-fixedheader-zf' )(window, $);
require( 'datatables.net-keytable-zf' )(window, $);
require( 'datatables.net-responsive-zf' )(window, $);
require( 'datatables.net-rowgroup-zf' )(window, $);
require( 'datatables.net-rowreorder-zf' )(window, $);
require( 'datatables.net-scroller-zf' )(window, $);
require( 'datatables.net-select-zf' )(window, $);


let rawdata = fs.readFileSync(path.join(__dirname, 'data.json'));
let data = JSON.parse(rawdata);
console.log(data);
$(document).ready( function () {
  $('#employee').DataTable({
    data: data,
    "bProcessing" : true,
    "bDestroy" : true,
    "bAutoWidth" : true,
    "sScrollY" : "500px",
    "bScrollCollapse" : true,
    "bSort" : true,
    "sPaginationType" : "full_numbers",
  });
} );