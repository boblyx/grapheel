import * as d3 from "d3";

export class Graph{
    host: HTMLDivElement;
    svg : d3.Selection<SVGElement, any, any, any>;
    baseSvg : SVGSVGElement;
    selectedNode : Node;
    refpt : SVGPoint;
    dragging : boolean = false;
    mouseOffset : number[] = [0,0];
    nodes : any = [];

    constructor(host: HTMLDivElement){
        this.host = host;
        this.svg = d3.create("svg");
        this.svg.attr("width", host.clientWidth);
        this.svg.attr("height", host.clientHeight);
        host.append(this.svg.node());
        this.baseSvg = this.svg["_groups"][0][0];
        this.refpt = this.baseSvg.createSVGPoint();

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
        this.nodes.push(new Node(this, [100,100]));
    }

    hDrag(e : MouseEvent){  
        if (this.selectedNode == null) { return; }
        let ptr = d3.pointer(e);
        let cnode : Node = this.selectedNode;
        let node_svg = cnode.svg._groups[0][0] as SVGGElement
        let tx = node_svg.transform.baseVal.getItem(0);
        tx.setTranslate(ptr[0] -  cnode.mouseOffset[0], ptr[1] - cnode.mouseOffset[1]);

    }
}

export class Node{
    owner : Graph;
    svg : any;
    baseSvg : SVGGElement;
    coords : number[];
    tx : SVGTransform;
    mouseOffset : number[];

    constructor(owner : Graph, coords : number[] = [0,0]){
        this.owner = owner;
        this.svg = owner.svg.append("g");
        this.svg.append("rect")
        .attr("fill", "red")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 100)
        .attr("height", 50)

        this.svg.append("rect")
        .attr("fill", "pink")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 100)
        .attr("height", 20)

        this.svg.on("click", ()=>{
            console.log("clicked");
        });

        let btx = owner.svg["_groups"][0][0].createSVGTransform() as SVGTransform;
        btx.setTranslate(coords[0], coords[1]);
        this.tx = btx;
        let g = this.svg._groups[0][0] as SVGGElement;
        g.transform.baseVal.appendItem(btx);
        
        this.svg.on("mousedown", (e : MouseEvent)=>{
          this.owner.selectedNode = this;
          let ptr = d3.pointer(e);
          this.mouseOffset = [ptr[0], ptr[1]]
            document.dispatchEvent(new CustomEvent("drag-node"));
        });
    }

}
