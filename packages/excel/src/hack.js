export function readOnlyInput(mutationsList, observer){
    console.log(mutationsList, observer);
    for(let mutation of mutationsList) {
        if(mutation.target.className === 'hide-input'){
            let input = mutation.target.childNodes[0];
            if(input){
                input.readOnly = true;
            }
        }
    }
}