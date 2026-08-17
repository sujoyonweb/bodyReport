export const Config = {
    calcBMI: (weightKg, heightInches) => {
        if (!weightKg || !heightInches) return null;
        return (703 * ((weightKg * 2.20462) / (heightInches * heightInches)));
    },

    /**
     * Calculates achievable, science-based 3-month targets
     */
    calcTargets: (weight, fat, muscle, sex, heightInches) => {
        let tWeight = '--', tFat = '--', tMuscle = '--';

        // Muscle Target: ~0.5kg natural growth per month = 1.5kg in 3 months
        if (muscle && !isNaN(muscle)) {
            tMuscle = (parseFloat(muscle) + 1.5).toFixed(2);
        }

        // Fat Target: Safe loss is ~1% per month = 3% in 3 months
        if (fat && !isNaN(fat)) {
            const f = parseFloat(fat);
            const optimalMax = sex === 'Male' ? 15 : 24;
            
            if (f > optimalMax) {
                // If above optimal, aim to lose 3%
                tFat = (f - 3.0).toFixed(2);
            } else {
                // If already optimal, maintain
                tFat = f.toFixed(2);
            }
        }

        // Weight Target: Based on BMI and Fat
        if (weight && !isNaN(weight) && heightInches) {
            const w = parseFloat(weight);
            const bmi = Config.calcBMI(w, heightInches);

            if (bmi > 25) {
                // Overweight: Safe loss of ~3kg over 3 months while gaining some muscle
                tWeight = (w - 3.0).toFixed(2);
            } else if (bmi < 18.5) {
                // Underweight: Aim to gain ~3kg mass
                tWeight = (w + 3.0).toFixed(2);
            } else {
                // Optimal: Slight increase due to natural muscle gain (+1kg)
                tWeight = (w + 1.0).toFixed(2);
            }
        }

        return { tWeight, tFat, tMuscle };
    }
};