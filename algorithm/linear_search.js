let msg_box  =document.getElementById("message")
let span_in_binary_search = document.getElementById("span_in_binary_search");

let sppeed_control = document.getElementById("algo_sppeed")
let speed = (32-sppeed_control.value)*100
let first_run = true;

sppeed_control.addEventListener('input',()=>{
    speed = (32-sppeed_control.value)*100
})

let random_array_generate = document.getElementById("random_array_generate")
random_array_generate.addEventListener("click", () => {
    let randomArray = generateRandomArray(16, 100);
    let randomTarget = randomArray[Math.floor(Math.random() * randomArray.length)];
    document.getElementById('arrayInput').value = randomArray.join(',');
    document.getElementById('targetInput').value = randomTarget;
})

function generateRandomArray(size, max) {
    let arr = [];
    while (arr.length < size) {
        let num = Math.floor(Math.random() * max) + 1;
        if (!arr.includes(num)) {
            arr.push(num);
        }
    }
    return arr;
}

if(first_run){
    span_in_binary_search.classList.add("mt-5","p-5","font-weight-bold");
    span_in_binary_search.style.fontSize = '20px'
    span_in_binary_search.style.fontWeight = '500'
    span_in_binary_search.innerHTML = "Enter Your Array or Create Random array for Linear Search"
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('inputForm').addEventListener('submit', function (event) {
        event.preventDefault();
        span_in_binary_search.style.display='none'
        
        let arrayInput = document.getElementById('arrayInput').value.split(',').map(Number);
        let target = Number(document.getElementById('targetInput').value);
        let arrayInput_duplicate = [...new Set(arrayInput)];
        if (arrayInput.length!=arrayInput_duplicate.length) {
            document.getElementById('message').innerText = 'Duplicates Numbers are not Allowed';
            return;
        }
        document.getElementById('arrayContainer').innerHTML = '';
        document.getElementById('info').innerText = '';
        document.getElementById('message').innerText = '';
        
        if (arrayInput.some(isNaN) || isNaN(target)) {
            document.getElementById('message').innerText = 'Please enter valid numbers.';
            return;
        }

        arrayInput.forEach((value, index) => {
            let elem = document.createElement('div');
            elem.className = 'array-element';
            elem.id = `elem-${index}`;
            elem.textContent = value;
            document.getElementById('arrayContainer').appendChild(elem);
        });

        // Perform Linear Search
        linearSearch(arrayInput, target);
    });
});


function linearSearch(array, target) {
    let index = 0;
    let resultIndex = -1;

    function searchStep() {
        msg_box.classList.remove("alert", "alert-danger", "alert-success", "font-weight-bold");

        // Reset previous highlights
        document.querySelectorAll('.array-element').forEach(elem => {
            elem.classList.remove('highlight');
        });

        if (index >= array.length || resultIndex !== -1) {
            if (resultIndex !== -1) {
                let resultElem = document.getElementById(`elem-${resultIndex}`);
                resultElem.classList.add('animate__animated', 'animate__shakeY');
                resultElem.classList.add('element_found');
                msg_box.classList.add("alert", "alert-success", "font-weight-bold");
                msg_box.innerHTML = `Element found at index : <b>${resultIndex}</b>`;
            } else {
                msg_box.classList.add("alert", "alert-danger", "font-weight-bold");
                msg_box.innerText = 'Element not Present in array.';
            }
            return;
        }

        let currentElem = document.getElementById(`elem-${index}`);
        currentElem.classList.add('highlight');

        if (array[index] === target) {
            resultIndex = index;
        } else {
            index++;
            setTimeout(searchStep, speed);
        }
    }

    searchStep();
}
