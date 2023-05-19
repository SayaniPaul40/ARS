//how to run .bat file using a html button

// function exportToExcel(type, fn, dl) {
//     var elt = document.getElementById('table');    
//     console.log(typeof elt)    
//     var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });    
//     //select cloumn jd_id to keywords and  and export to excel    
//     // code for removing all rows with empty cells
    


//     var ws = wb.Sheets["sheet1"];    
//     var range = XLSX.utils.decode_range(ws['!ref']);    
//     var newRange = XLSX.utils.encode_range({ s: { r: range.s.r, c: 0 }, e: { r: range.e.r, c: 7 } });   



//     ws['!ref'] = newRange;    
//     return dl ?        
//     XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }):       
//     XLSX.writeFile(wb, fn || ('Taxonomy_Template.' + (type || 'xlsx')));
  
// }
class Job {
  constructor(jdId, jobRole, source, minExp, maxExp, priority, category, keywords) {
    this.jdId = jdId;
    this.jobRole = jobRole;
    this.source = source;
    this.minExp = minExp;
    this.maxExp = maxExp;
    this.priority = priority;
    this.category = category;
    this.keywords = keywords;
  }

  // Getters
  get JD_ID() {
    return this._JD_ID;
  }

  get jobRole() {
    return this._jobRole;
  }

  get source() {
    return this._source;
  }

  get minExp() {
    return this._minExp;
  }

  get maxExp() {
    return this._maxExp;
  }

  get priority() {
    return this._priority;
  }

  get category() {
    return this._category;
  }

  get keywords() {
    return this._keywords;
  }

  // Setters
  set JD_ID(JD_ID) {
    this._JD_ID = JD_ID;
  }

  set jobRole(jobRole) {
    this._jobRole = jobRole;
  }

  set source(source) {
    this._source = source;
  }

  set minExp(minExp) {
    if (typeof minExp !== 'number' || !Number.isInteger(minExp)) {
      throw new Error('Min_Exp must be an integer value.');
    }
    this._minExp = minExp;
  }

  set maxExp(maxExp) {
    if (typeof maxExp !== 'number' || !Number.isInteger(maxExp)) {
      throw new Error('Max_Exp must be an integer value.');
    }
    this._maxExp = maxExp;
  }

  set priority(priority) {
    this._priority = priority;
  }

  set category(category) {
    this._category = category;
  }

  set keywords(keywords) {
    this._keywords = keywords;
  }
}


const jobList = [];
// jobList.push(new Job("jd_id","job_role","b",6,9,"p","t","s"))
// console.log(jobList);


function exportToExcel(type, fn, dl) {
    var elt = document.getElementById('table');
    console.log(typeof elt);
    var wb = XLSX.utils.table_to_book(elt, { sheet: 'sheet1' });
    //select column jd_id to keywords and export to excel
    var ws = wb.Sheets['sheet1'];
    var range = XLSX.utils.decode_range(ws['!ref']);
  
    // remove empty cells
    for (var row = range.s.r; row <= range.e.r; row++) {
      for (var col = range.s.c; col <= range.e.c; col++) {
        var cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
        var cell = ws[cellAddress];
        if (cell && cell.v === '') {
          delete ws[cellAddress];
        }
      }
    }
  
    // create new range with updated cell positions
    range = XLSX.utils.decode_range(ws['!ref']);
    var newRange = XLSX.utils.encode_range(range);
  
    ws['!ref'] = newRange;
    return dl
      ? XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' })
      : XLSX.writeFile(wb, fn || 'Taxonomy_Template.' + (type || 'xlsx'));
  }




//   function exportTableToCSV(filename) {
//     let csv = [];
//     const rows = document.querySelectorAll("table tr");
  
//     // Loop through all rows
//     for (let i = 0; i < rows.length-1; i++) {
//       const row = rows[i];
//       let rowData = [];
  
//       // Loop through all columns in this row
//       for (let j = 0; j < row.cells.length-1; j++) {
//         const cell = row.cells[j];
  
//         // Replace any commas within the cell with a placeholder
//         let cellValue = cell.textContent.replace(/,/g, ",");
  
//         // If the cell is not empty, add its value to the row data
//         if (cellValue !== "") {
//           rowData.push(cellValue);
//         }
//       }
  
//       // If the row contains non-empty cells, add it to the CSV data
//       if (rowData.length > 0) {
//         csv.push(rowData.join(","));
//       }
//     }
  
//     // Create a CSV blob and initiate a download
//     const csvData = new Blob([csv.join("\n")], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     link.setAttribute("href", URL.createObjectURL(csvData));
//     link.setAttribute("download", filename);
//     link.click();
//   }

function exportTableToCSV(table) {
    var rows = table.querySelectorAll('tr');
    var csv = [];
    for (var i = 0; i < rows.length; i++) {
      var row = [], cols = rows[i].querySelectorAll('td, th');
      for (var j = 0; j < cols.length-1; j++) {


        if(cols[j].innerText != "Action"){


        var cell = cols[j].innerText;
        if (cell === null || cell === undefined || cell.trim() === '') {
          cell = '';
        }
        cell = cell.replace(/"/g, '""');
        row.push('"' + cell + '"');
    }

      }
      if (row.length > 0) {
        csv.push(row.join(','));
      }
    }
    var csvContent = csv.join('\n');
    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'taxonomy_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

$("#btnExport").click(function () {
    //  var $table = $("#table");
    // // ExportHTMLTableToExcel($table);
    // exportTableToCSV("file.csv")
    
    var table = document.getElementById('table');
    exportTableToCSV(table);


});


function isNullOrUndefinedWithEmpty(text) {
    if (text == undefined)
        return true;
    else if (text == null)
        return true;
    else if (text == null)
        return true;
    else
        false;
}



// function for updating table row
//JS for import excel into html form  
$(document).on('click', '.table tbody tr td .btn-success', function () {

    displayDialogUpdate()

    var table_id = $(this).parent().parent();




    if(table_id.find('.txtjd_id').text().trim() === "DOPSE001")
    document.getElementById("jd_id").selectedIndex = 0;
    else
    document.getElementById("jd_id").selectedIndex = 1;

   

    if(table_id.find('.txtjob_role').text() === "DevOps Engineer")
    document.getElementById("job_role").selectedIndex=0
    else
    document.getElementById("job_role").selectedIndex=1

    //document.getElementById("source").value = table_id.find('.txtsource').text();
    document.getElementById("source").value = 'UI'
    document.getElementById("min_exp").value = table_id.find('.txtmin_exp').text();
    document.getElementById("max_exp").value = table_id.find('.txtmax_exp').text();
    document.getElementById("keywords").value = table_id.find('.txtkeywords').text()

    if(table_id.find('.txtpriority').text() === "high")
    document.getElementById("priority").selectedIndex = 0
    else
    document.getElementById("priority").selectedIndex = 1

    if(table_id.find('.txtcategory').text() === "Skill")
    document.getElementById("category").selectedIndex=0
    else
    document.getElementById("category").selectedIndex=1



    // make document.getElementById("jd_id") and document.getElementById("job_role") disabled
    document.getElementById("jd_id").disabled = true;
    document.getElementById("job_role").disabled = true;
    document.getElementById("source").disabled=true


    document.getElementById("min_exp").addEventListener("input",function(){
        this.value=this.value.slice(0,2);
    })
    document.getElementById("max_exp").addEventListener("input",function(){
        this.value=this.value.slice(0,2);
    })
    

    // click event for update button
    document.getElementById("updateButton").onclick = function () {


        var html = '';
        html += '<tr>';
        html += '<td class="txtjd_id">' + document.getElementById("jd_id").value + '</td>';
        html += '<td class="txtjob_role">' + document.getElementById("job_role").value + '</td>';
       // html += '<td class="txtsource">' + document.getElementById("source").value + '</td>';// replace this with "web"---> html += '<td class="txtsource">web</td>';
        html += '<td class="txtsource">UI</td>';
        html += '<td class="txtmin_exp">' + document.getElementById("min_exp").value + '</td>';
        html += '<td class="txtmax_exp">' + document.getElementById("max_exp").value + '</td>';
        html += '<td class="txtpriority">' + document.getElementById("priority").value + '</td>';
        html += '<td class="txtcategory">' + document.getElementById("category").value + '</td>';
        html += '<td class="txtkeywords">' + document.getElementById("keywords").value + '</td>';
        html += '<td><button type="button" class="btn btn-success">Edit</button> <button class="btn btn-danger" type="button">Remove</button> </td>';
        html += '</tr>';

        // replace table row with new html
        table_id.replaceWith(html);
        dissmissDialog()
        document.getElementById("jd_id").value = ""
        document.getElementById("job_role").value = ""
        // document.getElementById("source").value = ""
        document.getElementById("min_exp").value = ""
        document.getElementById("max_exp").value = ""
        document.getElementById("priority").value = ""
        document.getElementById("category").value = ""
        document.getElementById("keywords").value = ""
        document.getElementById("jd_id").disabled = false;
        document.getElementById("job_role").disabled = false;
        document.getElementById("source").disabled=false

    }
})


// function for deleting table row
$(document).on('click', '.table tbody tr td .btn-danger', function () {
    $(this).parent().parent().remove()
})




var ExcelToJSON = function () {

    this.parseExcel = function (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var data = e.target.result;
            var workbook = XLSX.read(data, {
                type: 'binary'
            });


            text = `<tbody id="tb">
          <thead>
          <tr>
            <th scope="col">JD_ID</th>
            <th scope="col">Job Role</th>
            <th scope="col">Source</th>
            <th scope="col">Min_Exp</th>
            <th scope="col">Max_Exp</th>
            <th scope="col">Priority</th>
            <th scope="col">Category</th>
            <th scope="col">Keywords</th>
            <th scope="col">Action</th>
            <th width="50px">
              <div class="addEntryDiv">
                <button id="addEntryButton" onclick="displayDialogAdd()">
                Add
                </button>
              </div>
            </th>
          </tr>
        </thead>
          `
            workbook.SheetNames.forEach(function (sheetName) {
                var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                var json_object = JSON.stringify(XL_row_object);
                productList = JSON.parse(json_object);

                var rows = $('.table tbody tr',);
                console.log(productList)



                for (i = 0; i < productList.length; i++) {
                  var columns = Object.values(productList[i])

                  jobList.push(new Job(columns[0],columns[1],columns[2],columns[3],columns[4],columns[5],columns[6],columns[7]))
                    

                    //  text += "<tr><td class='txtjd_id'  id= '"+i+"jd_id' >"+columns[0] +"</td>"
                    // text += "<td class='txtjob_role'  id= '"+i+"job_role'>"+columns[1]+ " </td>"
                    // text += "<td class='txtsource'  id= '"+i+"source'>"+columns[2]+" </td>"
                    // text += "<td class='txtmin_exp'  id= '"+i+"min_exp'> "+columns[3] +"</td><tr>"

                    // text += "<tr><td class='txtjd_id'> " + columns[0] + "</td>"
                    // text += "<td class='txtjob_role'>" + columns[1] + "</td>"
                    // text += "<td class='txtsource'>" + columns[2] + "</td>"
                    // text += "<td class='txtmin_exp'>" + columns[3] + "</td>"
                    // text += "<td class='txtmax_exp'>" + columns[4] + "</td>"
                    // text += "<td class='txtpriority'>" + columns[5] + "</td>"
                    // text += "<td class='txtcategory'>" + columns[6] + "</td>"
                    // text += "<td class='txtkeywords'>" + columns[7] + "</td>"
                    // text += "<td><button type='button' class='btn btn-success'>Edit</button> <button class='btn btn-danger'type='button'>Remove</button> </td> </tr>"
                }
                console.log(jobList)
                jobList.forEach(function(job){
                  text += "<tr><td class='txtjd_id'> " + job.jdId + "</td>"
                    text += "<td class='txtjob_role'>" + job.jobRole + "</td>"
                    text += "<td class='txtsource'>" + job.source + "</td>"
                    text += "<td class='txtmin_exp'>" + job.minExp + "</td>"
                    text += "<td class='txtmax_exp'>" + job.maxExp + "</td>"
                    text += "<td class='txtpriority'>" + job.priority + "</td>"
                    text += "<td class='txtcategory'>" + job.category + "</td>"
                    text += "<td class='txtkeywords'>" + job.keywords + "</td>"
                    text += "<td><button type='button' class='btn btn-success'>Edit</button> <button class='btn btn-danger'type='button'>Remove</button> </td> </tr>"


                })
                // Assuming the jobList array is already defined and populated with Job objects

                // Function to update Min_Exp value based on JD_ID
                function updateMinExp(JD_ID, newMinExp) {
                  // Filter the jobList array based on JD_ID
                  const filteredJobs = jobList.filter(job => job.JD_ID === JD_ID);
                  
                  // Update Min_Exp value of filtered job objects
                  filteredJobs.map(job => job.Min_Exp = newMinExp);
                }

                // Example usage of updateMinExp function
                updateMinExp(1, 3); // Update Min_Exp to 3 for job with JD_ID = 1

                // Print the updated jobList array
                console.log(jobList);

                text += "</tbody></table></div></section>"
                document.getElementById("table").innerHTML = text;
                console.log(document.getElementById("table").rows.length)
                //make button visible
                document.getElementById("btnExport").style.visibility = "visible";
                document.getElementById("table_container").style.visibility = "visible";
                document.getElementById("file-wrapper").style.display = "none";
            })

        };
        reader.onerror = function (ex) {
            console.log(ex);
        };
        reader.readAsBinaryString(file);
    };
};


// function for adding table row
function addRow() {

    //open a pop up dialog to enter the data

    //code for getting text from input field job_id

    let jd_id = document.getElementById("jd_id").value;
    let job_role = document.getElementById("job_role").value;
    let source = document.getElementById("source").value;
    let min_exp = document.getElementById("min_exp").value;
    let max_exp = document.getElementById("max_exp").value;
    let priority = document.getElementById("priority").value;
    let category = document.getElementById("category").value;
    let keywords = document.getElementById("keywords").value;
    // var jd_id = prompt("Enter Max_Exp");
    // var job_role = prompt("Enter Priority");
    // var source = prompt("Enter Category");
    // var min_exp = prompt("Enter Keywords");

    // create a new row

    console.log(jd_id, job_role, source, min_exp);
    dissmissDialog();


    document.getElementById("min_exp").addEventListener("input",function(){
        this.value=this.value.slice(0,2);
    })
    document.getElementById("max_exp").addEventListener("input",function(){
        this.value=this.value.slice(0,2);
    })
    //jd_id for getting number of rows from document.getElementById("table").

    i = document.getElementById("table").rows.length

    text = document.getElementById("table").innerHTML
    text += "<tr><td class='txtjd_id'>" + jd_id + "</td>"
    text += "<td class='txtjob_role'>" + job_role + " </td>"
    text += "<td class='txtsource'>" + source + " </td>" // replace with web 
    text += "<td class='txtmin_exp'> " + min_exp + "</td>"
    text += "<td class='txtmax_exp'>" + max_exp + "</td>"
    text += "<td class='txtpriority'>" + priority + " </td>"
    text += "<td class='txtcategory'>" + category + " </td>"
    text += "<td class='txtkeywords'> " + keywords + "</td>"
    text += "<td><button type='button' class='btn btn-success'>Edit</button> <button class='btn btn-danger'type='button'>Remove</button> </td> <tr>"

    document.getElementById("table").innerHTML = text;
    console.log(document.getElementById("table").rows.length)

}
const searchFun = () => {
    var search = document.getElementById("myInput").value.toLowerCase();
    var table = document.getElementById("table");
    var rows = table.rows;
    for (var i = 1; i < rows.length; i++) {
        if (rows[i].cells[0].innerHTML.toLowerCase().includes(search)||rows[i].cells[1].innerHTML.toLowerCase().includes(search)
        ||rows[i].cells[2].innerHTML.toLowerCase().includes(search)||rows[i].cells[3].innerHTML.toLowerCase().includes(search)
        ||rows[i].cells[4].innerHTML.toLowerCase().includes(search)||rows[i].cells[5].innerHTML.toLowerCase().includes(search)
        ||rows[i].cells[6].innerHTML.toLowerCase().includes(search)||rows[i].cells[7].innerHTML.toLowerCase().includes(search)) {
            rows[i].style.display = "";
            console.log(rows[i].cells[0].innerHTML);
        } else {
            rows[i].style.display = "none";
            console.log(rows[i].cells[0].innerHTML);
        }
    }
}

function handleFileSelect(evt) {
    var files = evt.target.files;
    var xl2json = new ExcelToJSON();
    xl2json.parseExcel(files[0]);
}


document.getElementById('upload').addEventListener('change', handleFileSelect, false);  