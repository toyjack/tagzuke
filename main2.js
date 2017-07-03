import $ from 'jquery';
import bootstrap from 'bootstrap';
import bootstrapTable from 'bootstrap-table';
import 'jquery-csv';
import './lib/jquery.selection';
import json2csv from 'json2csv';

//ほかのラブライブに使われたjQueryのため
window.jQuery = jQuery;
window.$ = $;

let mainData="";

$(document).ready(function (){
    if (isAPIAvailable()) {
        $('#files').bind('change', handleFileSelect);
    }
})


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
        let obCSV = $.csv.toObjects(csv);
        let jsonobject = JSON.stringify(obCSV);
        mainData= jsonobject;
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