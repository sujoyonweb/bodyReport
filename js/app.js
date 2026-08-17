import { UI } from './ui.js';
import { ExportService } from './pdf.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize DOM mapping & logic
    UI.bindInputs();

    // 2. Bind Export Actions
    document.getElementById('btnDownloadPDF').addEventListener('click', (e) => {
        const btn = e.target;
        btn.innerText = "PROCESSING...";
        ExportService.downloadPDF();
        setTimeout(() => btn.innerText = "DOWNLOAD PDF", 2000);
    });

    document.getElementById('btnDownloadPNG').addEventListener('click', (e) => {
        const btn = e.target;
        btn.innerText = "PROCESSING...";
        ExportService.downloadPNG();
        setTimeout(() => btn.innerText = "DOWNLOAD PNG", 2000);
    });
});