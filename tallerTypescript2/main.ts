import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import { Student } from './student.js';

import { dataStudent } from './dataStudents.js';


let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement>document.getElementById("search-box")!;
const inputrangoMenor: HTMLInputElement = <HTMLInputElement>document.getElementById("rangoMenor")!;
const inputrangoMayor: HTMLInputElement = <HTMLInputElement>document.getElementById("rangoMayor")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;
let studetsTbody: HTMLElement = document.getElementById('lo')!;

btnfilterByName.onclick = () => applyFilterByName();

btnfilterByCredits.onclick = () => applyFilterByCredits();

renderCoursesInTable(dataCourses);

renderStudentsInTable(dataStudent);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`




function renderCoursesInTable(courses: Course[]): void {
    console.log('Desplegando cursos');
    courses.forEach((course) => {
        let trElement = document.createElement("tr");
        trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
        coursesTbody.appendChild(trElement);
    });
}

function renderStudentsInTable(students: Student[]): void {
    console.log('Desplegando datos del estudiante');
    students.forEach((Student) => {
        let trElement = document.createElement("tr");
        trElement.innerHTML = `<td>${Student.nombre}</td>
                           <td>${Student.dato}</td>`;
        studetsTbody.appendChild(trElement);
    });
}


function applyFilterByName() {
    let text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}

function applyFilterByCredits() {
    let mayor = inputrangoMayor.value;
    let menor = inputrangoMenor.value;
    mayor = (mayor == null) ? '' : mayor;
    menor = (menor == null) ? '' : menor;
    if (mayor == '' || menor == '') { 
        clearCoursesInTable();
        renderCoursesInTable(dataCourses); 
    }
    else {
        let intmayor = parseInt(mayor);
        let intmenor = parseInt(menor);
        clearCoursesInTable();
        let margenes: Course[] = margen(intmayor, intmenor, dataCourses);
        renderCoursesInTable(margenes);
    }
}

function searchCourseByName(nameKey: string, courses: Course[]) {
    return nameKey === '' ? dataCourses : courses.filter(c =>
        c.name.match(nameKey));
}

function margen(mayor: number, menor: number, courses: Course[]): Course[] {
    return courses.filter(piruca =>
        piruca.credits <= mayor && piruca.credits >= menor);
}


function getTotalCredits(courses: Course[]): number {
    let totalCredits: number = 0;
    courses.forEach((course) => totalCredits = totalCredits + course.credits);
    return totalCredits;
}

function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);

        }
    }
}