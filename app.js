import axios from "https://cdn.jsdelivr.net/npm/axios@1.7.9/+esm";
function affichage(resultat) {
  let cards = document.getElementById("card");
  cards.replaceChildren();

  resultat.forEach((res) => {
    let article = document.createElement("article");
    article.className = "bg-white rounded-xl shadow-sm overflow-hidden";

    let barre = document.createElement("div");
    barre.className = "h-2 bg-indigo-600";

    let container = document.createElement("div");
    container.className = "p-6";

    let header = document.createElement("div");
    header.className = "flex justify-between items-center mb-4";

    let theme = document.createElement("span");
    theme.className =
      "bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm";
    theme.textContent = res.theme;

    let duree = document.createElement("span");
    duree.className = "text-sm font-semibold text-gray-500";
    duree.textContent = res.duree + " min";

    header.append(theme, duree);

    let titre = document.createElement("h3");
    titre.className = "text-xl font-bold text-gray-800 mb-3";
    titre.textContent = res.titre;

    let description = document.createElement("p");
    description.className = "text-gray-600 text-sm leading-6 mb-5";
    description.textContent = res.description;

    let infos = document.createElement("div");
    infos.className = "border-t border-gray-100 pt-4 space-y-3";

    let objectifDiv = document.createElement("div");

    let objectifLabel = document.createElement("p");
    objectifLabel.className = "text-xs text-gray-400 uppercase font-semibold";
    objectifLabel.textContent = "Objectifs";

    let objectifs = document.createElement("p");
    objectifs.className = "text-gray-700 text-sm mt-1";
    objectifs.textContent = res.objectifs;

    objectifDiv.append(objectifLabel, objectifs);

    let auteurDiv = document.createElement("div");

    let auteurLabel = document.createElement("p");
    auteurLabel.className = "text-xs text-gray-400 uppercase font-semibold";
    auteurLabel.textContent = "Auteur";

    let auteur = document.createElement("p");
    auteur.className = "text-gray-700 text-sm mt-1";
    auteur.textContent = res.auteur;

    auteurDiv.append(auteurLabel, auteur);

    let boutons = document.createElement("div");
    boutons.className = "flex gap-3 mt-6";

    let btnModifier = document.createElement("button");
    btnModifier.id = res.id;
    btnModifier.dataset.id=res.id;
    btnModifier.className =
      "modifer flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg";
    btnModifier.textContent = "Modifier";

    let btnSupprimer = document.createElement("button");
    btnSupprimer.dataset.id = res.id;
    btnSupprimer.className =
      "suprimer flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg";
    btnSupprimer.textContent = "Supprimer";
    boutons.append(btnModifier, btnSupprimer);

    // Bouton modifier durée
    let btnDuree = document.createElement("button");
    btnDuree.dataset.id = res.id;
    btnDuree.className =
      "modfier-duree w-full bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg mt-3";
    btnDuree.textContent = "Modifier la durée";

    // Assemblage final
    infos.append(objectifDiv, auteurDiv, boutons, btnDuree);

    container.append(header, titre, description, infos);

    article.append(barre, container);

    cards.appendChild(article);
  });
}
async function getData() {
  try {
    const res = await axios.get("http://localhost:3000/api/activites");
    const data = res.data;
    console.log(data);
    affichage(data);
   
    // Recherche
    let search = document.getElementById("Rechercher");
    search.addEventListener("input", () => {
      let mot = search.value.toLowerCase();
      let res_recherch = data.filter((el) => {
        return el.titre.toLowerCase().includes(mot);
      });
      affichage(res_recherch);
    });
    //Filtrage
    let filtrageOptions = document.getElementById("filter-option");
    filtrageOptions.addEventListener("change", () => {
      let slected = filtrageOptions.value.toLowerCase();
      console.log(slected);

      let resultatOption = data.filter((el) => {
        return slected === "" || el.theme.toLowerCase() === slected;
      });

      affichage(resultatOption);
    });

    modifer()

    supprimer(data);
    // modificationDuree(data)
    ajouter()

    //ajouter
   } catch (e) {
    console.log("error:" + e);
  }
}
//ajouter
function ajouter(){
  let btnAjouter = document.getElementById("Ajouter");
  console.log(btnAjouter);
  btnAjouter.addEventListener("click", async () => {
    console.log("btn click");
    let nvActiviter = {
      auteur: document.getElementById("auteur").value,
      description: document.getElementById("Description").value,
      duree: Number(document.getElementById("number").value),
      objectifs: document.getElementById("Obje").value,
      theme: document.getElementById("theme").value,
      titre: document.getElementById("titre").value,
    };
    try {
      await axios.post(`http://localhost:3000/api/activites`, nvActiviter);
    ;

      affichage(data);
      

      alert("valide");
    } catch (e) {
      console.log("error:" + e);
    }
  });
}

//supprimer
async function supprimer(data) {
  //
  let btnSupprimer = document.querySelectorAll(".suprimer");
  console.log(btnSupprimer)
  btnSupprimer.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      console.log(btn)
      
      let id = Number(btn.dataset.id);
      if (confirm("vous confimer supprimer cet activiter")) {
        try {
          await axios.delete(`http://localhost:3000/api/activites/${id}`);

          alert("deltetd est valide");
        } catch (e) {
          console.log("error:" + e);
          alert("deleted est non valide");
        }
      }
    });
  });
}
//Modification
function modifer() {
  let btnModifer = document.querySelectorAll(".modifer");
  let btnM = document.getElementById("md");
  btnModifer.forEach((btn) => {
    let id = Number(btn.dataset.id);
    btn.addEventListener("click", () => {
      document.getElementById("form").scrollIntoView({ behavior: "smooth" });
    });
    console.log("btn :", btn);
    console.log(btnM);
    btnM.addEventListener("click", async (e) => {
    e.preventDefault()
      console.log(id);
      let modifer ={
        titre: document.getElementById("titre").value,
        theme: document.getElementById("theme").value,
        duree: Number(document.getElementById("number").value),
        description: document.getElementById("Description").value,
        objectifs:document.getElementById("Obje").value,
        auteur: document.getElementById("auteur").value,
      };
      console.log(modifer);
      try {
    await axios.put(`http://localhost:3000/api/activites/${id}`,modifer);
      alert("modification est valide");
        affichage();
        
      } catch (e) {
        console.log("error" + e);
        alert("non vlaide");
      }
    });
  });
}
// function modificationDuree(data){
//   let btnDurre=document.querySelectorAll(".modfier-duree")
//   let btnModiferDurre=document.getElementById("modifeDuree")
//   console.log("btn durre:"+ btnDurre)

//   btnDurre.forEach(duree=>{
   
//        let id=Number(duree.dataset.id)
//     duree.addEventListener("click",(e)=>{
//       e.preventDefault() 
//       console.log("duree:"+duree)
      
   
//       document.getElementById("form").scrollIntoView({ behavior: "smooth" });
//     })
  
//       btnModiferDurre.addEventListener("click",async()=>{
//         console.log("btn est click")
//       console.log(id)
//       let idmodifer=data.find(el=>el.id===id)
//       if(idmodifer){
        
        
//       }
      
        

      
     
//       try{
//         await axios.patch(`http://localhost:3000/api/activites/${idmodifer}`,mdDuree)
//         alert("modifcation duree est valide")

//         affichage()
//       }
//       catch(e){
//         console.log("error:"+e)
//         alert("modification duree est invalide")

//       }
//     })
//   })    
// }
ajouter()
getData();