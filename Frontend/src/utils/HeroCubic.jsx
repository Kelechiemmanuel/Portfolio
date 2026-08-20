import React, { useRef, useState, useEffect } from "react";

const TECH = [
    { label: "React", sub: "UI" },
    { label: "Node.js", sub: "Runtime" },
    { label: "PostgreSQL", sub: "Database" },
    { label: "Express", sub: "API" },
    { label: "JavaScript", sub: "Core" },
    { label: "Git", sub: "VCS" },
    { label: "MongoDB", sub: "Database" },
    { label: "Tailwind CSS", sub: "Styling" },
    { label: "Neon", sub: "Postgres" },
    { label: "Framer Motion", sub: "Animation" },
    { label: "python", sub: "Runtime" },
    { label: "AI Int", sub: "Trending" },
];

const HeroCubic = () => {
    const wrapRef = useRef(null);
    const [rotation, setRotation] = useState(0);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [hovering, setHovering] = useState(false);

    useEffect(() => {
        let animationFrame;
        let last = performance.now();

        const animate = (now) => {
            const delta = now - last;
            last = now;

            if (!hovering) {
                setRotation((prev) => prev + delta * 0.018);
            }

            animationFrame = requestAnimationFrame(animate);
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [hovering]);

    const handleMouseMove = (e) => {
        if (!wrapRef.current) return;

        const rect = wrapRef.current.getBoundingClientRect();

        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        setTilt({
            x: -y * 20,
            y: x * 25,
        });
    };

    const handleMouseLeave = () => {
        setHovering(false);
        setTilt({ x: 0, y: 0 });
    };

    return (
        <div className="w-full flex justify-center items-center">

            <div
                ref={wrapRef}
                className="relative w-150 h-150"
                style={{ perspective: "1200px" }}
                onMouseEnter={() => setHovering(true)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >

                {/* Ambient glow */}
                <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full dark:bg-slate-400/20 blur-3xl bg-white/10" />

                {/* MAIN 3D SCENE */}
                <div
                    className="absolute left-1/2 top-1/2 h-140 w-140"
                    style={{
                        transformStyle: "preserve-3d",
                        transform: `translate(-50%, -50%) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                        transition: "transform 0.08s linear",
                    }}
                >

                    {/* INNER ORBIT RING */}
                    <div
                        className="absolute left-1/2 top-1/2 h-108 w-108 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-400/20 dark:border-white/10"
                        style={{
                            transform: "rotateX(65deg)",
                            transformStyle: "preserve-3d",
                        }}
                    />

                    {/* SECOND ORBIT RING */}
                    <div
                        className="absolute left-1/2 top-1/2 h-108 w-108 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-900/10 dark:border-white/5"
                        style={{
                            transform: "rotateY(65deg)",
                            transformStyle: "preserve-3d",
                        }}
                    />

                    {/* TECHNOLOGY ORBIT - OUTSIDE THE RINGS */}
                    <div
                        className="absolute left-1/2 top-1/2 h-140 w-140"
                        style={{
                            transformStyle: "preserve-3d",
                            transform: `translate(-50%, -50%) rotateY(${rotation}deg)`,
                        }}
                    >
                        {TECH.map((tech, index) => {
                            const angle = (360 / TECH.length) * index;
                            const radius = 270;

                            return (
                                <div
                                    key={tech.label}
                                    className="absolute left-1/2 top-1/2 h-16 w-16"
                                    style={{
                                        transformStyle: "preserve-3d",
                                        transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`,
                                    }}
                                >
                                    <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full border border-slate-300/40 dark:bg-white/60 shadow-xl backdrop-blur-xl dark:border-white/20 bg-white/10">
                                        <span className="max-w-14 text-center text-[9px] font-bold leading-tight text-slate-900 dark:text-white">
                                            {tech.label}
                                        </span>

                                        <span className="mt-1 text-[6px] uppercase tracking-widest text-slate-500 dark:text-white/50">
                                            {tech.sub}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* STATIC CENTRAL GLOBE */}
                    <div
                        className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full"
                        style={{
                            background: `
                                radial-gradient(
                                    circle at 32% 28%,
                                    rgba(255,255,255,0.95) 0%,
                                    rgba(148,163,184,0.45) 18%,
                                    rgba(71,85,105,0.55) 45%,
                                    rgba(15,23,42,0.9) 78%,
                                    rgba(2,6,23,1) 100%
                                )
                            `,
                            boxShadow: `
                                inset -30px -30px 45px rgba(0,0,0,0.65),
                                inset 15px 15px 30px rgba(255,255,255,0.35),
                                0 0 35px rgba(148,163,184,0.35),
                                0 0 90px rgba(148,163,184,0.15)
                            `,
                            border: "1px solid rgba(255,255,255,0.3)",
                        }}
                    >

                        {/* Globe longitude */}
                        <div className="absolute left-[18%] top-[-5%] h-[110%] w-[64%] rounded-[50%] border border-white/15" />
                        <div className="absolute left-[28%] top-[-5%] h-[110%] w-[44%] rounded-[50%] border border-white/10" />
                        <div className="absolute left-[38%] top-[-5%] h-[110%] w-[24%] rounded-[50%] border border-white/10" />

                        {/* Globe latitude */}
                        <div className="absolute left-[-5%] top-[20%] h-[60%] w-[110%] rounded-[50%] border border-white/15" />
                        <div className="absolute left-[-5%] top-[35%] h-[30%] w-[110%] rounded-[50%] border border-white/10" />
                        <div className="absolute left-[-5%] top-[50%] h-[25%] w-[110%] rounded-[50%] border border-white/10" />

                        {/* Spherical shading */}
                        <div className="absolute inset-0 rounded-full bg-linear-to-br from-white/20 via-transparent to-black/50" />

                        {/* Highlight */}
                        <div className="absolute left-7 top-6 h-12 w-20 rotate-[-25deg] rounded-full bg-white/40 blur-lg" />

                        {/* Center content */}
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
                            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white drop-shadow-lg">
                                AKEStack
                            </span>

                            <span className="mt-1 font-mono text-[8px] uppercase text-slate-900 dark:text-white">
                                your world...
                            </span>
                        </div>

                    </div>

                </div>

                {/* Ground shadow */}
                <div className="absolute bottom-10 left-1/2 h-8 w-64 -translate-x-1/2 rounded-full bg-black/20 blur-xl" />

            </div>
        </div>
    );
};

export default HeroCubic;