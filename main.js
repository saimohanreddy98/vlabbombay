const addButton = document.getElementById("add-row");
const moveUpButton = document.getElementById("move-row-up");
const moveDownButton = document.getElementById("move-row-down");
const deleteButton = document.getElementById("delete-row");
const refreshButton = document.getElementById("refresh-data");
const saveButton = document.getElementById("save-data");

let selectedRow = [];

let chemicalData = [
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
    density: 298.1,
    viscosity: 65.5,
    packaging: "Bag",
    packSize: 100,
    unit: "kg",
    quantity: 140,
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
    density: 569.95,
    viscosity: 12.5,
    packaging: "Bottle",
    packSize: 151,
    unit: "ml",
    quantity: 245,
  },
  {
    id: 7,
    name: "Aluminum chlorohydrate",
    vendor: "Ineos",
    density: 698.25,
    viscosity: 98.3,
    packaging: "Bottle",
    packSize: 100,
    unit: "ml",
    quantity: 165,
  },
  {
    id: 8,
    name: " Monosodium glutamate",
    vendor: "SABIC",
    density: 451.1,
    viscosity: 91.2,
    packaging: "Paper Bag",
    packSize: 123,
    unit: "kg",
    quantity: 165,
  },
  {
    id: 9,
    name: "Amyl acetate",
    vendor: "Ineos",
    density: 245.6,
    viscosity: 81.4,
    packaging: "Plastic Bottle",
    packSize: 121,
    unit: "l",
    quantity: 139,
  },
  {
    id: 10,
    name: "Fused alumina",
    vendor: "DowDuPont",
    density: 452.6,
    viscosity: 96.9,
    packaging: "Paper Bag",
    packSize: 198,
    unit: "ml",
    quantity: 257,
  },
  {
    id: 11,
    name: "Aluminum oxide",
    vendor: "SABIC",
    density: 245.8,
    viscosity: 65.3,
    packaging: "Glass Bottle",
    packSize: 156,
    unit: "g",
    quantity: 140,
  },
  {
    id: 12,
    name: "Potassium",
    vendor: "lg Chem",
    density: 225.6,
    viscosity: 59.7,
    packaging: "Glass Bottle",
    packSize: 68,
    unit: "ml",
    quantity: 175,
  },
  {
    id: 13,
    name: "Sodium bicarbonate",
    vendor: "Formosa",
    density: 354.9,
    viscosity: 45.3,
    packaging: "Plastic Bottle",
    packSize: 150,
    unit: "g",
    quantity: 125,
  },
  {
    id: 14,
    name: "Ethyl alcohol",
    vendor: "Sinopec",
    density: 424.7,
    viscosity: 59.6,
    packaging: "Paper Bag",
    packSize: 100,
    unit: "ml",
    quantity: 246,
  },
  {
    id: 15,
    name: "Acid",
    vendor: "LG Chem",
    density: 361.6,
    viscosity: 43.6,
    packaging: "Glass bottle",
    packSize: 167,
    unit: "ml",
    quantity: 134,
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
renderTable(chemicalData);
addButton.addEventListener("click", () => {
  let rows = {
    id: chemicalData.length + 1,
    name: "",
    vendor: "",
    density: "",
    viscosity: "",
    packaging: "",
    packSize: "",
    unit: "",
    quantity: "",
  };
  chemicalData.push(rows);
  saveData();
  renderTable(chemicalData);
});

function saveData() {
  const newData = JSON.stringify(chemicalData);
  localStorage.setItem(LOCAL_STORAGE, newData);
}

function getDataFromStorage() {
  const newData = localStorage.getItem(LOCAL_STORAGE);
  let data = JSON.parse(newData) ? JSON.parse(newData) : chemicalData;
  sortList(data);
  return chemicalData;
}

function sortList(data) {
  chemicalData = data.sort(function (a, b) {
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
  chemicalData = chemicalData.map((row) => {
    if (row.id === id) {
      const obj = { ...row };
      obj[colName] = value;
      return obj;
    }
    return row;
  });
}

function moveUp() {
  for (let i = 1; i < chemicalData.length; i++) {
    const row = chemicalData[i];
    if (selectedRow.includes(row.id)) {
      chemicalData[i - 1].id = row.id;
      row.id -= 1;
    }
  }
  selectedRow = [];
  sortList(chemicalData);
  saveData();
  renderTable(chemicalData);
}

function moveDown() {
  for (let i = chemicalData.length - 2; i >= 0; i--) {
    const row = chemicalData[i];
    if (selectedRow.includes(row.id)) {
      chemicalData[i + 1].id = row.id;
      row.id += 1;
    }
  }
  selectedRow = [];
  sortList(chemicalData);
  saveData();
  renderTable(chemicalData);
}

saveButton.addEventListener('click', () => {
  saveData();
})

refreshButton.addEventListener('click', () => {
  getDataFromStorage();
  renderTable(chemicalData);
})

deleteButton.addEventListener('click', () => {
  for (let i = 0; i < chemicalData.length; i++) {
    const row = chemicalData[i];
    if (selectedRow.includes(row.id)) {
      chemicalData = chemicalData.filter((item) => item.id !== row.id);
    }
  }
  selectedRow = [];
  arrangeId();
  sortList(chemicalData);
  saveData();
  renderTable(chemicalData);
})

function arrangeId() {
  for (let i = 0; i < chemicalData.length; i++) {
    const row = chemicalData[i];
    row.id = i + 1;
  }
}