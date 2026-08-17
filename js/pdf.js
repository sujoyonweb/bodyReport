export const ExportService = {
    prepareScale: (isExporting) => {
        const wrapper = document.getElementById('previewWrapper');
        wrapper.style.transform = isExporting ? 'scale(1)' : 'scale(0.75)';
    },

    getFileName: (ext) => {
        const name = document.getElementById('inName').value || 'Report';
        return `${name.replace(/\s+/g, '_')}_Composition.${ext}`;
    },

    downloadPDF: () => {
        ExportService.prepareScale(true);
        const element = document.getElementById('pdfContent');
        
        const opt = {
            margin: 0,
            filename: ExportService.getFileName('pdf'),
            image: { type: 'jpeg', quality: 1.0 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        setTimeout(() => {
            html2pdf().set(opt).from(element).save().then(() => ExportService.prepareScale(false));
        }, 150);
    },

    downloadPNG: () => {
        ExportService.prepareScale(true);
        const element = document.getElementById('pdfContent');
        
        setTimeout(() => {
            html2canvas(element, { scale: 2, useCORS: true }).then(canvas => {
                const link = document.createElement('a');
                link.download = ExportService.getFileName('png');
                link.href = canvas.toDataURL('image/png');
                link.click();
                ExportService.prepareScale(false);
            });
        }, 150);
    }
};