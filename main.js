const addButton = document.getElementById("add-row");
const moveUpButton = document.getElementById("move-row-up");
const moveDownButton = document.getElementById("move-row-down");
const deleteButton = document.getElementById("delete-row");
const refreshButton = document.getElementById("refresh-data");
const saveButton = document.getElementById("save-data");

let selectedRow = [];

let companyData = [
  {
    id: 1,
    name: "Ammonium Persulfate",
    vendor: "LG Chem",
    density: 1.049,
    viscosity: 1.22,
    packaging: "Glass Bottle",
    packSize: 500,
    unit: "kg",
    quantity: 50,
  },
  {
    id: 2,
    name: "Caustic Potash",
    vendor: "Formosa",
    density: 2.165,
    viscosity: 1.5,
    packaging: "Bag",
    packSize: 100,
    unit: "kg",
    quantity: 10,
  },
  {
    id: 3,
    name: "Ferric Nitrate",
    vendor: "Sinopec",
    density: 2.165,
    viscosity: 1.5,
    packaging: "Bag",
    packSize: 100,
    unit: "kg",
    quantity: 40,
  },
  {
    id: 4,
    name: "n-Pentane",
    vendor: "Sinopec",
    density: 4535.26,
    viscosity: 66.76,
    packaging: "N/A",
    packSize: 400,
    unit: "t",
    quantity: 25,
  },
  {
    id: 5,
    name: "Glycol Ether PM",
    vendor: "LG Chem",
    density: 6495.18,
    viscosity: 66.2,
    packaging: "Bag",
    packSize: 140,
    unit: "kg",
    quantity: 70,
  },
  {
    id: 6,
    name: " Magnesium sulfate",
    vendor: "LG Chem",
    density: 0.95,
    viscosity: 1.5,
    packaging: "Bottle",
    packSize: 170,
    unit: "ml",
    quantity: 45,
  },
  {
    id: 7,
    name: "Aluminum chlorohydrate",
    vendor: "Ineos",
    density: 0.25,
    viscosity: 1.3,
    packaging: "Bottle",
    packSize: 100,
    unit: "ml",
    quantity: 65,
  },
  {
    id: 8,
    name: " Monosodium glutamate",
    vendor: "SABIC",
    density: 1.175,
    viscosity: 1.2,
    packaging: "Paper Bag",
    packSize: 120,
    unit: "kg",
    quantity: 55,
  },
  {
    id: 9,
    name: "Amyl acetate",
    vendor: "Ineos",
    density: 1.245,
    viscosity: 1.4,
    packaging: "Plastic Bottle",
    packSize: 100,
    unit: "l",
    quantity: 30,
  },
  {
    id: 10,
    name: "Fused alumina",
    vendor: "DowDuPont",
    density: 2.452,
    viscosity: 1.9,
    packaging: "Paper Bag",
    packSize: 200,
    unit: "ml",
    quantity: 20,
  },
  {
    id: 11,
    name: "Aluminum oxide",
    vendor: "SABIC",
    density: 1.245,
    viscosity: 1.1,
    packaging: "Glass Bottle",
    packSize: 140,
    unit: "g",
    quantity: 40,
  },
  {
    id: 12,
    name: "Potassium",
    vendor: "lg Chem",
    density: 1.125,
    viscosity: 1.7,
    packaging: "Glass Bottle",
    packSize: 50,
    unit: "ml",
    quantity: 75,
  },
  {
    id: 13,
    name: "Sodium bicarbonate",
    vendor: "Formosa",
    density: 1.154,
    viscosity: 1.5,
    packaging: "Plastic Bottle",
    packSize: 150,
    unit: "g",
    quantity: 25,
  },
  {
    id: 14,
    name: "Ethyl alcohol",
    vendor: "Sinopec",
    density: 1.424,
    viscosity: 1.2,
    packaging: "Paper Bag",
    packSize: 100,
    unit: "ml",
    quantity: 46,
  },
  {
    id: 15,
    name: "Acid",
    vendor: "LG Chem",
    density: 2.157,
    viscosity: 1.4,
    packaging: "Glass bottle",
    packSize: 200,
    unit: "ml",
    quantity: 34,
  },
];
getDataFromStorage();

// Function to generate table rows
function generateTableRows(data) {
  let rows = "";
  data.forEach((item) => {
    rows += `
            <tr>
                <td><input type="checkbox" onclick="selectRow(event)" data-row-id="${item.id}" /></td>
                <td>${item.id}</td>
                <td oninput="changeValue(event)" data-row-id="${item.id}" data-row-name="name" contenteditable>${item.name}</td>
                <td oninput="changeValue(event)" data-row-id="${item.id}" data-row-name="vendor" contenteditable>${item.vendor}</td>
                <td oninput="changeValue(event)" data-row-id="${item.id}" data-row-name="density" contenteditable>${item.density}</td>
                <td oninput="changeValue(event)" data-row-id="${item.id}" data-row-name="viscosity" contenteditable>${item.viscosity}</td>
                <td oninput="changeValue(event)" data-row-id="${item.id}" data-row-name="packaging" contenteditable>${item.packaging}</td>
                <td oninput="changeValue(event)" data-row-id="${item.id}" data-row-name="packSize" contenteditable>${item.packSize}</td>
                <td oninput="changeValue(event)" data-row-id="${item.id}" data-row-name="unit" contenteditable>${item.unit}</td>
                <td oninput="changeValue(event)" data-row-id="${item.id}" data-row-name="quantity" contenteditable>${item.quantity}</td>
            </tr>
        `;
  });
  return rows;
}

function renderTable(data) {
  const table = document.querySelector("#example tbody");
  table.innerHTML = generateTableRows(data);
}

renderTable(companyData);

addButton.addEventListener("click", () => {
  let rows = {
    id: companyData.length + 1,
    name: "",
    vendor: "",
    density: "",
    viscosity: "",
    packaging: "",
    packSize: "",
    unit: "",
    quantity: "",
  };
  companyData.push(rows);
  saveData();
  renderTable(companyData);
});

function saveData() {
  const newData = JSON.stringify(companyData);
  localStorage.setItem(LOCAL_STORAGE, newData);
}

function getDataFromStorage() {
  const newData = localStorage.getItem(LOCAL_STORAGE);
  let data = JSON.parse(newData) ? JSON.parse(newData) : companyData;
  sortList(data);
  return companyData;
}

function sortList(data) {
  companyData = data.sort(function (a, b) {
    return a.id - b.id;
  });
}

function selectRow(e) {
  const element = e.target;
  const id = Number(element.dataset.rowId);
  if (element.checked) {
    selectedRow.push(id);
  }
  else {
    selectedRow = selectedRow.filter((item) => item !== id);
  }
}

function changeValue(e) {
  const element = e.target;
  const value = element.innerHTML;
  const id = Number(element.dataset.rowId);
  const colName = element.dataset.rowName;
  companyData = companyData.map((row) => {
    if (row.id === id) {
      const obj = { ...row };
      obj[colName] = value;
      return obj;
    }
    return row;
  });
}

function moveUp() {
  for (let i = 1; i < companyData.length; i++) {
    const row = companyData[i];
    if (selectedRow.includes(row.id)) {
      companyData[i - 1].id = row.id;
      row.id -= 1;
    }
  }
  selectedRow = [];
  sortList(companyData);
  saveData();
  renderTable(companyData);
}

function moveDown() {
  for (let i = companyData.length - 2; i >= 0; i--) {
    const row = companyData[i];
    if (selectedRow.includes(row.id)) {
      companyData[i + 1].id = row.id;
      row.id += 1;
    }
  }
  selectedRow = [];
  sortList(companyData);
  saveData();
  renderTable(companyData);
}

saveButton.addEventListener('click', () => {
  saveData();
})

refreshButton.addEventListener('click', () => {
  getDataFromStorage();
  renderTable(companyData);
})

deleteButton.addEventListener('click', () => {
  for (let i = 0; i < companyData.length; i++) {
    const row = companyData[i];
    if (selectedRow.includes(row.id)) {
      companyData = companyData.filter((item) => item.id !== row.id);
    }
  }
  selectedRow = [];
  arrangeId();
  sortList(companyData);
  saveData();
  renderTable(companyData);
})

function arrangeId() {
  for (let i = 0; i < companyData.length; i++) {
    const row = companyData[i];
    row.id = i + 1;
  }
}