var siteNameInput = document.getElementById("siteNameInput")
var siteUrlInput = document.getElementById("siteUrlInput")
var addBtn = document.getElementById("addBtn")

var sites_arr = []

if (localStorage.getItem("sites_arr") != null) {
  sites_arr = JSON.parse(localStorage.getItem("sites_arr"))
  displaySites()
}

//////////////////////////////////////Add Sites//////////////////////////////////////////

function addSite() {

  if ((validateSiteName(siteNameInput.value) && validateSiteUrl(siteUrlInput.value))) {
    var sites = {
      name: siteNameInput.value,
      Url: siteUrlInput.value
    }

    sites_arr.push(sites)

    displaySites()
    cleanForm()

    localStorage.setItem("sites_arr", JSON.stringify(sites_arr))
    
  }

}

//////////////////////////////////////////Display Sites/////////////////////////////////////

function displaySites() {
  var trs = ""

  for (var i = 0; i < sites_arr.length; i++) {
    trs += ` <tr>
        <td>${i + 1}</td>
        <td>${sites_arr[i].name}</td>
        <td>
          <button onclick="visitSite(${i})" class="btn btn-success"><i class="fa-solid fa-eye"></i> Visit</button>
        </td>
        <td>
          <button onclick="deleteSite(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button>
        </td>
      </tr>`
  }
  document.getElementById("tBody").innerHTML = trs
}

//////////////////////////////////////////clean form/////////////////////////////////////

function cleanForm() {
  siteNameInput.value = ""
  siteUrlInput.value = ""
}

//////////////////////////////////////////Delete Sites///////////////////////////////////

function deleteSite(index) {
  sites_arr.splice(index, 1)
  displaySites()
  localStorage.setItem("sites_arr", JSON.stringify(sites_arr))
}

//////////////////////////////////////////Visit Sites////////////////////////////////////

function visitSite(index) {
  open(`${sites_arr[index].Url}`)
}

//////////////////////////////////////////Validation Sites////////////////////////////////////

function validateSiteName(siteName) {
  var siteNameRegex = /^\w{3,}(\s+\w+)*$/;
  return siteNameRegex.test(siteName)
}
function validateSiteUrl(siteName) {
  var siteUrlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
  return siteUrlRegex.test(siteName)

}