//-----------------------------------------------------
//Fügt eine ganz neue Liste hinzu
function newList(id, defaultTitle = null) {
    const listenID = id;

    //h = Listentitel
    var h = document.createElement("H4");

    var trashIcon = document.createElement("img"); // Trash-Icon
    trashIcon.src = "pictures/trash_icon.png";
    trashIcon.className = "trashIcon";
    trashIcon.onclick = function() {
        deleteList(listenID)
    }
    h.appendChild(trashIcon);

    // DefaultTitle nehmen, falls definiert - anderenfalls Inhalt des Input-Feldes nehmen
    var inputWert = defaultTitle || document.getElementById("input_titel").value; //ID ist in board.html definiert
    var t = document.createTextNode(inputWert);
    console.log("Listentitel=" + inputWert);
    //<--Append-->
    h.appendChild(t); //H4 enthält den Input-Wert t (Eingabe des Namens der neuen Liste)

    //div ist die list_areaClass, die die weiße Box zeigt
    var div = document.createElement("div");
    div.className = "list_areaClass";
    div.id = listenID;
    //<--Append-->
    div.appendChild(h); //Div (weiße Box) enthält die Überschrift H4

    //form ist das Formular innerhalb des div (weiße Box)
    var form = document.createElement("form");
    form.className = "form_zu_erledigen";
    form.setAttribute("action", "#");
    //<--Append-->
    div.appendChild(form); //Div (weiße Box) enthält das Formular

    //Input-Feld innerhalb des Formulars (form) "Was musst du erledigen?"
    var input = document.createElement("input");
    input.type = "text";
    input.id = 'input' + listenID;
    input.placeholder = "Was musst du erledigen?";
    //<--Append-->
    form.appendChild(input); //Form enthält das Inputfeld

    form.onsubmit = function() { //onsubmit soll einen neuen ToDoEintrag generieren
        var inputID = "input" + id;
        var itemName = document.getElementById(inputID).value;
        document.getElementById(inputID).value = ""; //Input zurücksetzen
        return createItem(listenID, itemName);
    };

    //Plus-Button für einen neuen To-Do-Eintrag
    var divBttn = document.createElement("div");
    divBttn.className = "addButton";
    var textBttn = document.createTextNode("+");
    //<--Append-->
    divBttn.appendChild(textBttn); //Button-Div enthält den Text "+"
    form.appendChild(divBttn); //Form enthält das Button-Div Element

    divBttn.onclick = function() { //"+" soll auch einen neuen ToDoEintrag generieren
        var inputID = "input" + id;
        var itemName = document.getElementById(inputID).value;
        document.getElementById(inputID).value = ""; //Input zurücksetzen
        createItem(listenID, itemName);
    };

    //Divs pro Listen
    var div_incomplete = document.createElement("div");
    var div_complete = document.createElement("div");

    //ul incompleteTasks wird hinzugefügt
    var ul = document.createElement("ul");
    ul.className = 'ul_incompleteTasks';
    ul.id = 'ul' + listenID;

    //ul completedTasks wird hinzugefügt
    var ulCompleted = document.createElement("ul");
    ulCompleted.className = 'ul_completedTasks';
    ulCompleted.id = 'ul_completed' + listenID;

    //Titel für die "ToDo" Items der incomplete Task List
    var titel_incomplete = document.createElement("h3");
    var text_h3 = document.createTextNode("ToDo");
    titel_incomplete.appendChild(text_h3);

    //Titel für die erledigten "ToDo" (completed Task List)
    var titel_complete = document.createElement("h3");
    var text_h3 = document.createTextNode("Completed");
    titel_complete.appendChild(text_h3);
    //<--Append-->
    div.appendChild(div_incomplete);
    div_incomplete.appendChild(titel_incomplete);
    div_incomplete.appendChild(ul); //Im Div wird die ul icompleteTasks erstellt
    div.appendChild(div_complete);
    div_complete.appendChild(titel_complete);
    div_complete.appendChild(ulCompleted); //Liste mit completed Tasks wird hinzugefügt

    //Der Content-Area allgemein das div list_areaClass hinzufügen (zeigt die weiße Box an)
    var Ausgabebereich = document.getElementById('content_area');
    //console.log(Ausgabebereich)
    Ausgabebereich.append(div);
}

//-----------------------------------------------------
// Neues List-Item
function newItem(id, taskName, itemId, status) {
    var div = document.getElementsByClassName('list_areaClass');
    div.id = id;

    //li-Element --> li/checkbox/span/text/span/close-Icon/li
    var li = document.createElement("li");

    li.id = "listitem_" + itemId; //ID von li ist immer "listitem" + die generierte ID Bsp. "listitem_ljrm2t63v"
    var t = document.createElement("span");
    var text = document.createTextNode(taskName);
    //<--Append-->
    li.appendChild(t);
    t.appendChild(text);

    //Sobald kein Input-Wert eingegeben wird, kommt die Aufforderung "Ungültige Eingabe! Bitte ToDo eingeben!"
    //Neue List Items werden automatisch in die uncompleted Task List eingefügt
    if (taskName !== '') {
        document.getElementById('ul' + id).appendChild(li);
    } else {
        alert("Ungültige Eingabe! Bitte ToDo eingeben!");
    }

    //Input Icon Checkbox vor dem List-Item
    var liCheckbox = document.createElement("input");
    liCheckbox.type = "checkbox";
    liCheckbox.className = "checkbox";
    liCheckbox.id = "check_" + itemId;
    //<--Append-->
    li.appendChild(liCheckbox);

    //EventListener für die Checkbox
    liCheckbox.addEventListener("change", function(event) {
        var li = event.currentTarget.parentElement; //Parent Element von liCheckbox => li

        if (event.target.checked == true) {
            updateItemChecked(id, itemId);
            var ul = document.querySelector("#ul_completed" + id); //hinter jede ul kommt die id der Gesamtliste
            ul.append(li); //wird zu completed Tasks hinzugefügt
            li.classList.add('checked'); //wenn checked=true, dann wird die Klasse checked hinzugefügt (zum Durchstreichen des Item)
        } else { //wenn  Checkbox-Haken wieder entfernt wird, wird es wieder zu uncompleted Tasks hinzugefügt
            updateItemUnchecked(id, itemId);
            var ul = document.querySelector("#ul" + id);
            ul.append(li); //wird zu uncompleted Tasks hinzugefügt
            li.classList.remove('checked');
        }
    })

    //Nach jedem neu erstellten List-Item wird automatisch ein Div dahinter erstellt (hier: Close- und Edit-Icon)
    var closeIconDiv = document.createElement("div"); // Close-Icon
    closeIconDiv.className = "close";

    var editIcon = document.createElement("img"); // Edit-Icon
    editIcon.src = "pictures/edit_icon.png";
    editIcon.className = "bttnBereich";
    editIcon.onclick = function() { //Input-Text mit alert-Eingabe editieren
        if (li.classList.contains('checked')) {
            alert("Aufgabe ist schon erledigt und kann nicht mehr editiert werden!");
        } else {
            var userinput = prompt("Bitte hier das geänderte ToDo eingeben:");
            if (userinput == null || userinput == "") {} else {
                var textSpan = li.getElementsByTagName('span')[0];
                textSpan.innerText = userinput;
                updateItemName(id, itemId, userinput);
            }
        }
    }

    //u007D7 macht ein x hinter das Listenelement, um dieses zu löschen/ schließen
    var txt = document.createTextNode("\u00D7");
    //<--Append-->
    closeIconDiv.appendChild(txt);
    li.appendChild(closeIconDiv);
    li.appendChild(editIcon);

    // Eventlistener zum Schließen (Close-Icon)
    closeIconDiv.addEventListener("click", function() {
        closeIconDiv.parentElement.style.display = "none";
        deleteItem(id, itemId);
    });
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var newDiv = this.parentElement;
            newDiv.style.display = "none";
        }
    }
}

//Funktion Slider Sidebar
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle('active');
    document.getElementById("content").classList.toggle('active');
    document.getElementById("navigation").classList.toggle('active')
    document.getElementById("nav").classList.toggle('active')
}

function changeImage() {
    var image = document.getElementById('toggle_icon');
    if (image.src.match("left")) {
        image.src = "pictures/right_icon.PNG";
    } else {
        image.src = "pictures/left_icon.PNG";
    }
}

//-----------------------------------------------------
// Fetch API
var key = "c777cb49483438c3909de01ed14db70f";
var linkBasis = "https://shopping-lists-api.herokuapp.com/api/v1/lists/";

async function loadData() { //wird in board.html mit body onload="loadData()" geladen
    /*JS ist synchron, deswegen 
    --> Hier: Nicht auf Antwort vom Server warten, sondern soll Code weiterladen und wenn die Antwort der API kommt, 
    dann soll der untenstehende Code ausgeführt werden */

    var res = await fetch(linkBasis, {
        method: 'get',
        headers: new Headers({
            'Authorization': key
        })
    });
    let data = await res.json(); //sendet json zurück
    for (var i = 0; i < data.length; i++) {
        let tempObj = data[i];
        newList(tempObj._id, tempObj.name)
        for (var j = 0; j < tempObj.items.length; j++) {
            let tempItem = tempObj.items[j];
            newItem(tempObj._id, tempItem.name, tempItem._id)
            if (tempItem.bought == true) {
                console.log("Es liegen erledigte Aufgaben vor: " + tempItem.name)
                var li = document.getElementById("listitem_" + tempItem._id);
                var ul_completed = document.getElementById("ul_completed" + tempObj._id);
                ul_completed.append(li);
                var checkbox = document.getElementById("check_" + tempItem._id);
                checkbox.checked = true;
            } else {
                console.log("Es liegen unerledigte Aufgaben vor.")
            }
        }
    }
    console.log(data);
}
//-----------------------------------------------------
//NEUE LISTE
function createList(id, name) {
    let listenName = {
        name: document.getElementById('input_titel').value //Liest Wert aus dem Input-Feld aus (=Listen-Titel)
    };
    console.log("Async function createList:" + document.getElementById('input_titel').value)

    fetch(linkBasis, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Authorization': key,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(listenName)
        }).then(res => {
            return res.json()
        })
        .then((data) => {
            console.log(data);
            newList(data._id, data.name);
        })
        .catch(error => console.log('ERROR'))

    console.log(JSON.stringify(listenName));
    // Listen-Titel aus dem Inputfeld, nach dem Aulesen (s.o.) zurücksetzen
    document.getElementById("input_titel").value = "";
}
//-----------------------------------------------------
//LISTE LÖSCHEN
function deleteList(id) {

    var linkGesamt = linkBasis + id;

    fetch(linkGesamt, {
        method: 'delete',
        headers: {
            'Accept': 'application/json',
            'Authorization': key,
            'Content-Type': 'application/json'
        },
    }).then(res => {
        return res.json()
    }).then((data) => {
        console.log(data);

        var list = document.getElementById(id);
        list.remove(); // Delete List in View
    }).catch(error => console.log('ERROR'))
}
//-----------------------------------------------------
//ITEM HINZUFÜGEN
function createItem(id, taskName) {
    console.log("create item for list: " + id)

    var inputValue = {
        name: taskName
    }

    var linkEnde = "/items";
    var linkGesamt = linkBasis + id + linkEnde;
    console.log(linkGesamt);

    fetch(linkGesamt, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Authorization': key,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputValue)
    }).then((res) => {
        return res.json()
    }).then((data) => {
        console.log("success")
        console.log(data);
        newItem(id, inputValue.name, data._id)
        location.reload(true); //Browserfenster neuladen
    }).catch(() => console.log('ERROR'))
}
//-----------------------------------------------------
//ITEM LÖSCHEN
function deleteItem(listId, itemId) {
    var linkEnde = "/items/" + itemId;
    var linkGesamt = linkBasis + listId + linkEnde;

    fetch(linkGesamt, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Authorization': key,
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then((res) => {
            var item = document.getElementById("listitem_" + itemId);
            item.remove(); // Delete Item in View
            console.log("Item successfully deleted");
        })
}
//-----------------------------------------------------
//UPDATE ITEM CHECKED
function updateItemChecked(listId, itemId) {
    var linkEnde = "/items/" + itemId;
    var linkGesamt = linkBasis + listId + linkEnde;

    var updateItemTrue = {
        bought: true
    }
    fetch(linkGesamt, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Authorization': key,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateItemTrue)
        }).then(res => res.json())
        .then((data) => {
            console.log("Item successfully updated to true (=completed)");
            console.log(data);
        })
}

//-----------------------------------------------------
//UPDATE ITEM UNCHECKED
function updateItemUnchecked(listId, itemId) {
    var linkEnde = "/items/" + itemId;
    var linkGesamt = linkBasis + listId + linkEnde;

    var updateItemFalse = {
        bought: false
    }
    fetch(linkGesamt, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Authorization': key,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateItemFalse)
        })
        .then(res => res.json())
        .then((data) => {
            console.log("Item successfully updated to false (uncompleted)");
            console.log(data);
        })
}
//-----------------------------------------------------
//UPDATE ITEM NAME
function updateItemName(id, itemId, taskName) {
    var linkEnde = "/items/" + itemId;
    var linkGesamt = linkBasis + id + linkEnde;
    var inputValue = {
        name: taskName
    }

    fetch(linkGesamt, {
        method: 'put',
        headers: {
            'Accept': 'application/json',
            'Authorization': key,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputValue)
    }).then((res) => {
        return res.json()
    }).then((data) => {
        console.log(data);
        newItem(id, inputValue.name, data._id)
        location.reload(true); //Browserfenster neuladen
    }).catch(() => console.log('ERROR'))
}
//-----------------------------------------------------
//Aktuelles Datum
function formatDate(date) {
    var monthNames = [
        "JAN", "FEB", "MAR",
        "APR", "MAI", "JUN", "JUL",
        "AUG", "SEPT", "OCT",
        "NOV", "DEZ"
    ];
    var weekday = [
        "SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var weekIndex = date.getDay();
    var year = date.getFullYear();

    return weekday[weekIndex] + ' | ' + monthNames[monthIndex] + ' ' + day + ' | ' + year;
}

function currentDate() {
    var d = formatDate(new Date());
    document.getElementById("heute").innerHTML = d;
}