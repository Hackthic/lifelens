/**
 * Health Risk Calculator
 * Medical research-based health risk assessment
 */

/**
 * Calculate BMI (Body Mass Index)
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @returns {number} BMI value
 */
export const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
};

/**
 * Get BMI category based on WHO standards
 * @param {number} bmi - BMI value
 * @returns {object} Category with label, color, and health status
 */
export const getBMICategory = (bmi) => {
    if (bmi < 18.5) {
        return {
            label: 'Underweight',
            color: '#FFA726',
            bgColor: '#FFF3E0',
            risk: 'moderate',
            description: 'Below healthy weight range'
        };
    } else if (bmi < 25) {
        return {
            label: 'Normal',
            color: '#66BB6A',
            bgColor: '#E8F5E9',
            risk: 'low',
            description: 'Healthy weight range'
        };
    } else if (bmi < 30) {
        return {
            label: 'Overweight',
            color: '#FF9800',
            bgColor: '#FFF3E0',
            risk: 'moderate',
            description: 'Above healthy weight range'
        };
    } else if (bmi < 35) {
        return {
            label: 'Obese Class I',
            color: '#F44336',
            bgColor: '#FFEBEE',
            risk: 'high',
            description: 'Obesity - increased health risks'
        };
    } else if (bmi < 40) {
        return {
            label: 'Obese Class II',
            color: '#D32F2F',
            bgColor: '#FFCDD2',
            risk: 'high',
            description: 'Severe obesity - significant health risks'
        };
    } else {
        return {
            label: 'Obese Class III',
            color: '#B71C1C',
            bgColor: '#FFCDD2',
            risk: 'severe',
            description: 'Morbid obesity - critical health risks'
        };
    }
};

/**
 * Calculate comprehensive health risk score
 * @param {object} profile - User health profile
 * @returns {object} Risk assessment with scores and recommendations
 */
export const calculateHealthRisks = (profile) => {
    const risks = {
        metabolic: 0,
        cardiovascular: 0,
        eyeStrain: 0,
        musculoskeletal: 0,
        mentalHealth: 0,
        digestive: 0,
        respiratory: 0
    };

    const { age, bmi, occupation, physicalActivity, screenTime, diet } = profile;
    const bmiCategory = getBMICategory(bmi);

    // Metabolic Risk (BMI, diet, activity)
    if (bmi < 18.5) risks.metabolic += 30;
    else if (bmi >= 25 && bmi < 30) risks.metabolic += 40;
    else if (bmi >= 30) risks.metabolic += 70;

    if (diet === 'junk') risks.metabolic += 30;
    else if (diet === 'outside') risks.metabolic += 20;
    else if (diet === 'mixed') risks.metabolic += 10;

    if (physicalActivity === 'low') risks.metabolic += 25;
    else if (physicalActivity === 'moderate') risks.metabolic += 10;

    // Cardiovascular Risk
    if (age > 45) risks.cardiovascular += 20;
    if (bmi >= 25) risks.cardiovascular += 30;
    if (physicalActivity === 'low') risks.cardiovascular += 30;
    if (occupation === 'working_professional') risks.cardiovascular += 15;
    if (diet === 'junk' || diet === 'outside') risks.cardiovascular += 20;

    // Eye Strain Risk
    if (screenTime === 'heavy') risks.eyeStrain += 60;
    else if (screenTime === 'moderate') risks.eyeStrain += 35;
    else if (screenTime === 'low') risks.eyeStrain += 15;

    if (age > 40) risks.eyeStrain += 15;
    if (occupation === 'working_professional' || occupation === 'student') risks.eyeStrain += 20;

    // Musculoskeletal Risk
    if (physicalActivity === 'low') risks.musculoskeletal += 40;
    if (occupation === 'working_professional') risks.musculoskeletal += 25;
    if (age > 50) risks.musculoskeletal += 20;
    if (bmi >= 30) risks.musculoskeletal += 20;

    // Mental Health Risk
    if (screenTime === 'heavy') risks.mentalHealth += 35;
    if (physicalActivity === 'low') risks.mentalHealth += 30;
    if (occupation === 'working_professional') risks.mentalHealth += 20;
    if (diet === 'junk') risks.mentalHealth += 15;

    // Digestive Risk
    if (diet === 'junk') risks.digestive += 50;
    else if (diet === 'outside') risks.digestive += 35;
    if (physicalActivity === 'low') risks.digestive += 20;
    if (occupation === 'working_professional') risks.digestive += 15;

    // Respiratory Risk (will be enhanced with AQI data)
    if (physicalActivity === 'low') risks.respiratory += 20;
    if (age > 50) risks.respiratory += 15;

    // Calculate overall risk score (0-100)
    const overallRisk = Math.min(100, Math.round(
        (risks.metabolic * 0.2 +
            risks.cardiovascular * 0.2 +
            risks.eyeStrain * 0.15 +
            risks.musculoskeletal * 0.15 +
            risks.mentalHealth * 0.15 +
            risks.digestive * 0.1 +
            risks.respiratory * 0.05)
    ));

    return {
        risks,
        overallRisk,
        riskLevel: overallRisk < 30 ? 'low' : overallRisk < 60 ? 'moderate' : overallRisk < 80 ? 'high' : 'severe',
        topConcerns: getTopConcerns(risks),
        bmiCategory
    };
};

/**
 * Get top 3 health concerns
 * @param {object} risks - Risk scores by category
 * @returns {array} Top 3 concerns with scores
 */
const getTopConcerns = (risks) => {
    const concerns = Object.entries(risks)
        .map(([category, score]) => ({
            category: formatCategoryName(category),
            score,
            severity: score < 30 ? 'low' : score < 60 ? 'moderate' : score < 80 ? 'high' : 'severe'
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

    return concerns;
};

/**
 * Format category name for display
 * @param {string} category - Category key
 * @returns {string} Formatted name
 */
const formatCategoryName = (category) => {
    const names = {
        metabolic: 'Metabolic Health',
        cardiovascular: 'Heart Health',
        eyeStrain: 'Eye Health',
        musculoskeletal: 'Bone & Joint Health',
        mentalHealth: 'Mental Wellbeing',
        digestive: 'Digestive Health',
        respiratory: 'Respiratory Health'
    };
    return names[category] || category;
};

/**
 * Get screen time hours from category
 * @param {string} category - Screen time category
 * @returns {number} Average hours
 */
export const getScreenTimeHours = (category) => {
    const hours = {
        low: 3,
        moderate: 6,
        heavy: 10
    };
    return hours[category] || 6;
};
