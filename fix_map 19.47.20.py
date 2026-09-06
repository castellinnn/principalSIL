import re

with open('public/images/italy.svg', 'r') as f:
    svg_content = f.read()

# Extract the <g transform="...">...</g> block
match = re.search(r'(<g transform="[^"]+"[\s\S]*?</g>)', svg_content)
if not match:
    print("Could not find <g> tag in SVG")
    exit(1)

g_tag = match.group(1)
# Replace fill="#000000" with fill="currentColor"
g_tag = g_tag.replace('fill="#000000"', 'fill="currentColor"').replace('stroke="none"', 'opacity="0.2"')

with open('src/components/sections/PresenceRemote.tsx', 'r') as f:
    tsx = f.read()

# Replace the inner SVG part
new_svg_start = '''<svg viewBox="0 0 1024 1024" className="w-full h-full text-white" fill="currentColor">
                  ''' + g_tag + '''
                  
                  {/* Pulsing local point: Biella (North-West) */}
                  <g className="text-primary">
                    <circle cx="280" cy="250" r="15" fill="#2563EB" />
                    {/* Ring animation */}
                    <motion.circle
                      cx="280"
                      cy="250"
                      r="40"
                      stroke="#2563EB"
                      strokeWidth="3"
                      fill="none"
                      initial={{ scale: 0.5, opacity: 1 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                    />
                  </g>

                  {/* Remote target points throughout Italy */}
                  {[
                    { x: 450, y: 500, delay: 0.2 }, // Central Italy
                    { x: 550, y: 650, delay: 0.4 }, // South-Central
                    { x: 750, y: 700, delay: 0.6 }, // South
                    { x: 550, y: 900, delay: 0.8 }, // Sicily
                    { x: 250, y: 650, delay: 1.0 }, // Sardinia
                    { x: 450, y: 250, delay: 0.0 }  // North-East
                  ].map((pt, i) => (
                    <g key={i}>
                      <circle cx={pt.x} cy={pt.y} r="8" fill="#22D3EE" opacity="0.8" />
                      {/* Connection Line from Biella to target points */}
                      <motion.path
                        d={`M 280,250 Q ${(280 + pt.x)/2 - 50} ${(250 + pt.y)/2 - 50} ${pt.x},${pt.y}`}
                        stroke="url(#gradient-line)"
                        strokeWidth="3"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 0.6 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, delay: pt.delay, ease: "easeOut" }}
                      />
                    </g>
                  ))}

                  {/* Gradient for lines */}
                  <defs>
                    <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                </svg>'''

# Replace from <svg viewBox="0 0 200 300"... to </svg>
tsx = re.sub(r'<svg viewBox="0 0 200 300"[\s\S]*?</svg>', new_svg_start, tsx)

with open('src/components/sections/PresenceRemote.tsx', 'w') as f:
    f.write(tsx)

print("Replaced SVG in PresenceRemote.tsx")
