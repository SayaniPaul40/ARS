var openButton = document.getElementById("openButton");
var inputBoxContainer = document.getElementById("inputBoxContainer");
var saveButton = document.getElementById("saveButton");

openButton.addEventListener("click", function() {
  inputBoxContainer.style.display = "block";
});

// saveButton.addEventListener("click", function() {
//   var jobRole = document.getElementById("jobRole").value;
//   var minExp = document.getElementById("minExp").value;
//   var maxExp = document.getElementById("maxExp").value;
//   var location = document.getElementById("location").value;
//   var minCTC = document.getElementById("minCTC").value;
//   var maxCTC = document.getElementById("maxCTC").value;
//   var description = document.getElementById("description").value;

//   var csvContent = "data:text/csv;charset=utf-8," 
//     + "Job Role,Minimum Experience,Maximum Experience,Location,Minimum CTC,Maximum CTC,Description\n"
//     + `${jobRole},${minExp},${maxExp},${location},${minCTC},${maxCTC},${description}`;

//   var encodedUri = encodeURI(csvContent);
//   var link = document.createElement("a");
//   link.setAttribute("href", encodedUri);
//   link.setAttribute("download", "job_details.csv");
//   document.body.appendChild(link);
//   link.click();
// });
