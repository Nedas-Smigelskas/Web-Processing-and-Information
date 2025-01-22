var studentSave = [];
document.addEventListener("DOMContentLoaded", function () {
    var table = document.querySelector("#grades tbody");
    const add = document.getElementById("add");
    const addAssign = document.getElementById("addAssign");
    const avg = document.getElementById("avg");
    const savebt = document.getElementById("save");
    const loadbt = document.getElementById("load");
    var assignmentCount = 5;
    var displayOption = 0;

    let students = [
        { name: "Student1", id: "001", grades: ["-", "-", "-", "-", "-"] },
        { name: "Student2", id: "002", grades: ["-", "-", "-", "-", "-"] },
        { name: "Student3", id: "003", grades: ["-", "-", "-", "-", "-"] },
        { name: "Student4", id: "004", grades: ["-", "-", "-", "-", "-"] },
        { name: "Student5", id: "005", grades: ["-", "-", "-", "-", "-"] },
        { name: "Student6", id: "006", grades: ["-", "-", "-", "-", "-"] },
        { name: "Student7", id: "007", grades: ["-", "-", "-", "-", "-"] },
        { name: "Student8", id: "008", grades: ["-", "-", "-", "-", "-"] },
        { name: "Student9", id: "009", grades: ["-", "-", "-", "-", "-"] },
        { name: "Student10", id: "010", grades: ["-", "-", "-", "-", "-"] },
    ];

    function calculateAverages(grades) {
        const validGrades = grades
            .filter((grade) => grade !== "-" && grade !== "")
            .map((grade) => parseInt(grade));
        if (validGrades.length === 0) return "-";
        const sum = validGrades.reduce((acc, curr) => acc + curr, 0);
        const out = (sum / validGrades.length).toFixed(0);
        if(displayOption === 0){
            return `${out}%`;
        } else if (displayOption === 1){
            if(out > 92){
                return "A";
            } else if (out > 89){
                return "A-";
            } else if (out > 86){
                return "B+";
            } else if (out > 82){
                return "B";
            } else if (out > 79){
                return "B-";
            } else if (out > 76){
                return "C+";
            } else if (out > 72){
                return "C";
            } else if(out > 69){
                return "C-";
            } else if(out > 66){
                return "D+"
            } else if(out > 62){
                return "D";
            } else if (out > 59){
                return "D-";
            } else {
                return "F";
            }
        } else {
            if(out > 92){
                return "4.0";
            } else if (out > 89){
                return "3.7";
            } else if (out > 86){
                return "3.3";
            } else if (out > 82){
                return "3.0";
            } else if (out > 79){
                return "2.7";
            } else if (out > 76){
                return "2.3";
            } else if (out > 72){
                return "2.0";
            } else if(out > 69){
                return "1.7";
            } else if(out > 66){
                return "1.3"
            } else if(out > 62){
                return "1.0";
            } else if (out > 59){
                return "0.7";
            } else {
                return "0.0";
            }
        }
    }

    function renderTable() {
        table.innerHTML = "";
        students.forEach((student) => {
            const row = document.createElement("tr");
            row.innerHTML = `<td contenteditable>${
                student.name
            }</td><td contenteditable>${student.id}</td>${student.grades
                .map((grade) => `<td contenteditable>${grade}</td>`)
                .join("")}<td>${calculateAverages(student.grades)}</td>`;
                console.log(student.grades);
            table.appendChild(row);
        });
        
    }

    function addRow() {
        var grades = [];
        for(i = 0; i < assignmentCount; i++){
            grades.push("-");
        }
        const newRow = { name: "", id: "", grades: grades };
        students.push(newRow);
        renderTable();
    }

    function addAssignment() {
        assignmentCount++;
        const th = document.createElement("th");
        th.textContent = `Assignment ${assignmentCount}`;
        document
            .querySelector("#grades thead tr")
            .insertBefore(
                th,
                document.querySelector("#grades thead th:last-child")
            );
        students.forEach((student) => {
            student.grades.push("-");
        });
        renderTable();
    }

    function save(){
        studentSave = JSON.parse(JSON.stringify(students));
    }

    function load(){
        if(studentSave.length !== 0){
            students = JSON.parse(JSON.stringify(studentSave));
        }
        renderTable();
    }

    function changeDisplay(){
        if(displayOption < 2){
            displayOption++;
        } else {
            displayOption = 0;
        }
        renderTable();
    }

    table.addEventListener("input", function (edited) {
        const cell = edited.target;
        const rownum = cell.parentElement.rowIndex - 1;
        const columnnum = cell.cellIndex;

        if (rownum >= 0 && columnnum >= 2 && columnnum <= assignmentCount+1) {
            students[rownum].grades[columnnum - 2] =
                cell.textContent.trim();
            const averageCell = cell.parentElement.lastElementChild;
            averageCell.textContent = calculateAverages(
                students[rownum].grades
            );
        } else if (columnnum === 0) {
            students[rownum].name = cell.textContent.trim();
        } else if (columnnum === 1) {
            students[rownum].id = cell.textContent.trim();
        }
    });

    add.addEventListener("click", addRow);
    addAssign.addEventListener("click", addAssignment);
    avg.addEventListener("click", changeDisplay);
    savebt.addEventListener("click", save);
    loadbt.addEventListener("click", load);
    renderTable();
});
