/**
 * Health Recommendations Database
 * Evidence-based health advice for different risk categories
 */

export const healthRecommendations = {
    metabolic: {
        high: {
            title: 'Metabolic Health Concerns',
            problems: [
                'Risk of Type 2 Diabetes',
                'Insulin Resistance',
                'Fatty Liver Disease',
                'Metabolic Syndrome'
            ],
            causes: [
                'Poor diet high in processed foods and sugar',
                'Sedentary lifestyle',
                'Excess body weight',
                'Irregular eating patterns'
            ],
            recommendations: [
                'Adopt a balanced diet rich in whole grains, vegetables, and lean proteins',
                'Limit sugar and processed food intake',
                'Engage in 150 minutes of moderate exercise weekly',
                'Monitor blood sugar levels regularly',
                'Maintain healthy body weight (BMI 18.5-24.9)',
                'Get 7-8 hours of quality sleep'
            ],
            urgency: 'Consult a doctor if you have family history of diabetes or notice symptoms like excessive thirst, frequent urination'
        },
        moderate: {
            title: 'Metabolic Health - Preventive Care',
            recommendations: [
                'Maintain balanced diet with regular meal times',
                'Include 30 minutes of daily physical activity',
                'Stay hydrated (8-10 glasses of water daily)',
                'Annual health checkups including blood sugar tests'
            ]
        }
    },

    cardiovascular: {
        high: {
            title: 'Heart Health Concerns',
            problems: [
                'Increased risk of Heart Disease',
                'High Blood Pressure',
                'Stroke Risk',
                'Poor Circulation'
            ],
            causes: [
                'High BMI and obesity',
                'Sedentary lifestyle',
                'Poor diet high in saturated fats',
                'Chronic stress',
                'Family history'
            ],
            recommendations: [
                'Reduce salt intake (less than 5g per day)',
                'Eat heart-healthy foods: fish, nuts, olive oil, vegetables',
                'Exercise regularly - aim for 30 minutes daily',
                'Quit smoking and limit alcohol',
                'Manage stress through meditation or yoga',
                'Monitor blood pressure regularly',
                'Maintain healthy weight'
            ],
            urgency: 'Seek immediate medical attention for chest pain, shortness of breath, or irregular heartbeat'
        }
    },

    eyeStrain: {
        high: {
            title: 'Eye Health & Digital Eye Strain',
            problems: [
                'Computer Vision Syndrome',
                'Dry Eyes',
                'Blurred Vision',
                'Headaches',
                'Increased risk of Myopia'
            ],
            causes: [
                'Excessive screen time (>8 hours daily)',
                'Poor lighting conditions',
                'Improper screen distance',
                'Lack of breaks',
                'Blue light exposure'
            ],
            recommendations: [
                'Follow 20-20-20 rule: Every 20 minutes, look 20 feet away for 20 seconds',
                'Use blue light filters on devices',
                'Maintain proper screen distance (arm\'s length)',
                'Ensure good lighting - avoid glare',
                'Blink frequently to prevent dry eyes',
                'Use artificial tears if needed',
                'Get regular eye checkups',
                'Limit screen time before bed'
            ],
            urgency: 'See an eye doctor if you experience persistent vision problems or eye pain'
        }
    },

    musculoskeletal: {
        high: {
            title: 'Bone & Joint Health',
            problems: [
                'Lower Back Pain',
                'Neck and Shoulder Pain',
                'Joint Stiffness',
                'Osteoporosis Risk',
                'Muscle Weakness'
            ],
            causes: [
                'Sedentary lifestyle',
                'Poor posture',
                'Lack of exercise',
                'Excess weight',
                'Aging',
                'Vitamin D deficiency'
            ],
            recommendations: [
                'Practice good posture while sitting and standing',
                'Take regular breaks from sitting - stand every 30 minutes',
                'Strengthen core muscles through exercises',
                'Include weight-bearing exercises',
                'Ensure adequate calcium and Vitamin D intake',
                'Use ergonomic furniture',
                'Stretch regularly',
                'Maintain healthy weight'
            ],
            urgency: 'Consult a doctor for persistent pain, numbness, or limited mobility'
        }
    },

    mentalHealth: {
        high: {
            title: 'Mental Wellbeing Concerns',
            problems: [
                'Stress and Anxiety',
                'Depression Risk',
                'Sleep Disorders',
                'Burnout',
                'Social Isolation'
            ],
            causes: [
                'Excessive screen time',
                'Work-related stress',
                'Lack of physical activity',
                'Poor sleep habits',
                'Social media overuse',
                'Unhealthy diet'
            ],
            recommendations: [
                'Limit screen time, especially before bed',
                'Practice mindfulness or meditation (10-15 minutes daily)',
                'Exercise regularly - boosts mood naturally',
                'Maintain social connections',
                'Establish healthy sleep routine',
                'Take regular breaks from work',
                'Pursue hobbies and interests',
                'Seek professional help if needed'
            ],
            urgency: 'Seek professional help if experiencing persistent sadness, anxiety, or thoughts of self-harm'
        }
    },

    digestive: {
        high: {
            title: 'Digestive Health Issues',
            problems: [
                'Indigestion and Bloating',
                'Acid Reflux (GERD)',
                'Irritable Bowel Syndrome',
                'Constipation',
                'Gastritis'
            ],
            causes: [
                'Poor diet - junk and processed foods',
                'Irregular eating patterns',
                'Lack of fiber',
                'Stress',
                'Insufficient water intake',
                'Sedentary lifestyle'
            ],
            recommendations: [
                'Eat regular, balanced meals',
                'Include fiber-rich foods: fruits, vegetables, whole grains',
                'Drink 8-10 glasses of water daily',
                'Avoid spicy, oily, and processed foods',
                'Eat slowly and chew thoroughly',
                'Exercise regularly to improve digestion',
                'Manage stress levels',
                'Avoid eating late at night'
            ],
            urgency: 'See a doctor for persistent abdominal pain, blood in stool, or unexplained weight loss'
        }
    },

    respiratory: {
        high: {
            title: 'Respiratory Health',
            problems: [
                'Breathing Difficulties',
                'Asthma Risk',
                'Chronic Cough',
                'Reduced Lung Capacity',
                'Air Pollution Effects'
            ],
            causes: [
                'Poor air quality (high AQI)',
                'Lack of physical activity',
                'Smoking or secondhand smoke',
                'Indoor air pollution',
                'Allergies'
            ],
            recommendations: [
                'Monitor AQI and limit outdoor activities when AQI > 200',
                'Use N95 masks in high pollution areas',
                'Keep indoor air clean - use air purifiers',
                'Practice breathing exercises',
                'Exercise regularly to improve lung capacity',
                'Avoid smoking and secondhand smoke',
                'Stay hydrated',
                'Get vaccinated (flu, pneumonia)'
            ],
            urgency: 'Seek immediate help for severe breathing difficulty, chest pain, or persistent cough with blood'
        }
    }
};

/**
 * Get recommendations based on risk assessment
 * @param {object} riskAssessment - Risk assessment results
 * @returns {array} Personalized recommendations
 */
export const getPersonalizedRecommendations = (riskAssessment) => {
    const { topConcerns } = riskAssessment;
    const recommendations = [];

    topConcerns.forEach(concern => {
        const category = concern.category.toLowerCase().replace(/ /g, '');
        const severity = concern.severity === 'high' || concern.severity === 'severe' ? 'high' : 'moderate';

        const categoryKey = Object.keys(healthRecommendations).find(key =>
            category.includes(key.toLowerCase())
        );

        if (categoryKey && healthRecommendations[categoryKey][severity]) {
            recommendations.push({
                ...healthRecommendations[categoryKey][severity],
                category: concern.category,
                score: concern.score,
                severity: concern.severity
            });
        }
    });

    return recommendations;
};
