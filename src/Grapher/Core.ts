import * as d3 from "d3";

export class Graph{
    host: HTMLDivElement;
    svg : d3.Selection<SVGElement, any, any, any>;
    selectedNode : Node;
    dragging : boolean = false;
    nodes : any = [];

    constructor(host: HTMLDivElement){
        this.host = host;
        this.svg = d3.create("svg");
        this.svg.attr("width", host.clientWidth);
        this.svg.attr("height", host.clientHeight);
        host.append(this.svg.node());

        document.addEventListener("add-node", () => {
            this.addNode();
        });

        document.addEventListener("drag-node", () => {
            this.dragging = true;
        });

        this.svg.on("mouseup", ()=>{ 
            this.dragging = false
            console.log("mouse released");
        });
        this.svg.on("mousemove", (e) => {
            if(this.dragging == false){ return };
            this.hDrag(e);
        });
    }

    addNode(){
        this.nodes.push(new Node(this));
    }

    hDrag(e : MouseEvent){  
        if (this.selectedNode == null) { return; }
        let ptr = d3.pointer(e);
        let cnode : Node = this.selectedNode;
        let node_svg = cnode.svg._groups[0][0] as SVGGElement
        let tx = node_svg.transform.baseVal.getItem(0);
        console.log(node_svg);
        console.log(ptr);
    }
}

export class Node{
    owner : Graph;
    svg : any;

    constructor(owner : Graph){
        this.owner = owner;
        this.svg = owner.svg.append("g");
        this.svg.append("rect")
        .attr("fill", "red")
        .attr("x", 100)
        .attr("y", 50)
        .attr("width", 100)
        .attr("height", 50)

        this.svg.append("rect")
        .attr("fill", "pink")
        .attr("x", 100)
        .attr("y", 50)
        .attr("width", 100)
        .attr("height", 20)

        this.svg.on("click", ()=>{
            console.log("Clicked");
        });
        
        this.svg.on("mousedown", ()=>{
            this.owner.selectedNode = this;
            document.dispatchEvent(new CustomEvent("drag-node"));
        });
    }

}
