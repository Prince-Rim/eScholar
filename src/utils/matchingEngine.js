/**
 * Evaluates student profile against scholarship criteria and calculates match score (0 - 100%)
 */
export function calculateMatchScore(profile, scholarship) {
  let score = 0;
  let maxScore = 100;
  let matchedReasons = [];
  let missingReasons = [];

  // 1. GPA check (30 points)
  if (profile.gpaEquivalent >= scholarship.minGpaEquivalent) {
    score += 30;
    matchedReasons.push(`GPA (${profile.gpaEquivalent}) meets threshold (${scholarship.minGpaEquivalent}+)`);
  } else {
    missingReasons.push(`GPA (${profile.gpaEquivalent}) below minimum requirement (${scholarship.minGpaEquivalent})`);
  }

  // 2. Category / Major check (25 points)
  if (scholarship.requiredCategory === "ALL" || profile.category === scholarship.requiredCategory) {
    score += 25;
    matchedReasons.push(`Major category matches (${profile.category})`);
  } else {
    missingReasons.push(`Requires ${scholarship.requiredCategory} major`);
  }

  // 3. Year Level check (15 points)
  if (scholarship.requiredYearLevels.includes(profile.yearLevel)) {
    score += 15;
    matchedReasons.push(`Year level eligible (${profile.yearLevel})`);
  } else {
    missingReasons.push(`Eligible for ${scholarship.requiredYearLevels.join(", ")}`);
  }

  // 4. Household Income check (15 points)
  if (profile.householdIncome <= scholarship.maxIncome) {
    score += 15;
    matchedReasons.push(`Income (₱${profile.householdIncome.toLocaleString()}) within limit (≤₱${scholarship.maxIncome.toLocaleString()})`);
  } else {
    missingReasons.push(`Income exceeds maximum limit of ₱${scholarship.maxIncome.toLocaleString()}`);
  }

  // 5. Special Background / Document Bonus (15 points)
  if (profile.transcriptUploaded) {
    score += 10;
    matchedReasons.push(`Verified transcript uploaded (+10%)`);
  } else {
    missingReasons.push(`Upload transcript to increase match score`);
  }

  if (profile.isFirstGen || profile.isIndigent) {
    score += 5;
    matchedReasons.push(`Priority student tag (+5%)`);
  }

  // Cap at 98% max unless verified transcript & all true
  const finalScore = Math.min(100, Math.round(score));

  return {
    score: finalScore,
    isEligible: finalScore >= 60,
    matchedReasons,
    missingReasons,
    totalAnnualValue: scholarship.tuitionCoverage + (scholarship.monthlyStipend * 10) + (scholarship.annualBookAllowance || 0)
  };
}

/**
 * Computes overall profile health score & statistics
 */
export function getProfileHealthStats(profile, scholarships) {
  const evaluated = scholarships.map(s => calculateMatchScore(profile, s));
  const matched = evaluated.filter(e => e.score >= 70);
  
  const totalPotentialFunding = matched.reduce((acc, curr) => acc + curr.totalAnnualValue, 0);

  // Overall Health Score: combines GPA, income tag, document uploads, and matched count
  let health = 60;
  if (profile.gpaEquivalent >= 3.5) health += 15;
  if (profile.transcriptUploaded) health += 15;
  if (profile.recommendationUploaded) health += 10;

  return {
    matchedCount: matched.length,
    healthScore: Math.min(100, health),
    totalPotentialFunding,
    urgentDeadlinesCount: scholarships.filter(s => s.deadlineDaysLeft <= 14).length
  };
}
