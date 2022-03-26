// question 1

var pets = [
    {
      type: "cat",
      age: 5.5,
    },
    {
      type: "dog",
      age: 3.8,
    },
    {
      type: "parrot",
      age: 4.0,
    },
];
  
for(var i = 0; i < pets.length; i++) {
    var obj = pets[i];
    
    if(obj.age >= 4) {
        console.log(obj.type);
    }
}
  
  
  // question 2
  
var message = true;
function Johan (check) {
    if (typeof check == "boolean") {
        console.log(check);
    } else {
        console.log("Please pass a boolean value in");
    }
}
Johan(message);

  // question 3

function myFunction() {
    const div = document.getElementById("updatemsg");

    div.style.color = "blue";

    div.innerHTML = "Updated subheading!";
}
