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
let data = [
  [
      "Tiger Nixon",
      "System Architect",
      "Edinburgh",
      "5421",
      "2011/04/25",
      "$3,120"
  ],
  [
      "Garrett Winters",
      "Director",
      "Edinburgh",
      "8422",
      "2011/07/25",
      "$5,300"
  ],
  [
      "Garrett Winters",
      "Director",
      "Edinburgh",
      "8422",
      "2011/07/25",
      "$5,300"
  ],
  [
      "Garrett Winters",
      "Director",
      "Edinburgh",
      "8422",
      "2011/07/25",
      "$5,300"
  ],
  [
      "Garrett Winters",
      "Director",
      "Edinburgh",
      "8422",
      "2011/07/25",
      "$5,300"
  ],
  [
      "Garrett Winters",
      "Director",
      "Edinburgh",
      "8422",
      "2011/07/25",
      "$5,300"
  ],
  [
      "Garrett Winters",
      "Director",
      "Edinburgh",
      "8422",
      "2011/07/25",
      "$5,300"
  ],
  [
      "Garrett Winters",
      "Director",
      "Edinburgh",
      "8422",
      "2011/07/25",
      "$5,300"
  ],
  [
      "Garrett Winters",
      "Director",
      "Edinburgh",
      "8422",
      "2011/07/25",
      "$5,300"
  ],
  [
      "Garrett Winters",
      "Director",
      "Edinburgh",
      "8422",
      "2011/07/25",
      "$5,300"
  ],
  [
      "Garrett Winters",
      "Director",
      "Edinburgh",
      "8422",
      "2011/07/25",
      "$5,300"
  ],
  [
      "Garrett Winters",
      "Director",
      "Edinburgh",
      "8422",
      "2011/07/25",
      "$5,300"
  ],
  [
      "Garrett Winters",
      "Director",
      "Edinburgh",
      "8422",
      "2011/07/25",
      "$5,300"
  ],
  [
      "Garrett Winters",
      "Director",
      "Edinburgh",
      "8422",
      "2011/07/25",
      "$5,300"
  ],
  [
      "Garrett Winters",
      "Director",
      "Edinburgh",
      "8422",
      "2011/07/25",
      "$5,300"
  ],
  [
      "Garrett Winters",
      "Director",
      "Edinburgh",
      "8422",
      "2011/07/25",
      "$5,300"
  ],
  [
      "Garrett Winters",
      "Director",
      "Edinburgh",
      "8422",
      "2011/07/25",
      "$5,300"
  ],
  [
      "Garrett Winters",
      "Director",
      "Edinburgh",
      "8422",
      "2011/07/25",
      "$5,300"
  ],
  [
      "Garrett Winters",
      "Director",
      "Edinburgh",
      "8422",
      "2011/07/25",
      "$5,300"
  ],
  [
      "Garrett Winters",
      "Director",
      "Edinburgh",
      "8422",
      "2011/07/25",
      "$5,300"
  ],
  [
      "Garrett Winters",
      "Director",
      "Edinburgh",
      "8422",
      "2011/07/25",
      "$5,300"
  ],
  [
      "Garrett Winters",
      "Director",
      "Edinburgh",
      "8422",
      "2011/07/25",
      "$5,300"
  ]
]
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