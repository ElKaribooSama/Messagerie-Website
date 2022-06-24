const button = document.getElementById("buttoninput")
        const textinput = document.getElementById("textinput")
        
        button.onclick = function buttonOnClick() {
            alert("work ok :" + textinput.value)
        }