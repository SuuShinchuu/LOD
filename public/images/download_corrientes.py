import os
import requests

# Lista de nombres de los archivos tal como aparecen en tu HTML
items = [
    "Aceite de farol",
    "Amuleto",
    "Anillo (2)",
    "Anillo",
    "Antorcha (2)",
    "Antorcha (3)",
    "Antorcha",
    "Arco corto",
    "Armadura acolchada",
    "Armadura de cuero tachonado",
    "Armadura de cuero",
    "Armadura de escamas",
    "Bastón",
    "Botellas vacías",
    "Capa",
    "Carne seca",
    "Cuchillo desollador",
    "Cuerda vieja",
    "Daga",
    "Dagas arrojadizas",
    "Escudo",
    "Espada corta",
    "Estoque",
    "Farol",
    "Flechas (2)",
    "Flechas (3)",
    "Flechas",
    "Ganzúas",
    "Hachas arrojadizas",
    "Honda",
    "Ingredientes (2)",
    "Ingredientes",
    "Jabalina",
    "Jabalinas",
    "Mochila mediana",
    "Monedas (2)",
    "Monedas (3)",
    "Monedas (4)",
    "Monedas (5)",
    "Monedas (6)",
    "Monedas (7)",
    "Monedas",
    "Palanca",
    "Parte para pociones",
    "Piedra de afilar",
    "pieles de lobo",
    "Raciones (2)",
    "Raciones",
    "Receta",
    "Saco de dormir (2)",
    "Saco de dormir",
    "Tesoro maravilloso",
    "Tesoro superior",
    "Trampa para osos",
    "Trampas de cacería",
    "Vendas (2)",
    "Vendas (3)",
    "Vendas",
    "Virotes",
]

# Base URL donde están los archivos
base_url = "https://sithnecro.github.io/Test5/img/Tesoros_Corrientes/"

# Crear la carpeta de descargas si no existe
output_folder = "descargas"
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

# Función para convertir los nombres de los archivos en URLs
def generar_url(nombre):
    # Reemplazar espacios por %20 y agregar ".png" al final
    return base_url + nombre.replace(" ", "%20") + ".png"

# Descargar las imágenes
for item in items:
    url = generar_url(item)
    file_name = url.split("/")[-1]
    file_path = os.path.join(output_folder, file_name)

    print(f"Descargando {url}...")
    try:
        response = requests.get(url)
        if response.status_code == 200:
            with open(file_path, "wb") as file:
                file.write(response.content)
            print(f"Imagen guardada en {file_path}")
        else:
            print(f"Error al descargar {url}")
    except Exception as e:
        print(f"Error al intentar descargar {url}: {e}")

print("Descarga completada.")

