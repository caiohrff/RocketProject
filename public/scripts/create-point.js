//Criando função para preencher o Select de estados do HTML

function populateUfs() {
    const ufSelect = document.querySelector("select[name=uf]") //Atribuindo a seleção do select de estados(passando seu name a ele)
    
    //fazendo uma promisse que busca os valores do JSON dessa API abaixo e retorna os valores necessários
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json() ) // THEN(ENTÃO) essa função reebe uma resposta(RES) com os dados convertidos em JSON
        //Usando um for para preencher todo o conteúdo com oque foi retornado, passando por cada elemento do JSON atribuindo ao "state" da variavel que pede(como parametro da função)
        .then( states => { 
            for(const state of states){
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>` //aqui o processo do FOR sendo executado
            }
        })
}       

populateUfs() //a função sendo executada


//------------------------------------------------------------------------------------------------------------


function getCities(){
        const citySelect = document.querySelector("select[name = city]")
        const stateInput = document.querySelector("input[name=state]")


        const ufValue = event.target.value

        //Pegar o estado selecionado de maneira flexivel
        const indexOfSelectedState = event.target.selectedIndex // atribuindo a variavel o modo que consegue puxar o target do selector
        stateInput.value = event.target.options[indexOfSelectedState].text // atribuindo de maneira texual


        const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

        citySelect.innerHTML = "<option value> Selecione a Cidade</option>"
        citySelect.disabled = true
         //fazendo uma promisse que busca os valores do JSON dessa API abaixo e retorna os valores necessários
    fetch(url)
    .then(res => res.json() ) // THEN(ENTÃO) essa função reebe uma resposta(RES) com os dados convertidos em JSON
    //Usando um for para preencher todo o conteúdo com oque foi retornado, passando por cada elemento do JSON atribuindo ao "city" da variavel que pede(como parametro da função)
    .then( cities => { 
        
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>` //aqui o processo do FOR sendo executado
        }

        citySelect.disabled = false //após a seleção, ele deixa o desable false
    })
}

document
.querySelector("select[name=uf")
    .addEventListener("change", getCities)

// Aqui podemos configurar o evento de click para pegar o target(no caso as li's)
const itemToCollect = document.querySelectorAll(".item-grid li")

for(const item of itemToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
// ---------------------------------------------------------------------


//Array de index selecionados
let selectedItems = [] // começa vazio

// Com essa função, podemos puxar apenas o ID do li, esse número vem do html(linha: 80 em diante). Isolamos apenas o data para trabalhar melhor
function handleSelectedItem(event){
    const itemLi = event.target

    //adicionar ou remover uma classe com JS
    //adicionar itemLi.classList.add("selected")
    //remover itemLi.classList.remove("selected")

    //para fazer os dois
    itemLi.classList.toggle("selected")
    //Pegando o index o click da lista
    const itemID = itemLi.dataset.id



    //Verificar se existem item selecionados, se sim pegar os selecionados
    //ARROW FUNCTION  const alreadySelected = selectedItems.findIndex(item => return  item == itemID) }

    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemID
        return itemFound
    })



    //Se já estiverem selecionados, tirar a seleção
    if(alreadySelected >= 0){
        //tirar da seleção
        const filteredItems = selectedItems.filter(item =>{
            const itemIsDifferent = item != itemID
            return itemIsDifferent
        })
        selectedItems = filteredItems
    }

    //Se não estiver selecionado, adicionar a seleção
    else{
        selectedItems.push(itemID)
    }

    console.log(selectedItems)
    //Atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}

