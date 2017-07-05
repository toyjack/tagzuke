import $ from 'jquery';
import bootstrap from 'bootstrap';
import bootstrapTable from 'bootstrap-table';
import 'jquery-csv';
import './lib/jquery.selection';
import json2csv from 'json2csv';

//ほかのラブライブに使われたjQueryのため
window.jQuery = jQuery;
window.$ = $;

$(document).ready(function () {
    if (isAPIAvailable()) {
        $('#files').bind('change', handleFileSelect);
    }

    $('#fix').click(function () {
        $('#textarea').val($('#table').bootstrapTable('getSelections')[0].KR_def)
    });
    $('#save').click(function () {
        let selectedRow = ""
        selectedRow = $('input[name="btSelectItem"]:checked').data('index')
        let newValue = $('#textarea').val()
        $('#table').bootstrapTable('updateCell', {
            index: selectedRow,
            field: 'KR_def',
            value: newValue
        })
    });

    $('#wakun').click(function () {
        $('#textarea')
            .selection('insert', {
                text: '<wakun>',
                mode: 'before'
            })
            .selection('insert', {
                text: '</wakun>',
                mode: 'after'
            });
    });
    $('#jitai').click(function () {
        $('#textarea')
            .selection('insert', {
                text: '<jitai>',
                mode: 'before'
            })
            .selection('insert', {
                text: '</jitai>',
                mode: 'after'
            });
    });
    $('#jion').click(function () {
        $('#textarea')
            .selection('insert', {
                text: '<jion>',
                mode: 'before'
            })
            .selection('insert', {
                text: '</jion>',
                mode: 'after'
            });
    });
    $('#kanbun').click(function () {
        $('#textarea')
            .selection('insert', {
                text: '<kanbun>',
                mode: 'before'
            })
            .selection('insert', {
                text: '</kanbun>',
                mode: 'after'
            });
    });

    //https://stackoverflow.com/questions/40428850/how-to-export-data-from-table-to-csv-file-using-jquery
    $('#export').click(function () {
        let titles = [];
        let data = [];

        /*
         * Get the table headers, this will be CSV headers
         * The count of headers will be CSV string separator
         */
        $('#table th').not('.bs-checkbox ').each(function () { //radioを除外する
            titles.push($(this).text());
        });

        /*
         * Get the actual data, this will contain all the data, in 1 array
         */
        $('#table td').not('.bs-checkbox ').each(function () {　 //radioを除外する
            data.push($(this).html());
        });

        /*
         * Convert our data to CSV string
         */
        let CSVString = prepCSVRow(titles, titles.length, '');
        CSVString = prepCSVRow(data, titles.length, CSVString);

        /*
         * Make CSV downloadable
         */
        let downloadLink = document.createElement("a");
        let blob = new Blob(["\ufeff", CSVString]);
        let url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = "data.csv";

        /*
         * Actually download CSV
         */
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    });

    /*
     * Convert data array to CSV string
     * @param arr {Array} - the actual data
     * @param columnCount {Number} - the amount to split the data into columns
     * @param initial {String} - initial string to append to CSV string
     * return {String} - ready CSV string
     */
    function prepCSVRow(arr, columnCount, initial) {
        let row = ''; // this will hold data
        let delimeter = ','; // data slice separator, in excel it's `;`, in usual CSv it's `,`
        let newLine = '\r\n'; // newline separator for CSV row

        /*
         * Convert [1,2,3,4] into [[1,2], [3,4]] while count is 2
         * @param _arr {Array} - the actual array to split
         * @param _count {Number} - the amount to split
         * return {Array} - splitted array
         */
        function splitArray(_arr, _count) {
            let splitted = [];
            let result = [];
            _arr.forEach(function (item, idx) {
                if ((idx + 1) % _count === 0) {
                    splitted.push(item);
                    result.push(splitted);
                    splitted = [];
                } else {
                    splitted.push(item);
                }
            });
            return result;
        }
        let plainArr = splitArray(arr, columnCount);
        // don't know how to explain this
        // you just have to like follow the code
        // and you understand, it's pretty simple
        // it converts `['a', 'b', 'c']` to `a,b,c` string
        plainArr.forEach(function (arrItem) {
            arrItem.forEach(function (item, idx) {
                row += item + ((idx + 1) === arrItem.length ? '' : delimeter);
            });
            row += newLine;
        });
        return initial + row;
    }

    
});
// from https://github.com/evanplaice/jquery-csv/blob/master/examples/file-handling.html
function isAPIAvailable() {
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.
        return true;
    } else {
        // source: File API availability - http://caniuse.com/#feat=fileapi
        // source: <output> availability - http://html5doctor.com/the-output-element/
        document.writeln('The HTML5 APIs used in this form are only available in the following browsers:<br />');
        // 6.0 File API & 13.0 <output>
        document.writeln(' - Google Chrome: 13.0 or later<br />');
        // 3.6 File API & 6.0 <output>
        document.writeln(' - Mozilla Firefox: 6.0 or later<br />');
        // 10.0 File API & 10.0 <output>
        document.writeln(' - Internet Explorer: Not supported (partial support expected in 10.0)<br />');
        // ? File API & 5.1 <output>
        document.writeln(' - Safari: Not supported<br />');
        // ? File API & 9.2 <output>
        document.writeln(' - Opera: Not supported');
        return false;
    }
}

function handleFileSelect(evt) {
    let files = evt.target.files; // FileList object
    let file = files[0];
    // read the file metadata
    let output = ''
    output += '<span style="font-weight:bold;">' + escape(file.name) + '</span><br />\n';
    output += ' - FileType: ' + (file.type || 'n/a') + '<br />\n';
    output += ' - FileSize: ' + file.size + ' bytes<br />\n';
    output += ' - LastModified: ' + (file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString() : 'n/a') +
        '<br />\n';
    // read the file contents
    printTable(file);
    // post the results
    $('#list').append(output);
}

function printTable(file) {
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function (event) {
        let csv = event.target.result;
        let data = $.csv.toArrays(csv);
        let obCSV = $.csv.toObjects(csv);
        let jsonobject = JSON.stringify(obCSV);
        // let html = '';
        // for (let row in data) {
        //     html += '<tr>\r\n';
        //     for (let item in data[row]) {
        //         html += '<td>' + data[row][item] + '</td>\r\n';
        //     }
        //     html += '</tr>\r\n';
        // }
        // $('#table').html(html);
        $('#table').bootstrapTable({
            data: obCSV,
            pagination: true,
            showPaginationSwitch: false,
            search: true,
            searchAlign: 'left',
            searchOnEnterKey: true,
            clickToSelect: true,
            singleSelect: false,
            showToggle: false,
            showColumns: true,
            toolbar: '#toolbar',
            striped: true,
            columns: [{
                    field: 'radios',
                    title: '選択',
                    radio: true
                },
                {
                    field: 'KRID',
                    title: 'ID',
                },
                {
                    field: 'KR2ID',
                    title: 'ID2'
                },
                {
                    field: 'KR_Tenri_p',
                    title: '??'
                },
                {
                    field: 'KR_vol_radical',
                    title: '所在'
                },
                {
                    field: 'KR_vol_name',
                    title: '巻'
                },
                {
                    field: 'KR_radical',
                    title: '部首'
                },
                {
                    field: 'Entry',
                    title: '見出し字'
                },
                {
                    field: 'Entry_original',
                    title: '???'
                },
                {
                    field: 'KR_def',
                    title: '注文'
                }
            ]
        });
    };

    reader.onerror = function () {
        alert('Unable to read ' + file.fileName);
    };
}

function makeCSV(obCSV) {
    let csvFields = ['KRID', 'KR2ID', 'KR_Tenri_p', 'KR_vol_radical', 'KR_vol_name', 'KR_radical', 'Entry', 'Entry_original', 'KR_def']
    let csvdata = json2csv({
        data: obCSV,
        fields: csvFields
    })
    console.log(csvdata)
}