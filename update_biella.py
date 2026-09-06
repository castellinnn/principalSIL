import re

with open('src/components/sections/PresenceRemote.tsx', 'r') as f:
    tsx = f.read()

# Replace Biella coordinates
tsx = tsx.replace('cx="280"', 'cx="210"')
tsx = tsx.replace('cy="250"', 'cy="160"')

# Replace in path d string: M 280,250 -> M 210,160
tsx = tsx.replace('M 280,250', 'M 210,160')
tsx = tsx.replace('(280 + pt.x)', '(210 + pt.x)')
tsx = tsx.replace('(250 + pt.y)', '(160 + pt.y)')

# Adjust the Biella label position
tsx = tsx.replace('top-[52px] left-[15px]', 'top-[30px] left-[10px]')

with open('src/components/sections/PresenceRemote.tsx', 'w') as f:
    f.write(tsx)

print("Updated Biella coords")
