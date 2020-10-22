import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudents.js';
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var btnfilterByCredits = document.getElementById("button-filterByCredits");
var inputSearchBox = document.getElementById("search-box");
var inputrangoMenor = document.getElementById("rangoMenor");
var inputrangoMayor = document.getElementById("rangoMayor");
var totalCreditElm = document.getElementById("total-credits");
var studetsTbody = document.getElementById('lo');
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredits.onclick = function () { return applyFilterByCredits(); };
renderCoursesInTable(dataCourses);
renderStudentsInTable(dataStudent);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentsInTable(students) {
    console.log('Desplegando datos del estudiante');
    students.forEach(function (Student) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + Student.nombre + "</td>\n                           <td>" + Student.dato + "</td>";
        studetsTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByCredits() {
    var mayor = inputrangoMayor.value;
    var menor = inputrangoMenor.value;
    mayor = (mayor == null) ? '' : mayor;
    menor = (menor == null) ? '' : menor;
    if (mayor == '' || menor == '') {
        clearCoursesInTable();
        renderCoursesInTable(dataCourses);
    }
    else {
        var intmayor = parseInt(mayor);
        var intmenor = parseInt(menor);
        clearCoursesInTable();
        var margenes = margen(intmayor, intmenor, dataCourses);
        renderCoursesInTable(margenes);
    }
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function margen(mayor, menor, courses) {
    return courses.filter(function (piruca) {
        return piruca.credits <= mayor && piruca.credits >= menor;
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
