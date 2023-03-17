export function readOnlyInput(ref){
    let root = ref.value;
    if(root){
        let nodes = root.querySelectorAll('.hide-input');
        console.log(nodes);
        for(let node of nodes){
            let input = node.childNodes[0];
            input && !input.readOnly && (input.readOnly = true);
        }
        document.activeElement && document.activeElement.blur();
    }
}