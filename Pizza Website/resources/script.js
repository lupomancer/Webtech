function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function calculateOrderValue() {
    var sel1 = document.getElementById('pizzaType1');
    var quantity1 = document.getElementById('pizzaQuantity1').value;
    var sel2 = document.getElementById('pizzaType2');
    var quantity2 = document.getElementById('pizzaQuantity2').value;
    var sel3 = document.getElementById('pizzaType3');
    var quantity3 = document.getElementById('pizzaQuantity3').value;

    var pizzaValue1 = sel1.options[sel1.selectedIndex].value;
    var pizzaQuantity1 = (quantity1 !== "") ? quantity1 : 0;
    var pizzaValue2 = sel2.options[sel2.selectedIndex].value;
    var pizzaQuantity2 = (quantity2 !== "") ? quantity2 : 0;
    var pizzaValue3 = sel3.options[sel3.selectedIndex].value;
    var pizzaQuantity3 = (quantity3 !== "") ? quantity3 : 0;

    if ((pizzaValue1 !== 0 && pizzaQuantity1 !== 0) ||
        (pizzaValue2 !== 0 && pizzaQuantity2 !== 0) ||
        (pizzaValue3 !== 0 && pizzaQuantity3 !== 0))
        document.getElementById("subtotal").value = "C$ " + (pizzaValue1 * pizzaQuantity1 + pizzaValue2 * pizzaQuantity2 + pizzaValue3 * pizzaQuantity3).toFixed(2);
}

function calculateTotal() {
    document.getElementById("total").value = document.getElementById("subtotal").value;
}

function validateNumber(input) {
    if (isNaN(input.value) || input.value < 1 || input.value > 15) {
        input.value = "";
        alert("Sorry, bud. You can only get 1 to 15 pizzas. Letters and hashtags don't work.");
        return false;
    }
}

function validateContactForm() {
    if (document.getElementById("name").value === "") {
        alert("Oh come on, you've gotta have a name.");
        return false;
    }

    if (document.getElementById("email").value === "" || !validateEmail(document.getElementById("email").value)) {
        alert("Yeah, that email isn't real.");
        return false;
    }

    if (document.getElementById("feedback").value === "") {
        alert("How are we supposed to know what to do better if you don't tell us.");
        return false;
    }

    alert("SENDING TO THE MOTHERSHIP.");
    return true;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}