// Select modal
var mpopup = document.getElementById('mpopupBox');

// Select trigger link
var mpLink = document.getElementById("mpopupLink");

// Select close action element
var close = document.getElementsByClassName("close")[0];

// Open modal once the link is clicked
mpLink.onclick = function() {
    mpopup.style.display = "block";
};


function displayDialogAdd() {
    mpopup.style.display = "inline-block";
    document.getElementById("updateButton").style.visibility = "hidden";
    document.getElementById("addButton").style.visibility = "visible";
};

function displayDialogUpdate() {
    mpopup.style.display = "inline-block";
    document.getElementById("updateButton").style.visibility = "visible";
    document.getElementById("addButton").style.visibility = "hidden";
};


// Close modal once close element is clicked
function dissmissDialog() {
    mpopup.style.display = "none";
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
};

// Close modal when user clicks outside of the modal box
window.onclick = function(event) {
    if (event.target == mpopup) {
        mpopup.style.display = "none";
    }
};