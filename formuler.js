// let form=document.getElementById("form")
// let inputs=form.querySelectorAll("input,select,textarea")
// form.addEventListener("input",validation)
// function validation(event){
//     event.preventDefault()
//     inputs.forEach(input=>{
     
        
//         if(input.value.trim()===""){
//             input.nextElementSibling.textContent=` le champ de ${input.dataset.id} est obligatoire`
//         }
//        else  if(input.dataset.id==="auteur" && ! /^[A-Za-zÀ-ÿ]+(?:[ '-][A-Za-zÀ-ÿ]+)+$/.test(input.value)){
//             input.nextElementSibling.textContent=`Nom ${input.dataset.id} est invalide`
//         }
//        else  if(input.dataset.id==="titre" && ! /^.{5,100}$/.test(input.value)){
//             input.nextElementSibling.textContent="Le titre doit contenir entre 5 et 100 caractères"
//         }
//        else  if(input.dataset.id==="durée" && !/^(1[0-9]|20)$/.test(input.value)){
//             input.nextElementSibling.textContent="La durée doit être un nombre entier compris entre 10 et 20"
//         }
//        else  if(input.dataset.id==="Description" && ! /^.{20,1000}$/.test(input.value)){
//             input.nextElementSibling.textContent="La description doit contenir entre 20 et 1 000 caractères."

//         }
//         else{
//             input.nextElementSibling.textContent=""
//         }
        

//     })
//     // let nom=document.getElementById("auteur").value
     
//     // localStorage.setItem("nom",JSON.stringify(nom))
// }
