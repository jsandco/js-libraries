

const _createClass = (function () { function defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }());

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

const XlsExport = (function () {
  // data: array of objects with the data for each row of the table
  // name: title for the worksheet
  function XlsExport(data) {
    const title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Worksheet';

    _classCallCheck(this, XlsExport);

    // input validation: new xlsExport([], String)
    if (!Array.isArray(data) || typeof title !== 'string' || Object.prototype.toString.call(title) !== '[object String]') {
      throw new Error('Invalid input types: new xlsExport(Array [], String)');
    }

    this._data = data;
    this._title = title;
  }

  _createClass(XlsExport, [{
    key: 'exportToXLS',
    value: function exportToXLS() {
      const fileName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'export.xls';

      if (typeof fileName !== 'string' || Object.prototype.toString.call(fileName) !== '[object String]') {
        throw new Error('Invalid input type: exportToCSV(String)');
      }

      const TEMPLATE_XLS = '\n        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">\n        <meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"/>\n        <head><!--[if gte mso 9]><xml>\n        <x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{title}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml>\n        <![endif]--></head>\n        <body>{table}</body></html>';
      const MIME_XLS = 'data:application/vnd.ms-excel;base64,';

      const parameters = { title: this._title, table: this.objectToTable() };
      const computeOutput = TEMPLATE_XLS.replace(/{(\w+)}/g, function (x, y) {
        return parameters[y];
      });

      this.downloadFile(MIME_XLS + this.toBase64(computeOutput), fileName);
    },
  }, {
    key: 'exportToCSV',
    value: function exportToCSV() {
      const fileName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'export.csv';

      if (typeof fileName !== 'string' || Object.prototype.toString.call(fileName) !== '[object String]') {
        throw new Error('Invalid input type: exportToCSV(String)');
      }

      const MIME_CSV = 'data:attachament/csv,';
      this.downloadFile(MIME_CSV + encodeURIComponent(this.objectToSemicolons()), fileName);
    },
  }, {
    key: 'downloadFile',
    value: function downloadFile(output, fileName) {
      const link = document.createElement('a');
      document.body.appendChild(link);
      link.download = fileName;
      link.href = output;
      link.click();
    },
  }, {
    key: 'toBase64',
    value: function toBase64(string) {
      return window.btoa(unescape(encodeURIComponent(string)));
    },
  }, {
    key: 'objectToTable',
    value: function objectToTable() {
      // extract keys from the first object, will be the title for each column
      const colsHead = `<tr>${Object.keys(this._data[0]).map(function (key) {
        return `<td>${  key}</td>`;
      }).join('')}</tr>`;

      const colsData = this._data.map(function (obj) {
        return [`<tr>\n                ${Object.keys(obj).map(function (col) {
          return `<td>${  obj[col] ? obj[col] : ''}</td>`;
        }).join('')}\n            </tr>`];
      }) // 'null' values not showed
        .join('');

      return (`<table>${colsHead}${colsData}</table>`).trim(); // remove spaces...
    },
  }, {
    key: 'objectToSemicolons',
    value: function objectToSemicolons() {
      const colsHead = Object.keys(this._data[0]).map(function (key) {
        return [key];
      }).join(';');
      const colsData = this._data.map(function (obj) {
        return [// obj === row
          Object.keys(obj).map(function (col) {
            return [obj[col]];
          }, // row[column]
          ).join(';')];
      }, // join the row with ';'
      ).join('\n'); // end of row

      return `${colsHead}\n${colsData}`;
    },
  }, {
    key: 'setData',
    set: function set(data) {
      if (!Array.isArray(data)) throw new Error('Invalid input type: setData(Array [])');

      this._data = data;
    },
  }, {
    key: 'getData',
    get: function get() {
      return this._data;
    },
  }]);

  return XlsExport;
}());

export default XlsExport; // comment this line to babelize
