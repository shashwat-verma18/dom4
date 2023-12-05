function submitForm(){
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;

    let obj_details = {
      'name': name,
      'phone' : phone,
    };


    let obj_serialized = JSON.stringify(obj_details);

    localStorage.setItem(email, obj_serialized);

    refresh();

}
function deleteItem(e){
    if(confirm('Are You Sure?')){
        var li = e.target.parentElement;
        var liContent = li.innerText;
        const str = liContent.split("-");
        var key = str[1];

        var list = document.getElementById('listCon');
        list.removeChild(li);       
        
        localStorage.removeItem(key);
    }
}
function refresh(){

    removeAll();

    for (const key of Object.keys(localStorage)) {
        var email = key;

        var obj_deserialized = JSON.parse(localStorage.getItem(key));

        var name = obj_deserialized.name;
        var phone = obj_deserialized.phone;

        var val = name+'-'+email+'-'+phone+'  ';
        
        var list = document.getElementById('listCon');

        var li = document.createElement('li');
        li.appendChild(document.createTextNode(val));
        
        var deleteBtn = document.createElement('button');
        deleteBtn.onclick = deleteItem;
        deleteBtn.appendChild(document.createTextNode('Delete'));
        deleteBtn.style.marginLeft='7px';
        li.appendChild(deleteBtn);

        var editBtn = document.createElement('button');
        editBtn.onclick = editItem;
        editBtn.appendChild(document.createTextNode('Edit'));
        editBtn.style.marginLeft='7px';
        li.appendChild(editBtn);

        li.style.padding = '5px';
        list.appendChild(li);
    
        
    }
}

function removeAll(){
    var list = document.getElementById('listCon');

    while(list.firstChild){
        list.removeChild(list.firstChild);
    }
}

function editItem(e){
    var li = e.target.parentElement;
    var liContent = li.innerText;
    const str = liContent.split("-");
    
    var key = str[1];

    var list = document.getElementById('listCon');
    list.removeChild(li);       
        
    localStorage.removeItem(key);

    var name  = document.getElementById('name');
    var email  = document.getElementById('email');
    var phone  = document.getElementById('phone');

    var ind = str[2].indexOf(" "); 
    name.value = str[0];
    email.value = str[1];
    phone.value = str[2].substring(0,ind);
}