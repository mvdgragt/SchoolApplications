const studentsList = document.getElementById("studentsList");
const searchBar = document.getElementById("searchBar");
let students = [];

// sort by Education
const frontend=document.querySelector("#Frontend"); 
frontend.addEventListener("click", () => {
  
  const filteredstudents = students.filter((student) => {
    return (
      student.programme==="Frontend"
    )
  })
displaystudents(filteredstudents);
});

// sort by Education
const backend=document.querySelector("#Backend"); 
backend.addEventListener("click", () => {

  const filteredstudents = students.filter((student) => {
    return (
      student.programme==="Backend"
    )
  })
displaystudents(filteredstudents);
});

// sort by Education
const dotNET=document.querySelector("#dotNET"); 
dotNET.addEventListener("click", () => {

  const filteredstudents = students.filter((student) => {
    return (
      student.programme===".NET"
    )
  })
displaystudents(filteredstudents);
});

// sort by first name
let sortFirstName = document.querySelector("#sortingFirstName");
let clicked = true;
sortFirstName.addEventListener("click", function (e) {
  if (clicked) {
    var target = e.target;
    target.classList.replace("bi-sort-alpha-up-alt", "bi-sort-alpha-down-alt");
    let firstNameAZ = students.sort(function (a, b) {
      if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) return -1;
      if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) return 1;
      return 0;
    });
    displaystudents(firstNameAZ);
    clicked = false;
  } else {
    e.target.classList.replace(
      "bi-sort-alpha-down-alt",
      "bi-sort-alpha-up-alt"
    );
    let firstNameAZ = students.sort(function (a, b) {
      if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) return -1;
      if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) return 1;
      return 0;
    });
    displaystudents(firstNameAZ);
    clicked = true;
  }
});

// sort by last name
let sortLastName = document.querySelector("#sortingLastName");
// let clicked = true;
sortLastName.addEventListener("click", function (e) {
  if (clicked) {
    var target = e.target;
    target.classList.replace("bi-sort-alpha-up-alt", "bi-sort-alpha-down-alt");
    let lastNameAZ = students.sort(function (a, b) {
      if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) return -1;
      if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) return 1;
      return 0;
    });
    displaystudents(lastNameAZ);
    clicked = false;
  } else {
    e.target.classList.replace(
      "bi-sort-alpha-down-alt",
      "bi-sort-alpha-up-alt"
    );
    let lastNameAZ = students.sort(function (a, b) {
      if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) return -1;
      if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) return 1;
      return 0;
    });
    displaystudents(lastNameAZ);
    clicked = true;
  }
});

// sort by age

let sortSA = document.querySelector("#sortingAge");
sortSA.addEventListener("click", function (e) {
  if (clicked) {
    var target = e.target;
    target.classList.replace(
      "bi-sort-numeric-down-alt",
      "bi-sort-numeric-up-alt"
    );
    let oldestStudent = students.sort((a, b) => b.age - a.age);
    displaystudents(oldestStudent);
    clicked = false;
  } else {
    e.target.classList.replace(
      "bi-sort-numeric-up-alt",
      "bi-sort-numeric-down-alt"
    );
    let oldestStudent = students.sort((a, b) => a.age - b.age);
    displaystudents(oldestStudent);
    clicked = true;
  }
});

// free search
searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredstudents = students.filter((student) => {
    return (
      student.firstName.toLowerCase() === searchString ||
      student.lastName.toLowerCase() === searchString ||
      student.programme.toLowerCase().includes(searchString) 
      //  ||student.hobbies.toLowerCase().includes(searchString)
    );
  });
  displaystudents(filteredstudents);
});

const loadstudents = async (schools) => {
  try {
    const res = await fetch("https://api.mocki.io/v2/01047e91/students");
    students = await res.json();
    students.sort(function (a, b) {
      return a.age - b.age;
    });
    displaystudents(students, schools);
    // console.log(students);
  } catch (err) {
    console.error(err);
  }
};

const loadschools = async () => {
  try {
    const res = await fetch("https://api.mocki.io/v2/01047e91/schools");
    let schools = await res.json();
    // displaySchools(schools);
    // console.log(schools);
    return schools;
  } catch (err) {
    console.error(err);
  }
};

// console.log(loadstudents);
const displaystudents = (students, schools) => {
    //kolla vilka skolor som matchar
students.forEach((student) => {
    schools.forEach((school) => {
         if (school.programmes.includes(student.programme)) {
          if (
            student.hobbies.every((elem) => school.activities.includes(elem))
          ) {
            console.log(`${student.firstName} can go to  ${school.name} which has all hobbies`)
          } 
          // else if (
          //   student.hobbies.some((elem) => school.activities.includes(elem))
          //   ) {
          //     console.log(`${student.firstName} can go to  ${school.name} which has some hobbies`)
          // }
        }
    });
  });
    // console.log(targetArray.every(function(val) { return array1.indexOf(val) >= 0; })); //true
  //sortera skolorna enligt färg/vilka som matchar bäst

  // console.log("test", schools);
  let myList = "<ul>";
  
  for (var i = 0; i < schools.length; i++) {
    
    myList += "<li>" + schools[i].name + "</li>";
    
  }
  myList += "</ul>";

  const htmlString = students
    .map((student) => {
      return `
      <div class="card">
      <div class="card__inner">
        <div class="card__face card__face--front">
          <h2>${student.firstName} ${student.lastName}</h2>
          <h3>${student.programme}</h3>
          <h4>Age: ${student.age}</h4>
          ---
          <h6>Hobbies:</h6>
          <h6>${student.hobbies}</h6>
        </div>
        <div class="card__face card__face--back">
          <div class="card__content">
            <div class="card__header">
            <h2>${student.firstName} ${student.lastName}</h2>
            </div>
            <div class="card__body">
            <h3>Age: ${student.age}</h3>
              <h3>${student.programme}</h3>
              ---
              ${myList}
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
    })
    .join("");
  studentsList.innerHTML = htmlString;

  //  make cards flip
  const cards = document.querySelectorAll(".card__inner");
  function flipCard() {
    this.classList.toggle("is-flipped");
  }
  cards.forEach((card) => card.addEventListener("click", flipCard));
};

loadschools().then((schools) => {
  loadstudents(schools);
});