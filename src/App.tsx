import { onCleanup, onMount } from 'solid-js';
import type { Component } from 'solid-js';
import * as bootstrap from 'bootstrap';
import * as d3 from "d3";
import { Graph } from './Grapher/Core';


const App: Component = () => {
    onMount(()=>{
        let canvas = document.querySelector("#canvas") as HTMLDivElement;
        let graph = new Graph(canvas);
    });
    return (

    <>
        <div class = "container-fluid bg-dark p-4" style="height:100svh;">
            <div class="text-light">
                <h1>Test Node Canvas</h1>
                <div id = "controls" class = "container-fluid"> 
                    <button onclick = {() => 
                    {document.dispatchEvent(new CustomEvent("add-node"))}} 
                    class="btn btn-primary">Add Node</button>
                </div>
                <div id="canvas" class="container-fluid" style="height: 85svh">
                </div>
            </div>
        </div>
    </>
    )

};

export default App;
