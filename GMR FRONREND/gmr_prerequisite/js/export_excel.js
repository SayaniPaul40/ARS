
function ExportHTMLTableToExcel($table) {
    var tab_text = ""
    var final_text = "";
    var filename = $table.attr('export-excel-filename'); // attribute to be 
    // applied on Table tag
    filename = isNullOrUndefinedWithEmpty(filename) ? "Excel Document" : filename;
    var index = $table.find("tbody tr").length;
    var index_t = 4;
    if (Number(index) > 0) {
        $.each($table, function (index, item) {
            var element = $(item);
            var headertext = $("#" + element[0].id).closest
                (":has(label.HeaderLabel)").find('label').text().trim();
            if (headertext == "") {
                tab_text = "<table><tr>";
            }
            else {
                tab_text = "<table><tr> " + headertext + "</tr><tr>";
            }

            // Create column header
            element.find("thead tr th").each(function () {
                if (!$(this).hasClass("NoExport"))
                    tab_text = tab_text + "<td bgcolor='#87AFC6'>" +
                        $(this)[0].innerHTML + "</td>";
            });

            //Close column header
            tab_text = tab_text + "</tr>";

            // Create body column
            element.find(" tbody tr").each(function () {
                tab_text = tab_text + "<tr>";
                $(this).find("td").each(function () {
                    if ($(this).hasClass("ExportLabelTD")) {
                        var value = $(this).html();
                        tab_text = tab_text + "<th>" + value + "</th>";
                    }
                    else {
                        $(this).find("input,select").each(function () {
                            var value = "";

                            if ($(this).prop("type") == 'select-one') {
                                value = $('option:selected', this).text();
                            } else {
                                value = $(this).val();
                            }

                            if (!$(this).closest("td").hasClass("NoExport") &&
                                !$(this).hasClass("NoExport")) { // NoExport is used for TD 
                                // or tan input tag that not needs to be exported
                                tab_text = tab_text + "<th>" + value + "</th>";
                            }
                        });
                    }
                });
                tab_text = tab_text + "</tr>";
            });
            // Create colum footer
            element.find("tfoot tr td").each(function () {
                var colspan = $(this).attr("colspan");
                var rowspan = $(this).attr("rowspan");

                colspan = colspan == undefined ? 1 : colspan;
                rowspan = rowspan == undefined ? 1 : rowspan;

                if ($(this).hasClass("NoExport")) {
                    tab_text = tab_text + "";
                }
                else if ($(this).hasClass("ExportValueTD")) // Footer class that needs 
                // to be no td that have input tags
                {
                    $(this).find("input,select").each(function () {
                        var value = "";

                        if ($(this).prop("type") == 'select-one') {
                            value = $('option:selected', this).text();
                        } else {
                            value = $(this).val();
                        }

                        if (!$(this).closest("td").hasClass("NoExport") &&
                            !$(this).hasClass("NoExport")) {
                            tab_text = tab_text + "<td colspan=" + colspan + "rowspan=" + rowspan + ">" + value + "</th>";
                        }
                    });
                }
                else
                    tab_text = tab_text + "<td colspan=" + colspan + "rowspan=" + rowspan + ">" + $(this).html() + "</td>";
            });

            tab_text = tab_text + "<tr></tr></table>";

            if (index == 0) {
                final_text = tab_text;
            }
            else {
                final_text = final_text + tab_text;
            }
        });

        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
        
        if (msie > 0 || !!navigator.userAgent.match
            (/Trident.*rv\:11\./))      // If Internet Explorer
        {
            
            txtArea1 = window.open();
            txtArea1.document.open("txt/html", "replace");
            txtArea1.document.write(final_text);
            txtArea1.document.close();
            txtArea1.focus();
            sa = txtArea1.document.execCommand("SaveAs", true, filename + ".XLSX");
            return (sa);
        }
        else                 //other browser not tested on IE 11
        {
            //sa = window.open('data:application/vnd.ms-excel,' + 
            //         encodeURIComponent(final_text));
            var anchor = document.createElement('a');
            anchor.setAttribute('href', 'data:application/vnd.ms-excel,' +
                encodeURIComponent(final_text));
            anchor.setAttribute('download', filename);
            anchor.style.display = 'none';
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
        }
    }

    // export in a folder 




}