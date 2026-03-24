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
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const graphRef = useRef();
    const containerRef = useRef();

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/graph`);
                setGraphData({
                    nodes: res.data.nodes || [],
                    links: res.data.edges || []
                });
            } catch (err) {
                console.error("Error fetching graph data:", err);
            }
        };
        fetchData();
    }, []);

    // Track container size
    useEffect(() => {
        if (!containerRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                setDimensions({ width, height });
            }
        });

        resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    // Zoom to fit when data or dimensions change
    useEffect(() => {
        if (!graphData.nodes.length || !graphRef.current) return;

        const timers = [
            setTimeout(() => graphRef.current?.zoomToFit(600, 150), 400),
            setTimeout(() => graphRef.current?.zoomToFit(1000, 150), 1500),
            setTimeout(() => graphRef.current?.zoomToFit(1400, 150), 3500)
        ];

        return () => timers.forEach(clearTimeout);
    }, [graphData, dimensions]);

    return (
        <div ref={containerRef} className="graph-container w-full h-full bg-[#020617] relative">
            {dimensions.width > 0 && dimensions.height > 0 ? (
                <>
                    {graphData.nodes.length > 0 ? (
                        <ForceGraph3D
                            ref={graphRef}
                            graphData={graphData}
                            width={dimensions.width}
                            height={dimensions.height}
                            backgroundColor="#020617"
                            showNavInfo={false}
                            nodeRelSize={9}
                            nodeColor={(node) => nodeColors[node.type] || '#ffffff'}
                            linkDirectionalArrowLength={4}
                            linkDirectionalArrowRelPos={1}
                            linkColor={() => 'rgba(255, 255, 255, 0.12)'}
                            linkWidth={1.8}
                            linkDirectionalParticles={4}
                            linkDirectionalParticleSpeed={0.008}
                            d3AlphaDecay={0.02}
                            onEngineStop={() => {
                                graphRef.current?.zoomToFit(1000, 150);
                            }}
                            nodeLabel={(node) => `
                                <div class="glass p-5 rounded-2xl border border-white/10 shadow-2xl min-w-[240px]">
                                    <div class="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-3">${node.type || 'Entity'}</div>
                                    <div class="text-[11px] font-mono text-white/90 font-bold mb-4 bg-white/10 p-2 rounded-lg">${node.id || ''}</div>
                                    <div class="space-y-2 pt-3 border-t border-white/5">
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
                                const distance = 100;
                                const dist = Math.hypot(node.x || 0, node.y || 0, node.z || 0) || 1;
                                const distRatio = 1 + distance / dist;

                                graphRef.current.cameraPosition(
                                    {
                                        x: (node.x || 0) * distRatio,
                                        y: (node.y || 0) * distRatio,
                                        z: (node.z || 0) * distRatio
                                    },
                                    node,
                                    1500
                                );
                            }}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 italic">Synthesizing Graph Topology...</p>
                            </div>
                        </div>
                    )}

                    <div className="absolute top-8 right-8 z-50">
                        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 p-5 rounded-3xl shadow-2xl space-y-4">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Entity Types</h3>
                            <div className="flex flex-col gap-3">
                                {Object.entries(nodeColors).map(([type, color]) => (
                                    <div key={type} className="flex items-center gap-3 group px-1">
                                        <div
                                            className="w-2.5 h-2.5 rounded-full ring-4 ring-white/5 shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-transform group-hover:scale-125"
                                            style={{ backgroundColor: color }}
                                        />
                                        <span className="text-[11px] text-slate-300 font-semibold tracking-wide group-hover:text-white transition-colors">{type}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default GraphCanvas;