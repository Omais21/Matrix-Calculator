function generateMatrices() {
    const rows = document.getElementById("rows").value;
    const columns = document.getElementById("columns").value;

    // Validate the input for rows and columns
    if (rows <= 0 || columns <= 0) {
        alert("Please enter valid dimensions.");
        return;
    }

    // Clear previous matrices
    document.getElementById("matrices-container").innerHTML = '';
    document.getElementById("result-container").innerHTML = '';

    // Show submit button
    document.getElementById("submit-container").style.display = 'block';

    // Create two matrices (A and B) dynamically
    let matrixContainer = document.getElementById("matrices-container");

    matrixContainer.innerHTML = `
        <h2>Matrix A</h2>
        ${generateMatrixHTML(rows, columns, 'A')}
        <h2>Matrix B</h2>
        ${generateMatrixHTML(rows, columns, 'B')}
    `;
}

// Function to generate a matrix with dynamic rows and columns
function generateMatrixHTML(rows, columns, matrixId) {
    let table = '<table>';
    for (let i = 0; i < rows; i++) {
        table += '<tr>';
        for (let j = 0; j < columns; j++) {
            table += `<td><input type="number" id="${matrixId}${i}${j}" placeholder="0"></td>`;
        }
        table += '</tr>';
    }
    table += '</table>';
    return table;
}

// Function to perform matrix addition or subtraction
function calculateResult() {
    const rows = document.getElementById("rows").value;
    const columns = document.getElementById("columns").value;
    const operation = document.getElementById("operation").value;
    
    let matrixA = getMatrixValues('A', rows, columns);
    let matrixB = getMatrixValues('B', rows, columns);
    let resultMatrix = [];

    // Perform the chosen operation
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < columns; j++) {
            if (operation === 'add') {
                row.push(matrixA[i][j] + matrixB[i][j]);
            } else {
                row.push(matrixA[i][j] - matrixB[i][j]);
            }
        }
        resultMatrix.push(row);
    }

    displayResult(resultMatrix, rows, columns);
}

// Function to fetch matrix values from the input fields
function getMatrixValues(matrixId, rows, columns) {
    let matrix = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < columns; j++) {
            let cellValue = document.getElementById(`${matrixId}${i}${j}`).value;
            row.push(parseInt(cellValue) || 0); // Default to 0 if empty
        }
        matrix.push(row);
    }
    return matrix;
}

// Function to display the result matrix
function displayResult(matrix, rows, columns) {
    let resultContainer = document.getElementById("result-container");
    let table = '<h2>Result Matrix</h2><table>';
    for (let i = 0; i < rows; i++) {
        table += '<tr>';
        for (let j = 0; j < columns; j++) {
            table += `<td><input type="number" value="${matrix[i][j]}" disabled></td>`;
        }
        table += '</tr>';
    }
    table += '</table>';
    resultContainer.innerHTML = table;
}


