const traces = [
  { left: "8%", top: "22%", width: "30%", delay: "0s" },
  { left: "62%", top: "27%", width: "27%", delay: ".35s" },
  { left: "5%", top: "67%", width: "34%", delay: ".7s" },
  { left: "61%", top: "72%", width: "31%", delay: "1.05s" },
  { left: "22%", top: "45%", width: "20%", delay: "1.4s" },
  { left: "58%", top: "48%", width: "22%", delay: "1.75s" },
];

const pins = Array.from({ length: 6 });

export default function NetworkBackground() {
  return (
    <div aria-hidden="true" className="hero-tech-background">
      <div className="hero-tech-grid" />
      <div className="hero-tech-halo" />

      <div className="hero-tech-perspective">
        <div className="hero-tech-board">
          <div className="hero-tech-board-grid" />

          {traces.map((trace, index) => (
            <span
              key={index}
              className="hero-tech-trace"
              style={{
                left: trace.left,
                top: trace.top,
                width: trace.width,
                animationDelay: trace.delay,
              }}
            >
              <i />
            </span>
          ))}

          <div className="hero-tech-module module-a"><b /><b /><b /></div>
          <div className="hero-tech-module module-b"><b /><b /><b /></div>
          <div className="hero-tech-module module-c"><b /><b /><b /></div>
          <div className="hero-tech-module module-d"><b /><b /><b /></div>

          <div className="hero-tech-chip">
            <div className="hero-tech-chip-core">
              <span className="hero-tech-core-ring" />
              <span className="hero-tech-core-mark">P</span>
            </div>
            <div className="hero-tech-pins pins-top">{pins.map((_, index) => <i key={index} />)}</div>
            <div className="hero-tech-pins pins-bottom">{pins.map((_, index) => <i key={index} />)}</div>
            <div className="hero-tech-pins pins-left">{pins.map((_, index) => <i key={index} />)}</div>
            <div className="hero-tech-pins pins-right">{pins.map((_, index) => <i key={index} />)}</div>
          </div>

          <div className="hero-tech-hologram">
            <span className="hologram-orbit orbit-one" />
            <span className="hologram-orbit orbit-two" />
            <span className="hologram-core" />
          </div>
        </div>
      </div>

      <div className="hero-tech-vignette" />
    </div>
  );
}
