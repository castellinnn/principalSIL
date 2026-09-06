import json

mainland = [
    (30, 50), # Aosta
    (50, 35), # Lombardy
    (90, 30), # Trentino
    (115, 35), # Friuli
    (110, 50), # Veneto
    (90, 60), # Emilia
    (115, 95), # Marche
    (135, 130), # Abruzzo
    (160, 160), # Gargano
    (165, 175), # Puglia north
    (195, 220), # Heel
    (170, 235), # Taranto
    (160, 225), # Basilicata
    (145, 255), # Toe
    (130, 255), # Calabria west
    (125, 230), # Campania south
    (105, 190), # Campania
    (85, 150), # Lazio
    (65, 110), # Tuscany
    (45, 90), # Liguria
    (25, 85), # Piemonte south
    (20, 65), # Piemonte west
]

sicily = [
    (125, 265),
    (140, 270),
    (135, 290),
    (105, 285),
    (100, 275),
]

sardinia = [
    (40, 160),
    (60, 160),
    (65, 190),
    (55, 215),
    (40, 210),
    (35, 180),
]

def to_path(points):
    return "M " + " L ".join(f"{x},{y}" for x, y in points) + " Z"

print(to_path(mainland))
print(to_path(sicily))
print(to_path(sardinia))
