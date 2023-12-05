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

        li.style.padding = '5px';
        list.appendChild(li);
        console.log(val);
    
        
    }
}

function removeAll(){
    var list = document.getElementById('listCon');

    while(list.firstChild){
        list.removeChild(list.firstChild);
    }


}