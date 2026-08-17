import { Config } from './config.js';

export const UI = {
    bindInputs: () => {
        // Set default date input value to today so it displays correctly
        const dateInput = document.getElementById('inDate');
        dateInput.valueAsDate = new Date();

        document.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('input', UI.sync);
        });
        document.getElementById('inPhoto').addEventListener('change', UI.handlePhoto);
        
        UI.sync(); 
    },

    handlePhoto: (e) => {
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => document.getElementById('outPhoto').src = event.target.result;
            reader.readAsDataURL(e.target.files[0]);
        }
    },

    formatDisplayDate: (dateString) => {
        if(!dateString) return '--';
        const d = new Date(dateString);
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    },

    sync: () => {
        // Demographics mapping
        document.getElementById('outName').innerText = document.getElementById('inName').value || '--';
        document.getElementById('outAge').innerText = document.getElementById('inAge').value || '--';
        document.getElementById('outSex').innerText = document.getElementById('inSex').value || '--';
        document.getElementById('outAssessor').innerText = document.getElementById('inAssessor').value || '--';
        
        const dateStr = UI.formatDisplayDate(document.getElementById('inDate').value);
        document.getElementById('outDate').innerText = dateStr;
        document.getElementById('tblHistDate').innerText = dateStr;

        const height = parseFloat(document.getElementById('inHeight').value) || 0;
        if(height > 0) {
            document.getElementById('outHeight').innerText = `${Math.floor(height/12)}.${(height%12).toFixed(1)} FT (${height} IN)`;
        } else {
            document.getElementById('outHeight').innerText = '--';
        }

        // Metrics Mapping
        const w = parseFloat(document.getElementById('inWeight').value);
        const f = parseFloat(document.getElementById('inFat').value);
        const m = parseFloat(document.getElementById('inMuscle').value);
        const bmi = Config.calcBMI(w, height);

        UI.mapGridVal('outWeight', w, 'kg');
        UI.mapGridVal('outBMI', bmi, '');
        UI.mapGridVal('outFat', f, '%');
        UI.mapGridVal('outMuscle', m, 'kg');
        UI.mapGridVal('outMuscleRate', parseFloat(document.getElementById('inMuscleRate').value), '%');
        UI.mapGridVal('outWater', parseFloat(document.getElementById('inWater').value), '%');
        UI.mapGridVal('outBone', parseFloat(document.getElementById('inBone').value), 'kg');
        UI.mapGridVal('outBMR', parseFloat(document.getElementById('inBMR').value), 'kcal', true);
        UI.mapGridVal('outMetabolicAge', parseFloat(document.getElementById('inMetabolicAge').value), '', true);
        UI.mapGridVal('outVisceral', parseFloat(document.getElementById('inVisceral').value), '');
        UI.mapGridVal('outSubcutaneous', parseFloat(document.getElementById('inSubcutaneous').value), '%');
        UI.mapGridVal('outProtein', parseFloat(document.getElementById('inProtein').value), 'kg');
        UI.mapGridVal('outSkeletal', parseFloat(document.getElementById('inSkeletal').value), 'kg');
        UI.mapGridVal('outFatMass', parseFloat(document.getElementById('inFatMass').value), 'kg');
        UI.mapGridVal('outNoFatWeight', parseFloat(document.getElementById('inNoFatWeight').value), 'kg');
        UI.mapGridVal('outIdealWeight', parseFloat(document.getElementById('inIdealWeight').value), 'kg');

        // Dynamic Tables
        document.getElementById('tblCurrWeight').innerText = w ? `${w} Kg` : '--';
        document.getElementById('tblCurrFat').innerText = f ? `${f} %` : '--';
        document.getElementById('tblCurrMuscle').innerText = m ? `${m} Kg` : '--';
        
        document.getElementById('tblHistWeight').innerText = w ? w : '--';
        document.getElementById('tblHistFat').innerText = f ? f : '--';
        document.getElementById('tblHistMuscle').innerText = m ? m : '--';

        // Target Calculations
        const sex = document.getElementById('inSex').value;
        const targets = Config.calcTargets(w, f, m, sex, height);
        
        document.getElementById('tblTargetWeight').innerText = targets.tWeight !== '--' ? `${targets.tWeight} Kg` : '--';
        document.getElementById('tblTargetFat').innerText = targets.tFat !== '--' ? `${targets.tFat} %` : '--';
        document.getElementById('tblTargetMuscle').innerText = targets.tMuscle !== '--' ? `${targets.tMuscle} Kg` : '--';
    },

    mapGridVal: (id, value, unit, isInt = false) => {
        const el = document.getElementById(id);
        if (!value || isNaN(value)) {
            el.innerText = '--';
            return;
        }
        const formatted = isInt ? Math.round(value) : value.toFixed(2);
        el.innerHTML = `${formatted}<span style="font-size:10px; font-weight:normal; margin-left:2px;">${unit}</span>`;
    }
};