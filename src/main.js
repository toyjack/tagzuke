import $ from 'jquery';
import 'jquery-ui';
// import bootstrap from 'bootstrap';
import 'bootstrap/dist/js/bootstrap.js'
import bootstrapTable from 'bootstrap-table';
import 'jquery-csv';


//ほかのラブライブに使われたjQueryのため
window.jQuery = jQuery;
window.$ = $;

const $table = $('#table');
let tag = '';

$(document).ready(function () {
    if (isAPIAvailable()) {
        $('#files').bind('change', handleFileSelect);
    }
    $('#pageJump').click(function () {
        console.log($('#pageNumber').val())
        jumpToPage($('#pageNumber').val())
    })
    $('#save').click(function () {
        $table.bootstrapTable('togglePagination');
        let titles = [];
        let data = [];

        /*
         * Get the table headers, this will be CSV headers
         * The count of headers will be CSV string separator
         */
        $('#table th').not(':contains("Status")').each(function () { //radioを除外する
            titles.push($(this).text());
        });

        /*
         * Get the actual data, this will contain all the data, in 1 array
         */
        $('#table td').not(':contains("完成")').each(function () {　 //radioを除外する
            //$(this) :  td->span->tag
            // let __arr=[];
            if ($(this).children('span').length > 0) {
                $(this).children('span').each(function (i) {
                    let childNodes = this.childNodes;
                    $(this).replaceWith(childNodes);
                });
                let str = $(this).html();
                let reg = /、/g;
                str = str.replace(reg, '　');
                $(this).html('"' + str + '"');
            }
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

        //ページを戻す
        $table.bootstrapTable('togglePagination');
    });



    //test
    // $table.on('click-cell.bs.table',function (field, value, row, $element){
    //     console.log('field'+field, 'value:'+value, 'row:'+row)
    //     let defs=splitTag(row)
    // })

    $('#wakun').click(function () {
        tag = 'wakun'
        changeCurrentTagButton(tag)
    });
    $('#jitai').click(function () {
        tag = 'jitai'
        changeCurrentTagButton(tag)

    });
    $('#jion').click(function () {
        tag = 'jion'
        changeCurrentTagButton(tag)
    });
    $('#kanbun').click(function () {
        tag = 'kanbun'
        changeCurrentTagButton(tag)
    });
    $('#clear').click(function () {
        tag = 'clear'
        changeCurrentTagButton(tag)
    });
    $('fix').click(function (){
        changeCurrentTagButton('fix');
    })

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

function changeCurrentTagButton(tag) {
    let curBtn = $('#current-tag')
    switch (tag) {
        case 'wakun':
            curBtn.attr('class', 'btn btn-lg btn-block btn-warning').val('和訓')
            break;
        case 'jitai':
            curBtn.attr('class', 'btn btn-lg btn-block btn-success').val('字体')
            break;
        case 'jion':
            curBtn.attr('class', 'btn btn-lg btn-block btn-danger').val('字音')
            break;
        case 'kanbun':
            curBtn.attr('class', 'btn btn-lg btn-block btn-info').val('漢文')
            break;
        case 'clear':
            curBtn.attr('class', 'btn btn-lg btn-block').val('クリア')
            break;
        case 'fix':
            curBtn.attr('class', 'btn btn-lg btn-default').val('修正')
            break;
        default:
            break;
    }
}

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
    output += ' - FileType: ' + (file.type || 'n/a') + '<br />\n';
    output += ' - FileSize: ' + file.size + ' bytes<br />\n';
    output += ' - LastModified: ' + (file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString() : 'n/a') +
        '<br />\n';
    // read the file contents
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function (event) {
        let csv = event.target.result;
        let obCSV = $.csv.toObjects(csv);
        //let jsonobject = JSON.stringify(obCSV);
        printTable(obCSV);
    };

    reader.onerror = function () {
        alert('Unable to read ' + file.fileName);
    };
    // post the results
    $('#list').append(output);
}

function tagDef(text, tag) {
    text = `<b>${text}</b>`; //convert to something like html
    let clearedText = $(text).text();
    if (tag === 'clear') {
        return clearedText;
    }
    return `<${tag}>${clearedText}</${tag}>`;
}

function jumpToPage(page) {
    page = Number(page) ? Number(page) : 1;
    $table.bootstrapTable('selectPage', page);
}

function printTable(obCSV) {
    $('#table').bootstrapTable({
        data: obCSV,
        pagination: true,
        showPaginationSwitch: true,
        search: true,
        searchAlign: 'right',
        searchOnEnterKey: true,
        showToggle: false,
        showColumns: true,
        toolbar: '#toolbar',
        striped: true,
        columns: [{
                field: "Status",
                title: "Status",
                formatter: function (value, row, index) {
                    return checkStatus(value, row, index)
                }
            }, {
                field: 'KRID',
                title: 'KRID',
            },
            {
                field: 'KR2ID',
                title: 'KR2ID'
            },
            {
                field: 'KR_Tenri_p',
                title: 'KR_Tenri_p'
            },
            {
                field: 'KR_vol_radical',
                title: 'KR_vol_radical'
            },
            {
                field: 'KR_vol_name',
                title: 'KR_vol_name'
            },
            {
                field: 'KR_radical',
                title: 'KR_radical'
            },
            {
                field: 'Entry',
                title: 'Entry'
            },
            {
                field: 'Entry_original',
                title: 'Entry_original'
            },
            {
                field: 'KR_def',
                title: 'KR_def',
                formatter: function (value) {
                    return splitTag(value)
                },
                events: actionEvents
            },
            // {
            //     field: 'Mark',
            //     title: 'Mark',
            //     class: 'mark-field',
            //     editable: {
            //         type: 'text',
            //         mode: 'inline'
            //     }
            // }
        ],
        // contextMenu: '#context-menu',
        // onContextMenuItem: function (row, $el) {
        //     if ($el.data("item") == "checkAll") {
        //         // $table.bootstrapTable('checkAll');
        //         alert('check all')
        //     };
        //     if ($el.data("item") == "uncheckAll") {
        //         $table.bootstrapTable('uncheckAll');
        //     };
        //     if ($el.data("item") == "checkInvert") {
        //         $table.bootstrapTable('checkInvert');
        //     };
        //     alert('context Menu')
        //     // $info.html(JSON.stringify($table.bootstrapTable('getSelections'), null, 4));
        // }
        // onPostBody: function () {
        //     $('#table.mark-field').editableTableWidget({
        //         editor: $('<textarea>')
        //     });
        // }
    });
}

function checkStatus(value, row, index) {
    let tempDef = row.KR_def;
    if (tempDef.indexOf('<') > -1) {
        return `<span class="glyphicon glyphicon-ok">完成</span>`;
    } else {
        return `<span class="glyphicon glyphicon-remove">未完成</span>`;
    }
}

function splitTag(value) {
    let tagArr = value.split('　');
    let tagedArr = []
    tagArr.forEach(function (element) {
        element = `<span>${element}</span>`
        tagedArr.push(element)
    });
    tagedArr = tagedArr.join('、')
    return tagedArr;
}

window.actionEvents = {
    'click span': function (e, value, row, index) {
        // alert($(this).text());
        let element = $(this)
        let def = element.html() //よくわからないけど、つかえる。。。。
        let defs = row.KR_def
        defs = defs.replace(def, tagDef(def, tag))
        $('#table').bootstrapTable('updateCell', {
            index: index,
            field: 'KR_def',
            value: defs
        })
        console.log(def, defs)
        // element.replaceWith(tagDef($(this).text(), tag))
        // console.log(row)
    }
};