import catchAsync from '../middleware/catchAsyncError.js';

/**
 * Controller for PulseCare AI Health Assistant
 * Developed by Vaibhava G
 */
export const queryAiHealthAssistant = catchAsync(async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({
      success: false,
      message: "Query field is required",
    });
  }

  const lower = query.toLowerCase();
  let assessment = {
    triageLevel: "General Advisory",
    summary: `Symptom evaluation completed for: "${query}".`,
    recommendations: [
      "Hydrate well and monitor your symptoms closely over the next 12 hours.",
      "Track your resting heart rate and blood pressure using the Health Logs tool.",
      "If symptoms persist or worsen, schedule a consultation with your primary physician.",
    ],
  };

  if (lower.includes("headache") || lower.includes("fever")) {
    assessment = {
      triageLevel: "Low to Moderate Risk",
      summary: "Potential tension headache, mild infection, or dehydration.",
      recommendations: [
        "Rest in a quiet, dark room and drink plenty of fluids.",
        "Check temperature and record readings in your health logs.",
        "Seek immediate care if experiencing stiff neck, sudden severe pain, or vision impairment.",
      ],
    };
  } else if (lower.includes("bp") || lower.includes("pressure") || lower.includes("hypertension")) {
    assessment = {
      triageLevel: "Preventive Care Alert",
      summary: "Cardiovascular health tracking recommendations.",
      recommendations: [
        "Limit dietary sodium intake to under 2,000 mg/day.",
        "Log blood pressure twice daily (morning and evening).",
        "Download your PDF Health Summary to share with your cardiologist.",
      ],
    };
  }

  res.status(200).json({
    success: true,
    author: "Vaibhava G",
    query,
    assessment,
    timestamp: new Date().toISOString(),
  });
});
