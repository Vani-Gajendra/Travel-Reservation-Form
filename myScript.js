
const formList = [];
let isChecked = false;
let checkboxChecked = [];

const checkboxes = document.querySelectorAll("input[type=checkbox]");

function addForm() {

    console.log("in the function");

    //create variables to store the values from the form
    const name = document.querySelector("#full_name").value;
    const email = document.querySelector("#email").value;
    const tourPackage = document.querySelector("#tour_package").value;
    const arrivalDate = document.querySelector("#arrival_date").value;
    const paxNum = document.querySelector("#num_pax").value;
    const discount = document.querySelector("#discount").value;

    //check if any of the checkbox is checked 
    if (!isChecked) {
        //show custom built-in validation message
        document.querySelector("#c_food").setCustomValidity("Please select atleast 1");
        document.querySelector("#c_food").reportValidity();
    }
    else{
        //submit the form - add the form values to an array
        console.log("Form is submitted");
        addToList(name, email, tourPackage, arrivalDate, paxNum, checkboxChecked, discount);
    }
 
    // checkbox, Radio 
}

function addToList(name, email, tourPackage, arrivalDate, paxNum, checkBoxItems, discount) {
 
    // Just adding the list of items into the array and push the array to the formList object
    // item object that contain one set of property and value of the inputs
    const item = { 
        name: name,  //property of object: value
        email: email,
        tourPackage: tourPackage,
        arrivalDate: arrivalDate,
        paxNum: paxNum,
        experience: checkBoxItems,
        discount:discount
    }
     //push the item to FormList (array of objects)
     formList.push(item);

     //call the API that created by you in the backend to send the data back and store into the database (MySQL)

     clearForm();

     console.log(`Total Submission: ${formList.length}`, formList);
     console.log(formList[1]);
}

function clearForm() {
    document.querySelector("#full_name").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#tour_package").value = "";
    document.querySelector("#arrival_date").value = "";
    document.querySelector("#num_pax").value = "";
    document.querySelector("#discount").value = "";

    //clear the select option back to first element : "select"
    document.querySelector("#tour_package").selectedIndex = 0;

    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    document.querySelector("#radio_agree").checked = false;


}
// Validation on checkbox- User has to chech atleast 1 checkbox
//Check if any of checkboxes is being checked

checkboxes.forEach(checkbox => {

    // eventlistener
    checkbox.addEventListener("change", function() {

    
    //copy the list of checkboxes object to an array list so as to use the
    // filter and map methods to remove unchecked checkboxes and extract the 
    // checkbox values from the array.

    let checkboxChecked = Array.from(checkboxes)
        .filter(element => element.checked)
        .map(element => element.value)

        console.log(checkboxChecked);

        if (checkboxChecked.length > 0) {
            //Remove the customValidity message
            document.querySelector("#c_food").setCustomValidity("");
            document.querySelector("#c_food").reportValidity();
            isChecked = true;
        }
        else 
        {
            isChecked = false;
        }
    
})

});

    function setDateFormat(d) {
        if(d < dateFormat) {
            d = "0" + d;
        }
        return d;
    }

  


// Set the min and max date for selection of the arrival date
// limit is one month eg today's date is min 2021-08-17, max: 2021-09-16

const dateFormat = 10;
const today = new Date();
let day = today.getDate(), month = today.getMonth(), year = today.getFullYear();

let nextMonth = month + 1;

//getMonth - Jan return 0, feb return 1 ......
// format dd-mm-yyyy

day = setDateFormat(day);
month = setDateFormat(month);
year = setDateFormat(year);

console.log(day, month, year);

let todayDate = year + "-" + month + "-" + day;
let nextMonthDate = year + "-" + nextMonth + "-" + day;

console.log(todayDate, nextMonthDate);

document.querySelector("#arrival_date").setAttribute("min", todayDate);
document.querySelector("#arrival_date").setAttribute("max", nextMonthDate);