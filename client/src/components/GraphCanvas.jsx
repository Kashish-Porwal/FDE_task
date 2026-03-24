import React, { useRef, useEffect, useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import axios from 'axios';

const nodeColors = {
    "Journal Entry": "#f87171",
    "Billing Document": "#60a5fa",
    "Sales Order": "#4ade80",
    "Outbound Delivery": "#fbbf24"
};

const GraphCanvas = () => {
    const [graphData, setGraphData] = useState({ nodes: [], links: [] });
    const graphRef = useRef();

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/graph`);
                setGraphData({
                    nodes: res.data.nodes,
                    links: res.data.edges
                });
            } catch (err) {
                console.error("Error fetching graph data:", err);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!graphData.nodes.length || !graphRef.current) return;

        const t1 = setTimeout(() => {
            graphRef.current?.zoomToFit(1200, 100);
        }, 500);

        const t2 = setTimeout(() => {
            graphRef.current?.zoomToFit(1200, 100);
        }, 1800);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, [graphData]);

    return (
        <div className="graph-container bg-[#020617] relative">
            <ForceGraph3D
                ref={graphRef}
                graphData={graphData}
                backgroundColor="#020617"
                showNavInfo={false}
                nodeRelSize={7}
                nodeColor={(node) => nodeColors[node.type] || '#ffffff'}
                linkDirectionalArrowLength={4}
                linkDirectionalArrowRelPos={1}
                linkColor={() => 'rgba(255, 255, 255, 0.08)'}
                linkWidth={1.5}
                linkDirectionalParticles={3}
                linkDirectionalParticleSpeed={0.006}
                cooldownTicks={100}
                onEngineStop={() => {
                    graphRef.current?.zoomToFit(1200, 100);
                }}
                nodeLabel={(node) => `
                    <div class="glass p-4 rounded-2xl border border-white/10 shadow-2xl min-w-[220px]">
                        <div class="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-2">${node.type || 'Entity'}</div>
                        <div class="text-xs font-mono text-white/90 font-bold mb-3">${node.id || ''}</div>
                        <div class="space-y-1.5 pt-3 border-t border-white/5">
                            ${Object.entries(node.details || {}).map(([k, v]) => `
                                <div class="flex justify-between items-center gap-4">
                                    <span class="text-[9px] text-white/30 uppercase font-black tracking-wider">${k}</span>
                                    <span class="text-[10px] text-white/80 font-mono">${v}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `}
                onNodeClick={(node) => {
                    const distance = 60;
                    const dist = Math.hypot(node.x || 0, node.y || 0, node.z || 0) || 1;
                    const distRatio = 1 + distance / dist;

                    graphRef.current.cameraPosition(
                        {
                            x: (node.x || 0) * distRatio,
                            y: (node.y || 0) * distRatio,
                            z: (node.z || 0) * distRatio
                        },
                        node,
                        2000
                    );
                }}
            />

            <div className="absolute top-8 right-8 z-50">
                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 p-5 rounded-3xl shadow-2xl space-y-4">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Entity Types</h3>
                    <div className="flex flex-col gap-3">
                        {Object.entries(nodeColors).map(([type, color]) => (
                            <div key={type} className="flex items-center gap-3">
                                <div
                                    className="w-2.5 h-2.5 rounded-full ring-4 ring-white/5"
                                    style={{ backgroundColor: color }}
                                />
                                <span className="text-[11px] text-slate-300 font-semibold tracking-wide">{type}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GraphCanvas;