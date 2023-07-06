var allData;    //stores all data

// submit data on submit
function submitData(){
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var mobile = document.getElementById('mobile').value;
    var radio = document.getElementsByName('gender');
    var city = document.getElementById('city').value;
    var checkbox = document.getElementsByName('hobby');

    var gender,hobby = [];

    for (i = 0; i < radio.length; i++) {
        if (radio[i].checked){
            gender = radio[i].value;
        }
    }

    for (i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked){
            hobby = [...hobby,checkbox[i].value];
        }
    }

    if(name != '' && name.match(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/) && email != '' && email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/) && password != '' && password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,12}$/) && mobile != '' && mobile.match(/^[0-9]{10}$/) && gender && city != ''){

        if(localStorage.getItem('data') == null){
            allData = [];
        }
        else{
            allData = JSON.parse(localStorage.getItem('data'));
        }

        allData.push({
            name: name,
            email: email,
            password: password,
            mobile: mobile,
            gender: gender,
            city: city,
            hobby: hobby
        });

        localStorage.setItem('data', JSON.stringify(allData));

        resetData();
    }
    else{
        validateData();
    }

    printData();
}

// for validation of fields
function validateData(){

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var mobile = document.getElementById('mobile').value;
    var radio = document.getElementsByName('gender');
    var city = document.getElementById('city').value;

    var gender;

    for (i = 0; i < radio.length; i++) {
        if (radio[i].checked){
            gender = radio[i].value;
        }
    }

    // name validation
    if(name==''){
        document.getElementById('namepop').innerHTML = 'Name is Empty';
        document.getElementById('namepop').style.opacity = '1';
    }
    else if(!name.match(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/)){
        document.getElementById('namepop').innerHTML = 'Only Alphabets';
        document.getElementById('namepop').style.opacity = '1';
    }
    else{
        document.getElementById('namepop').style.opacity = '0';
    }

    // email validation
    if(email==''){
        document.getElementById('emailpop').innerHTML = 'Email is Empty';
        document.getElementById('emailpop').style.opacity = '1';
    }
    else if(!email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)){
        document.getElementById('emailpop').innerHTML = 'Include @, .';
        document.getElementById('emailpop').style.opacity = '1';
    }
    else{
        document.getElementById('emailpop').style.opacity = '0';
    }

    // password validation
    if(password==''){
        document.getElementById('passwordpop').innerHTML = 'Password is Empty';
        document.getElementById('passwordpop').style.opacity = '1';
    }
    else if(!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,12}$/)){
        document.getElementById('passwordpop').innerHTML = 'Minimum 8 Char, A, a, 0, @, #, !';
        document.getElementById('passwordpop').style.opacity = '1';
    }
    else{
        document.getElementById('passwordpop').style.opacity = '0';
    }

    // mobile validation
    if(mobile==''){
        document.getElementById('mobilepop').innerHTML = 'Mobile is Empty';
        document.getElementById('mobilepop').style.opacity = '1';
    }
    else if(!mobile.match(/^[0-9]{10}$/)){
        document.getElementById('mobilepop').innerHTML = 'Include Only 10 Digits';
        document.getElementById('mobilepop').style.opacity = '1';
    }
    else{
        document.getElementById('mobilepop').style.opacity = '0';
    }

    // gender validation
    if(!gender){
        document.getElementById('genderpop').style.opacity = '1';
    }
    else{
        document.getElementById('genderpop').style.opacity = '0';
    }

    // city validation
    if(city==''){
        document.getElementById('citypop').style.opacity = '1';
    }
    else{
        document.getElementById('citypop').style.opacity = '0';
    }
}

// prints data in console & table
function printData(){

    if(localStorage.getItem('data') == null){
        allData = [];
    }
    else{
        allData = JSON.parse(localStorage.getItem('data'));
    }

    console.log(allData);

    var addrow = ``;

    allData.forEach(function (data, index){
        addrow += `<tr>`;
        addrow += `<td>${index+1}</td>`;
        addrow += `<td>${data.name}</td>`;
        addrow += `<td>${data.email}</td>`;
        addrow += `<td>${data.password}</td>`;
        addrow += `<td>${data.mobile}</td>`;
        addrow += `<td>${data.gender}</td>`;
        addrow += `<td>${data.city}</td>`;
        addrow += `<td>${data.hobby}</td>`;
        addrow += `<td><button class=updatebtn onclick=updateData(${index})>UPDATE<button/></td>`;
        addrow += `<td><button class=deletebtn onclick=deleteData(${index})>DELETE<button/></td>`;
        addrow += `</tr>`;
    });

    document.getElementById('tablebody').innerHTML = addrow;
}

// reset filled data on reset
function resetData(){
    var gender = document.getElementsByName('gender');
    var city = document.getElementById('city').options;
    var citybtn = document.getElementById('citybtn');
    var checkbox = document.getElementsByName('hobby');
    var valpops = document.getElementsByClassName('valpops');
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('mobile').value = '';

    for(var i=0; i<gender.length; i++){
        gender[i].checked = false;
    }
    
    for(var i = 0; i < city.length; i++){
        city[i].selected = false;
        citybtn.disabled = false;
    }
    citybtn.disabled = true;

    for(var i=0; i<checkbox.length; i++){
        checkbox[i].checked = false;
    }

    for(var i=0; i<valpops.length; i++){
        valpops[i].style.opacity = 0;
    }

}

// delete selected printed data
function deleteData(index){
    if(localStorage.getItem('data') == null){
        allData = [];
    }
    else{
        allData = JSON.parse(localStorage.getItem('data'));
    }

    allData.splice(index,1);
    localStorage.setItem("data",JSON.stringify(allData));
    
    printData();
}

// update selected printed data
function updateData(index){

    // hides submit and shows update button in form
    document.getElementById('submit').style.display = 'none';
    document.getElementById('update').style.display = 'block';

    if(localStorage.getItem('data') == null){
        allData = [];
    }
    else{
        allData = JSON.parse(localStorage.getItem('data'));
    }

    document.getElementById('name').value = allData[index].name;
    document.getElementById('email').value = allData[index].email;
    document.getElementById('password').value= allData[index].password;
    document.getElementById('mobile').value = allData[index].mobile;
    document.getElementById('city').value = allData[index].city;

    var radio = document.getElementsByName('gender');
    var checkbox = document.getElementsByName('hobby');
    var hobby = [];

    for(var i=0; i<radio.length; i++){
        if (allData[index].gender == radio[i].value){
            radio[i].checked = true;
        }
    }

    ['cricket','music','movies'].forEach((elm)=>{
        if(allData[index].hobby.some((item)=> item === document.getElementById(elm).value)){
            document.getElementById(elm).checked = true;
        }
        else{
            document.getElementById(elm).checked = false;
        }
    })

    // for onclick on changed update button in form 
    document.querySelector('#update').onclick = function(){

        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var mobile = document.getElementById('mobile').value;

        if(name != '' && name.match(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/) && email != '' && email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/) && password != '' && password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,12}$/) && mobile != '' && mobile.match(/^[0-9]{10}$/)){
            allData[index].name = document.getElementById('name').value;
            allData[index].email = document.getElementById('email').value
            allData[index].password = document.getElementById('password').value;
            allData[index].mobile = document.getElementById('mobile').value;
            allData[index].city = document.getElementById('city').value;

            for (i = 0; i < radio.length; i++) {
                if (radio[i].checked){
                    allData[index].gender = radio[i].value;
                }
            }

            for (i = 0; i < checkbox.length; i++) {
                if (checkbox[i].checked){
                    hobby = [...hobby,checkbox[i].value];
                    allData[index].hobby = hobby;
                }
            }

            localStorage.setItem('data', JSON.stringify(allData));

            // hides update and shows submit button in form
            document.getElementById('submit').style.display = 'block';
            document.getElementById('update').style.display = 'none';
            
            resetData();
        }
        else{
           validateData();
        }

        printData();
    }
}

// clears all the data in localstorage
function clearData(){
    localStorage.clear();
    resetData();
    printData();
}

printData();