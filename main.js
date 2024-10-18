document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    const pNumber = this.part_number.value.trim();
    const pType = this.type.value.trim();

    let searchStatus = "";
    if (pType==="All"){
        if (pNumber.charAt(0)==="W"){
            searchStatus = "Valve Seat";
        }else if (pNumber.charAt(0)==="M"){
            searchStatus = "Valve";
        }
    }

    console.log(pNumber);
    //const url = `https://script.google.com/macros/s/AKfycbx9-awU_13EGXCf0jYHsVMHOvB7Iaezc0ZSYaOWKQiLff5yUVlFg_UHr0EK4dZz6lVBVA/exec?partNumber=${encodeURIComponent(pNumber)}`;

    const url  = 'https://script.google.com/macros/s/AKfycbx9-awU_13EGXCf0jYHsVMHOvB7Iaezc0ZSYaOWKQiLff5yUVlFg_UHr0EK4dZz6lVBVA/exec?'+new URLSearchParams({
        partNumber:encodeURIComponent(pNumber),
        searchStatus:encodeURIComponent(pType)
    })
    console.log(url);

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const resultsBody = document.getElementById("resultsBody");
            resultsBody.innerHTML = ''; // Clear previous results

            const resultsBodyApp = document.getElementById("resultsBodyApp");
            resultsBodyApp.innerHTML = ''; // Clear previous results

            // Check if data is available and populate the table
            if (data && data.length) {

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><a href="product.html?id=${data[0][5]}">${data[0][5]}</a></td>
                    <td>${searchStatus}</td>
                    <td>${data[0][12]}</td>
                `;
                resultsBody.appendChild(row);

                data.forEach(item => {
                    console.log(item[0]);
                    const row1 = document.createElement('tr');
                    row1.innerHTML = `
                        <td>${item[0]}</td>
                        <td>${item[1]}</td>
                        <td>${item[2]}</td>
                        <td>${item[3]}</td>
                        <td></td>
                    `;
                    resultsBodyApp.appendChild(row1);
                });
            } else {
                // Handle no results
                resultsBody.innerHTML = '<tr><td colspan="3" class="text-center">No results found.</td></tr>';
                resultsBodyApp.innerHTML = '<tr><td colspan="5" class="text-center">No results found.</td></tr>';
            }
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });

    
});

function getData(){

}

function toggleContent() {
    var content = document.getElementById("contentPN");
    var button = document.getElementById("toggleButton");
    if (content.style.display === "none") {
        content.style.display = "block";
        button.textContent = "Hide Content";
    } else {
        content.style.display = "none";
        button.textContent = "Show Content";
    }
}