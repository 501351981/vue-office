export function readOnlyInput(ref){
    let root = ref.value;
    if(root){
        let nodes = root.querySelectorAll('input');
        for(let node of nodes){
            node && !node.readOnly && (node.readOnly = true);
        }
        document.activeElement && document.activeElement.blur();
    }
}