let properties = [];
let calculatedTax = 0;

function calculateTax() {
    const area = Number(document.getElementById("area").value);
    const type = document.getElementById("type").value;

    if (!Number.isFinite(area) || area <= 0) {
        alert("Please enter a valid house area.");
        return;
    }

    // Illustrative formula for the prototype
    let rate = type === "Commercial" ? 3.75 : 2.50;

    calculatedTax = area * rate;

    document.getElementById("taxResult").innerText =
        "Estimated Annual Tax: ₹" + calculatedTax.toFixed(2);
}

document.getElementById("taxForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const owner = document.getElementById("owner").value.trim();
    const house = document.getElementById("house").value.trim();
    const address = document.getElementById("address").value.trim();
    const type = document.getElementById("type").value;
    const area = Number(document.getElementById("area").value);

    if (!owner || !house || !address || area <= 0) {
        alert("Please enter valid property details.");
        return;
    }

    if (properties.some(p => p.house.toLowerCase() === house.toLowerCase())) {
        alert("This house number is already registered.");
        return;
    }

    const rate = type === "Commercial" ? 3.75 : 2.50;
    const tax = area * rate;

    const property = {
        owner,
        house,
        address,
        type,
        area,
        tax,
        status: "Unpaid"
    };

    properties.push(property);

    displayProperties();

    document.getElementById("taxForm").reset();

    calculatedTax = 0;
    document.getElementById("taxResult").innerText =
        "Estimated Tax: ₹0";

    alert("Property saved successfully!");
});

function displayProperties() {
    const list = document.getElementById("propertyList");
    const search = document.getElementById("search").value.toLowerCase();

    list.innerHTML = "";

    properties
        .filter(p =>
            p.owner.toLowerCase().includes(search) ||
            p.house.toLowerCase().includes(search)
        )
        .forEach((p, index) => {
            const card = document.createElement("div");
            card.className = "property";

            const title = document.createElement("h3");
            title.textContent = p.owner;

            const details = document.createElement("p");
            details.textContent =
                "House: " + p.house +
                " | Address: " + p.address +
                " | Type: " + p.type +
                " | Area: " + p.area + " sq. ft." +
                " | Tax: ₹" + p.tax.toFixed(2) +
                " | Status: " + p.status;

            const paymentButton = document.createElement("button");
            paymentButton.textContent =
                p.status === "Paid" ? "Mark Unpaid" : "Record Payment";

            paymentButton.onclick = function() {
                p.status = p.status === "Paid" ? "Unpaid" : "Paid";
                displayProperties();
            };

            const receiptButton = document.createElement("button");
            receiptButton.textContent = "Generate Receipt";

            receiptButton.onclick = function() {
                generateReceipt(p);
            };

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";

            deleteButton.onclick = function() {
                if (confirm("Delete this property?")) {
                    properties.splice(index, 1);
                    displayProperties();
                }
            };

            card.append(title, details, paymentButton, receiptButton, deleteButton);
            list.appendChild(card);
        });
}

function generateReceipt(p) {
    const receipt = `
DIGITAL HOUSE TAX SYSTEM
-------------------------
Owner: ${p.owner}
House Number: ${p.house}
Address: ${p.address}
Property Type: ${p.type}
Area: ${p.area} sq. ft.
Tax Amount: ₹${p.tax.toFixed(2)}
Payment Status: ${p.status}

This is a demonstration receipt.
It is not an official municipal receipt.
    `;

    const receiptWindow = window.open("", "_blank");

    if (!receiptWindow) {
        alert("Allow pop-ups in your browser to print the receipt.");
        return;
    }

    const heading = receiptWindow.document.createElement("h2");
    heading.textContent = "House Tax Receipt";

    const content = receiptWindow.document.createElement("pre");
    content.textContent = receipt;

    const printButton = receiptWindow.document.createElement("button");
    printButton.textContent = "Print Receipt";
    printButton.onclick = function() {
        receiptWindow.print();
    };

    receiptWindow.document.body.append(heading, content, printButton);
}

function loadSamples() {
    properties = [
        {
            owner: "Asha Patil",
            house: "H-101",
            address: "Main Road, Ward 1",
            type: "Residential",
            area: 1200,
            tax: 3000,
            status: "Paid"
        },
        {
            owner: "Ravi Kumar",
            house: "H-102",
            address: "Lake Street, Ward 2",
            type: "Residential",
            area: 950,
            tax: 2375,
            status: "Unpaid"
        }
    ];

    displayProperties();
}