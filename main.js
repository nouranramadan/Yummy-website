let width = $("#nav").innerWidth();
var AllItems = [];





$("#nav").animate({ left: `-${width}` }, 0);
$(".nav-side").animate({ left: `-${width}` }, 0);
$(".nav-social").animate({ left: `-${width}` }, 0);



$(".open").click(function () {


    if ($("#nav").css("left") == "0px") {


        $("#nav").animate({ left: `-${width}` }, 500);
        $(".nav-side").animate({ left: `-180` }, 500);
        $(".nav-social").animate({ left: `-180` }, 500);

        $('.nav-link').animate({ paddingBottom: '80px' }, 1500);




    } else {
        $("#nav").animate({ left: 0 }, 500);
        $(".nav-side").animate({ left: 0 }, 500);
        $(".nav-social").animate({ left: 0 }, 500);

        $('.nav-link').animate({ paddingBottom: '80px' }, 1500);

        $(".open").animate({ left: `${width}` }, 500).fadeOut(100, function () {
            $("#close").animate({ left: `${width}` }, 500).fadeIn(100);


        })




    }
});


$("#close").click(function () {

    $("#nav").animate({ left: `-${width}` }, 500);
    $(".nav-side").animate({ left: `-${width}` }, 500);
    $(".nav-social").animate({ left: `-${width}` }, 500);



    $("#close").animate({ left: 0 }, 500).fadeOut(100, function () {
        $(".open").animate({ left: 0 }, 200).fadeIn(100);

    });



});

$(document).ready(function () {
    $(".loading").fadeOut(1000)
    $("body").css("overflow", "visible")

})






//home

home("beef")

async function home(x) {
    if (x) {
        $(".loading").fadeIn(1000)
        let t = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${x}`);
        let z = await t.json()
        if (z.meals) {
            displayHome(z.meals)
        }
        $(".loading").fadeOut(1000)
    }
}




function displayHome(AllItems) {

    let show = '';


    for (var i = 5; i < 20; i++) {
        show +=
            `    <div class="col-3 col-lg-3 my-3   shadow">
         <div onclick="Meals('${AllItems[i].idMeal}')" class=" shadow rounded position-relative">
             <div class="show ">
                 <img src='${AllItems[i].strMealThumb}' class="w-100 rounded" >
                 <div class="layer d-flex align-items-center ">
                     <div class="info p-2">
                         <h2>${AllItems[i].strMeal}</h2>
                     </div>
                 </div>
             </div>
         </div>
     </div>

`;

        document.getElementById('row').innerHTML = show;


    }


}

















//search




async function searchName(x) {
    if (x) {
        $(".loading").fadeIn(100)
        let t = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${x}`);
        let z = await t.json();

        displayLetter(z.meals)

        $(".loading").fadeOut(100)

    }
}

async function searchLetter(l) {
    if (l) {
        $(".loading").fadeIn(1000)
        let t = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${l}`)
        let z = await t.json()
        if (z.meals) {
            displayLetter(z.meals)
        }
        $(".loading").fadeOut(1000)
    }
}




function displayLetter(AllItems) {

    let show = '';


    for (var i = 0; i < 10; i++) {
        show +=
            `    <div class="col-3 col-lg-3 my-3   shadow">
         <div onclick="Meals('${AllItems[i].idMeal}')" class=" shadow rounded position-relative">
             <div class="show ">
                 <img src='${AllItems[i].strMealThumb}' class="w-100 rounded" >
                 <div class="layer d-flex align-items-center ">
                     <div class="info p-2">
                         <h2>${AllItems[i].strMeal}</h2>
                     </div>
                 </div>
             </div>
         </div>
     </div>

`;

        document.getElementById('row').innerHTML = show;

    }
}

async function Meals(id) {
    $(".loading").fadeIn(100)
    let t = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    t = await t.json()
    display(t.meals[0])
    $(".loading").fadeOut(500)
}



function display(details) {

    let cartoona = ``;
    let R = ""
    for (let i = 1; i <= 20; i++) {
        if (details[`strIngredient${i}`]) {
            R += `<ul class="d-flex " id="recipes"><li class="my-3 mx-1 p-1 alert-success rounded"></ul>
        ${details[`strMeasure${i}`]} 
        ${details[`strIngredient${i}`]}
        </li>`
        }
    }

    let t = details.strTags
    let tStr = ''


    for (let i = 0; i < 20; i++) {
        tStr += `<ul class="d-flex " id="tags"><li class="my-3 mx-1 p-1 alert-danger rounded">${t[i]}</li></ul>`

    }
    for (let i = 1; i < 10; i++) {
        cartoona = `<div class="col-md-4 col-lg-4 my-3 shadow">
       
            <img src='${details.strMealThumb}' class="w-100 rounded "alt=""
            srcset="" >
                   
               
                </div>
                <div class='  shadow col-md-8 myM text-white text-left'>
                <h2>Instructions</h2>
                <p>${details.strInstructions}</p>

              
        
                            <p><b class="fw-bolder">Area :</b> ${details.strArea}</p>
                            <p><b class="fw-bolder">Category :</b> ${details.strCategory}</p>
                            <h3>Recipes :</h3>
                            <ul class="d-flex " id="recipes">
                            </ul>

                            <h3 class="my-2 mx-1 p-1">Tags :</h3>
                            <ul class="d-flex " id="tags">
                            </ul>


                            <a class="btn btn-success text-white" target="_blank" href="${details.strSource}">Source</a>
                            <a class="btn  btn-danger youtube text-white" target="_blank" href="${details.strYoutube}">Youtub</a>
                        </div>`


        document.getElementById('row').innerHTML = cartoona
        document.getElementById("recipes").innerHTML = R
        document.getElementById("tags").innerHTML = t


    }
}




















//categories

async function categories(filter) {
    t = await fetch(`https://www.themealdb.com/api/json/v1/1/${filter}`);



    t = await t.json()
    return t;

}

function displayCategories() {
    let cartoona = '';


    for (var i = 0; i < 10; i++) {
        cartoona +=
            `    <div class="col-3 col-lg-3 my-3   shadow">
         <div onclick="Meals('${AllItems[i].idCategory}')" class=" shadow rounded position-relative">
             <div class="show ">
             <div onclick="categoryName('${AllItems[i].strCategory}')" class="post">

                 <img src='${AllItems[i].strCategoryThumb}' class="w-100 rounded" >
                 <div class="layer d-flex align-items-center ">
                     <div class="info p-2">
                     <h3>${AllItems[i].strCategory}</h3>
                         <span>${AllItems[i].strCategoryDescription.split(" ").slice(0, 40).join(" ")}</span>
                     </div>
                     </div>
                 </div>
             </div>
         </div>
     </div>

`;

        document.getElementById('row').innerHTML = cartoona

    }

}





async function categoryName(category) {
    $(".loading").fadeIn(100)
    let t = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    t = await t.json()
    displayLetter(t.meals)
    $(".loading").fadeOut(500)
}











//Area

function displayArea() {
    let cartoona = ""
    for (var i = 0; i < AllItems.length; i++) {
        cartoona += `
<div class="col-md-6 col-lg-3 my-3 myM  shadow">
<div class="movie shadow rounded position-relative">
    <div onclick=(Area('${AllItems[i].strArea}')) class="post ">
        <i class="fa-solid  fa-city fa-3x"></i>
        <h2 class="text-white">${AllItems[i].strArea}</h2>
    </div>
</div>
</div>`;

        document.getElementById('row').innerHTML = cartoona
    }

}



async function Area(location) {
    $(".loading").fadeIn(100)
    let t = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${location}`)
    t = await t.json();
    displayLetter(t.meals.slice(0, 10))
    $(".loading").fadeOut(500)
}












//ingrediants

let nameToached = false;

var EmailToached = false;
var PasswordToached = false;


function displayIngrediant() {

    let cartoona = ``;


    for (var i = 0; i < 10; i++) {

        cartoona +=
            `    <div class="col-3 col-lg-3 my-3   shadow">
         <div onclick="Ingredient('${AllItems[i].strIngredient}')" class=" shadow rounded position-relative">
             <div class="show text-center ">
             <i class="fa-solid fa-bowl-food fa-3x"></i>
             <div>

                 <h2 class="text-white">('${AllItems[i].strIngredient}')</h2>
                 <p class="text-white ">('${AllItems[i].strDescription.split(' ').splice(0, 20).join(' ')}')</p>
             </div>
             </div>
         </div>
     </div>

`;
        document.getElementById('row').innerHTML = cartoona;

    }


}


async function Ingredient(x) {
    $(".loading").fadeIn(100)
    let t = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${x}`)
    t = await t.json()
    displayLetter(t.meals)
    $(".loading").fadeOut(500)
}




$(".nav-item a").click(async (e) => {
    let filter = e.target.getAttribute("data-list")
    document.getElementById("search").innerHTML = ""
    document.getElementById('row').innerHTML = ""
    $("#nav").animate({ left: `-${width}` }, 500);
    $(".nav-side").animate({ left: `-${width}` }, 500);
    $(".nav-social").animate({ left: `-${width}` }, 500);



    $("#close").animate({ left: 0 }, 100).fadeOut(100, function () {
        $(".open").animate({ left: 0 }, 100).fadeIn(100);
    })

    let ret;

    if (filter == "Search") {

        document.getElementById('row').innerHTML = ""

        document.getElementById("search").innerHTML = `
        <div class="col-6">
        <input id="searchName" class="form-control" placeholder="Search by Name">
    </div>
    <div class="col-6">
        <input id="searchLetter" class="form-control"  placeholder="Search by First Letter">
    </div>`

        $("#searchName").keyup((e) => {
            searchName(e.target.value)
        })
        $("#searchLetter").keyup((e) => {
            searchLetter(e.target.value)
        })

        $('#searchLetter').on("input", function () {
            if (this.value.length > 1)
                this.value = this.value.slice(0, 1);
        });

    }
    else if (filter == "Categories") {
        document.getElementById('row').innerHTML = ""
        $(".loading").fadeIn(100)

        ret = await categories(filter + ".php")
        AllItems = ret.categories.splice(0, 20);
        displayCategories()

        $(".loading").fadeOut(500)

    } else if (filter == "Area") {
        document.getElementById('row').innerHTML = ""

        $(".loading").fadeIn(100)

        ret = await categories("list.php?a=list")
        AllItems = ret.meals.splice(0, 20);
        displayArea()
        $(".loading").fadeOut(500)
    } else if (filter == "Ingrediant") {
        document.getElementById('row').innerHTML = ""

        $(".loading").fadeIn(100)

        ret = await categories("list.php?i=list")
        AllItems = ret.meals.splice(0, 20);
        displayIngrediant();
        $(".loading").fadeOut(500)
    }

    else if (filter == "ContactUs") {
        document.getElementById('row').innerHTML = ` <div class="bookmark ">
        <h2>Contact Us</h2> 
           <input type="text" class="form-control " onkeyup="valid()" id="signupName" placeholder="Ente your Name">
           <div class="alert mt-1 alert-danger d-none" id="namealert" role="alert">
							Special Characters and Numbers not allowed
						</div>

    <input type="text" class="form-control " onkeyup="valid()" id="signupEmail" placeholder="Ente your E-mail">
    <div class="alert mt-1 alert-danger d-none" id="emailalert" role="alert">
							Enter valid email. *Ex: xxx@yyy.zzz
						</div>
    <input type="number" class="form-control "  id="signupPhone" placeholder="Ente your phone">
    <div class="alert mt-1 alert-danger d-none" id="namealert" role="alert">
11 Numbers!						</div>
    <input type="number"class="form-control " id="signupAge" placeholder="Ente your Age">
    <div class="alert mt-1 alert-danger  d-none" id="agealert" role="alert">
							Dakhal senak Bgd
						</div>


    <input type="password" class="form-control " onkeyup="valid()" id="signupPassword" placeholder=" Enter your password ">
    <p id="exist"></p>
    <div class="alert mt-1 alert-danger  d-none" id="passwordalert" role="alert">
							ekteb 8 7roof w special character w raqam
						</div>

    <div class="m-auto buttons">
        <button onclick=" submit()" class="btn btn-outline-info my-3"> Submit</button>
    </div>`;

        var signupName = document.getElementById('signupName')
        var signupEmail = document.getElementById('signupEmail')
        var signupPassword = document.getElementById('signupPassword')
        var AlertName = document.getElementById("namealert")
        var AlertEmail = document.getElementById("emailalert")
        var AlertPassword = document.getElementById("passwordalert")


   /*     
        signupName.addEventListener(focusout(function () {
            $(this).css("border-color", "green");
        }));
       
        signupEmail.addEventListener(focusin(function () {
            $(this).css("border-color", "red ");
            EmailToached = true
        }));
        signupEmail.addEventListener(focusout(function () {
            $(this).css("border-color", "green");
        }));
     
        signupPassword.addEventListener(focusin(function () {
            $(this).css("border-color", "red ");
            PasswordToached = true
        }));
        signupPassword.addEventListener(focusout(function () {
            $(this).css("border-color", "green");
        }));
      
       

*/





signupName.addEventListener("focus", () => {
    nameToached = true
})
signupEmail.addEventListener("focus", () => {
    EmailToached = true
})


signupPassword.addEventListener("focus", () => {
    PasswordToached = true
})


    }





})










//contact






var signUpArray = []
if (localStorage.getItem('users') == null) {
    signUpArray = []
} else {
    signUpArray = JSON.parse(localStorage.getItem('users'))
}




function isEmpty() {

    if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "" || signupPhone.value == "" || signupAge.value == "") {
        return false
    } else {
        return true
    }
}





function isEmailExist() {
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            return false
        }
    }
}





function submit() {
    if (isEmpty() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    var signUp = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
        phone: signupPhone.value,
        age: signupAge.value
    }
    if (signUpArray.length == 0) {
        signUpArray.push(signUp)
        localStorage.setItem('users', JSON.stringify(signUpArray))
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
        return true
    }
    if (isEmailExist() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">email already exists</span>'

    } else {
        signUpArray.push(signUp)
        localStorage.setItem('users', JSON.stringify(signUpArray))
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'

    }


}






function valid() {

    if (nameToached) {
        if (userNameValid()) {

           
            signupName.classList.add("is-valid")
            AlertName.classList.replace("d-block", "d-none")

          


        } else {
            signupName.classList.replace("is-valid", "is-invalid")
            AlertName.classList.replace("d-block", "d-none")


        }
    }

    if (EmailToached) {
        if (userEmailValid()) {

            signupEmail.classList.add("is-valid")     
                   AlertEmail.classList.replace("d-block", "d-none")




        } else {
            signupEmail.classList.replace("is-valid", "is-invalid")
            AlertEmail.classList.replace("d-block", "d-none")

        }
    }
    if (PasswordToached) {
        if (userPasswordValid()) {

            signupPassword.classList.add("is-valid")
            AlertPassword.classList.replace("d-block", "d-none")



        } else {
            signupPassword.classList.replace("is-valid", "is-invalid")
            AlertPassword.classList.replace("d-block", "d-none")

        }
    }

}











function userNameValid() {
    return /^[a-zA-Z ]+$/.test(signupName.value)
}

function userEmailValid() {
    return /^(((\.[^<>()?!#&[\]s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9])+[a-zA-Z]{2,}))$/.test(signupEmail.value)
}




function userPasswordValid() {
    return /^(?=.*[A-Za-z])[A-Za-z\d]{8,}$/.test(signupPassword.value)
}


