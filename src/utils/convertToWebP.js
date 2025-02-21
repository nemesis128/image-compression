// src/utils/convertToWebP.js
export const convertImageToWebP = (file, quality = 0.8) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            // Crear un canvas con las dimensiones de la imagen
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            // Convertir la imagen a WebP con el nivel de calidad especificado
            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error('Error en la conversión'));
                }
            }, 'image/webp', quality);
        };

        img.onerror = () => reject(new Error('Error al cargar la imagen'));

        // Cargar la imagen a partir de un URL local
        img.src = URL.createObjectURL(file);
    });
};
