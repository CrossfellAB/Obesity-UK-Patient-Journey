import React, { useState } from 'react';
// Test Headline
// Sample data based on UK Type 2 Diabetes patient journey research
const journeyStagesData = [
  {
    id: 1,
    name: "Symptom Onset",
    description: "Period when patients first experience symptoms prior to diagnosis",
    activities: [
      "Initial symptoms appear (thirst, frequent urination, fatigue)",
      "Self-research online for symptoms",
      "Consult family/friends",
      "Delay seeking care (average 1-2 years)",
      "Schedule GP appointment"
    ],
    painPoints: [
      "Symptom ambiguity leads to delayed care seeking",
      "Misinformation from online sources",
      "Care access barriers (appointment availability)",
      "Lack of awareness about diabetes symptoms",
      "Fear of potential diagnosis"
    ],
    stakeholders: [
      { name: "Primary Care Physician", involvement: "Low" },
      { name: "Practice Nurse", involvement: "Low" },
      { name: "Family/Carers", involvement: "Medium" }
    ],
    infoSources: [
      "Online health websites",
      "Family and friends",
      "Social media",
      "NHS 111 service"
    ],
    decisionPoints: [
      { 
        name: "Seeking Medical Help", 
        description: "Decision to consult with healthcare professional",
        keyFactors: ["Symptom severity", "Impact on daily activities", "Encouragement from family"]
      }
    ],
    dropoutRate: 0.45,
    emotionalState: "Concern/Worry"
  },
  {
    id: 2,
    name: "Diagnosis",
    description: "The process of confirming Type 2 diabetes through testing and assessment",
    activities: [
      "Initial GP consultation",
      "Blood glucose testing (HbA1c test)",
      "Review of test results",
      "Formal diagnosis",
      "Initial medication prescription (if needed)",
      "Basic lifestyle advice"
    ],
    painPoints: [
      "Testing delays (waiting for appointments/results)",
      "Communication gaps in explaining diagnosis",
      "Emotional distress and anxiety following diagnosis",
      "Limited time for comprehensive education during GP visit",
      "Information overload at diagnosis"
    ],
    stakeholders: [
      { name: "Primary Care Physician", involvement: "High" },
      { name: "Practice Nurse", involvement: "Medium" },
      { name: "Phlebotomist", involvement: "Medium" },
      { name: "Laboratory Staff", involvement: "Medium" },
      { name: "Family/Carers", involvement: "Medium" }
    ],
    infoSources: [
      "GP explanation",
      "NHS leaflets and materials",
      "Diabetes UK website",
      "Hospital diagnosis materials"
    ],
    decisionPoints: [
      { 
        name: "Treatment Initiation", 
        description: "Decision on initial management approach",
        keyFactors: ["HbA1c level", "Presence of symptoms", "Comorbidities", "Patient preferences"]
      },
      { 
        name: "Education Referral", 
        description: "Decision to refer to structured education",
        keyFactors: ["Local availability", "Patient willingness", "GP awareness of programs"]
      }
    ],
    dropoutRate: 0.15,
    emotionalState: "Shock/Fear"
  },
  {
    id: 3,
    name: "Referral Pathway",
    description: "The process of connecting patients with specialist services and education",
    activities: [
      "Referral to structured education program",
      "Referral to diabetes specialist nurse (if needed)",
      "Dietitian consultation",
      "Eye screening referral",
      "Foot assessment",
      "Mental health support assessment"
    ],
    painPoints: [
      "Long waiting times for specialist appointments",
      "Poor coordination between services",
      "Inconsistent referral criteria across regions",
      "Information gaps between referrals",
      "Transportation barriers to attend appointments"
    ],
    stakeholders: [
      { name: "Primary Care Physician", involvement: "Medium" },
      { name: "Diabetes Specialist Nurse", involvement: "High" },
      { name: "Dietitian", involvement: "Medium" },
      { name: "Podiatrist", involvement: "Medium" },
      { name: "Ophthalmologist", involvement: "Medium" },
      { name: "Administrative Staff", involvement: "Medium" }
    ],
    infoSources: [
      "Specialist consultations",
      "Patient advocacy groups",
      "Treatment guidelines",
      "NHS Diabetes Prevention Programme materials"
    ],
    decisionPoints: [
      { 
        name: "Education Program Selection", 
        description: "Decision on which structured education to attend",
        keyFactors: ["Local availability", "Wait times", "Format preferences (in-person vs digital)"]
      },
      { 
        name: "Specialist Involvement", 
        description: "Decision on which specialists need to be involved",
        keyFactors: ["Complication risk factors", "HbA1c levels", "Existing comorbidities"]
      }
    ],
    dropoutRate: 0.25,
    emotionalState: "Uncertainty/Anxiety"
  },
  {
    id: 4,
    name: "Management Strategy",
    description: "Ongoing care planning and treatment to manage diabetes effectively",
    activities: [
      "Structured education attendance (DESMOND, XPERT)",
      "Medication management",
      "Blood glucose monitoring",
      "Lifestyle modifications implementation",
      "Regular GP/nurse reviews",
      "Self-management practices"
    ],
    painPoints: [
      "Difficulty maintaining lifestyle changes",
      "Medication side effects and adherence challenges",
      "Glucose monitoring burden",
      "Confusing/conflicting advice from different sources",
      "Financial costs of healthy eating and physical activity"
    ],
    stakeholders: [
      { name: "Primary Care Physician", involvement: "Medium" },
      { name: "Practice Nurse", involvement: "High" },
      { name: "Diabetes Specialist Nurse", involvement: "Medium" },
      { name: "Pharmacist", involvement: "Medium" },
      { name: "Dietitian", involvement: "Medium" },
      { name: "Family/Carers", involvement: "High" }
    ],
    infoSources: [
      "Structured education programs",
      "Medication guides",
      "Nurse educators",
      "Peer support groups",
      "Mobile health apps"
    ],
    decisionPoints: [
      { 
        name: "Medication Adjustment", 
        description: "Decision to adjust medication regimen",
        keyFactors: ["HbA1c trends", "Side effects", "Adherence issues", "New evidence/guidelines"]
      },
      { 
        name: "Self-management Approach", 
        description: "Decision on self-management strategy",
        keyFactors: ["Patient capability", "Technology access", "Support availability"]
      },
      { 
        name: "NHS Path to Remission", 
        description: "Decision to attempt diabetes remission",
        keyFactors: ["Recent diagnosis (< 6 years)", "BMI threshold", "Patient motivation"]
      }
    ],
    dropoutRate: 0.30,
    emotionalState: "Hope/Apprehension"
  },
  {
    id: 5,
    name: "Disease Progression",
    description: "Management of disease progression and potential complications",
    activities: [
      "Complication screening",
      "Treatment intensification if needed",
      "Complication management",
      "Regular specialist reviews",
      "Advanced care planning",
      "Emotional support"
    ],
    painPoints: [
      "Treatment fatigue and burnout",
      "Fear of complications",
      "Managing multiple health conditions",
      "Complex medication regimens",
      "Depression and diabetes distress",
      "Financial burden of ongoing care"
    ],
    stakeholders: [
      { name: "Primary Care Physician", involvement: "Medium" },
      { name: "Endocrinologist", involvement: "High" },
      { name: "Diabetes Specialist Nurse", involvement: "High" },
      { name: "Cardiologist", involvement: "Medium" },
      { name: "Nephrologist", involvement: "Medium" },
      { name: "Ophthalmologist", involvement: "Medium" },
      { name: "Podiatrist", involvement: "Medium" },
      { name: "Mental Health Professional", involvement: "Medium" }
    ],
    infoSources: [
      "Specialist consultations",
      "Clinical trial information",
      "Patient communities",
      "Advanced diabetes management resources",
      "End-of-life care planning"
    ],
    decisionPoints: [
      { 
        name: "Treatment Escalation", 
        description: "Decision to escalate treatment approach",
        keyFactors: ["Rising HbA1c", "Complication development", "Quality of life considerations"]
      },
      { 
        name: "Specialized Care", 
        description: "Decision on specialist management",
        keyFactors: ["Complication severity", "System capacity", "Patient mobility"]
      }
    ],
    dropoutRate: 0.35,
    emotionalState: "Adaptation/Acceptance"
  }
];

// Barriers data categorized according to SOS framework
const barriersData = {
  strategic: [
    {
      id: "s1",
      name: "Limited GP appointment availability",
      description: "Patients face long waits for GP appointments due to system capacity issues",
      severity: "High",
      affectedStages: [1, 2, 4],
      isDropoutPoint: true
    },
    {
      id: "s2",
      name: "Poor integration of care services",
      description: "Lack of coordination between primary, community and specialist care",
      severity: "High",
      affectedStages: [3, 4, 5],
      isDropoutPoint: false
    },
    {
      id: "s3",
      name: "Limited resources for structured education",
      description: "Insufficient funding for diabetes education programs",
      severity: "Medium",
      affectedStages: [3, 4],
      isDropoutPoint: true
    }
  ],
  operational: [
    {
      id: "o1",
      name: "Insufficient time during consultations",
      description: "Healthcare providers have limited time to address patient needs comprehensively",
      severity: "High",
      affectedStages: [2, 4],
      isDropoutPoint: false
    },
    {
      id: "o2",
      name: "Waiting times for specialist referrals",
      description: "Long delays between referral and specialist appointment",
      severity: "Medium",
      affectedStages: [3, 5],
      isDropoutPoint: true
    },
    {
      id: "o3",
      name: "Poor communication between healthcare providers",
      description: "Insufficient information sharing between different care providers",
      severity: "Medium",
      affectedStages: [3, 4, 5],
      isDropoutPoint: false
    }
  ],
  standards: [
    {
      id: "st1",
      name: "Variations in care quality",
      description: "Inconsistent standards of diabetes care across different regions",
      severity: "Medium",
      affectedStages: [2, 3, 4, 5],
      isDropoutPoint: false
    },
    {
      id: "st2",
      name: "Lack of psychological support integration",
      description: "Mental health support not routinely integrated into diabetes care",
      severity: "High",
      affectedStages: [4, 5],
      isDropoutPoint: true
    },
    {
      id: "st3",
      name: "Inconsistent use of care processes",
      description: "Variable implementation of the 9 recommended care processes",
      severity: "Medium",
      affectedStages: [4, 5],
      isDropoutPoint: false
    }
  ]
};

// Main application component
function DiabetesJourneyTool() {
  const [selectedStage, setSelectedStage] = useState(null);
  const [viewMode, setViewMode] = useState('journey'); // journey, barriers, stakeholders
  const [activeBarrierCategory, setActiveBarrierCategory] = useState('strategic');

  // Handle stage selection
  const handleStageClick = (stage) => {
    setSelectedStage(stage);
  };

  // Get color based on involvement level
  const getInvolvementColor = (level) => {
    switch(level) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get color based on barrier severity
  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'High': return 'bg-red-100 border-red-300 text-red-800';
      case 'Medium': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'Low': return 'bg-green-100 border-green-300 text-green-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  // Get emotion color
  const getEmotionColor = (emotion) => {
    switch(emotion) {
      case 'Concern/Worry': return 'bg-yellow-100';
      case 'Shock/Fear': return 'bg-red-100';
      case 'Uncertainty/Anxiety': return 'bg-orange-100';
      case 'Hope/Apprehension': return 'bg-blue-100';
      case 'Adaptation/Acceptance': return 'bg-green-100';
      default: return 'bg-gray-100';
    }
  };

  // Render barriers section
  const renderBarriers = () => {
    return (
      <div className="mt-4">
        <div className="flex mb-4 space-x-2">
          <button
            onClick={() => setActiveBarrierCategory('strategic')}
            className={`px-4 py-2 rounded ${activeBarrierCategory === 'strategic' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Strategic
          </button>
          <button
            onClick={() => setActiveBarrierCategory('operational')}
            className={`px-4 py-2 rounded ${activeBarrierCategory === 'operational' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Operational
          </button>
          <button
            onClick={() => setActiveBarrierCategory('standards')}
            className={`px-4 py-2 rounded ${activeBarrierCategory === 'standards' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Standards
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {barriersData[activeBarrierCategory].map(barrier => (
            <div 
              key={barrier.id} 
              className={`p-4 rounded-lg border ${getSeverityColor(barrier.severity)} ${barrier.isDropoutPoint ? 'border-l-4 border-l-red-600' : ''}`}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-bold">{barrier.name}</h3>
                <span className="text-sm font-semibold px-2 py-1 rounded-full bg-white">
                  {barrier.severity} Severity
                </span>
              </div>
              <p className="text-sm mt-1">{barrier.description}</p>
              <div className="mt-2">
                <h4 className="text-xs font-semibold uppercase">Affects Stages:</h4>
                <div className="flex flex-wrap mt-1 gap-1">
                  {barrier.affectedStages.map(stageId => {
                    const stageName = journeyStagesData.find(s => s.id === stageId)?.name;
                    return (
                      <span key={stageId} className="text-xs px-2 py-1 bg-white rounded-full border">
                        {stageName}
                      </span>
                    );
                  })}
                </div>
              </div>
              {barrier.isDropoutPoint && (
                <div className="mt-2 flex items-center">
                  <svg className="w-4 h-4 text-red-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-semibold text-red-600">Patient Dropout Point</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Render stakeholders view
  const renderStakeholders = () => {
    // Get all unique stakeholders across journey stages
    const allStakeholders = new Map();
    
    journeyStagesData.forEach(stage => {
      stage.stakeholders.forEach(stakeholder => {
        if (!allStakeholders.has(stakeholder.name)) {
          allStakeholders.set(stakeholder.name, {
            name: stakeholder.name,
            stages: []
          });
        }
        
        allStakeholders.get(stakeholder.name).stages.push({
          stageId: stage.id,
          stageName: stage.name,
          involvement: stakeholder.involvement
        });
      });
    });
    
    return (
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-4">Stakeholder Involvement Map</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-r text-left">Stakeholder</th>
                {journeyStagesData.map(stage => (
                  <th key={stage.id} className="py-2 px-4 border-b border-r text-center">{stage.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from(allStakeholders.values()).map((stakeholder, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-2 px-4 border-b border-r font-medium">{stakeholder.name}</td>
                  {journeyStagesData.map(stage => {
                    const stageInfo = stakeholder.stages.find(s => s.stageId === stage.id);
                    return (
                      <td key={stage.id} className="py-2 px-4 border-b border-r text-center">
                        {stageInfo ? (
                          <span className={`inline-block px-2 py-1 rounded-full text-xs ${getInvolvementColor(stageInfo.involvement)}`}>
                            {stageInfo.involvement}
                          </span>
                        ) : (
                          <span className="text-gray-300">-</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-full p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Type 2 Diabetes Patient Journey - UK NHS Pathway</h1>
        <p className="text-gray-600">Interactive visualization of the standard patient journey through the NHS healthcare system</p>
      </div>
      
      {/* View mode selector */}
      <div className="flex space-x-2 mb-6">
        <button 
          onClick={() => setViewMode('journey')}
          className={`px-4 py-2 rounded-md ${viewMode === 'journey' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Patient Journey
        </button>
        <button 
          onClick={() => setViewMode('barriers')}
          className={`px-4 py-2 rounded-md ${viewMode === 'barriers' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Barriers & Dropouts
        </button>
        <button 
          onClick={() => setViewMode('stakeholders')}
          className={`px-4 py-2 rounded-md ${viewMode === 'stakeholders' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Stakeholder Map
        </button>
      </div>
      
      {viewMode === 'journey' && (
        <>
          {/* Journey timeline */}
          <div className="mb-8 relative">
            <div className="h-2 bg-gray-200 absolute top-4 left-0 right-0 z-0"></div>
            <div className="flex justify-between relative z-10">
              {journeyStagesData.map((stage) => (
                <div key={stage.id} className="flex flex-col items-center cursor-pointer" onClick={() => handleStageClick(stage)}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedStage?.id === stage.id ? 'bg-blue-600 text-white' : 'bg-white border-2 border-gray-300'}`}>
                    {stage.id}
                  </div>
                  <div className="text-sm mt-2 text-center font-medium">{stage.name}</div>
                  <div className="text-xs text-center text-gray-500">
                    {stage.dropoutRate * 100}% dropout
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Emotional journey */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Patient Emotional Journey</h2>
            <div className="flex justify-between">
              {journeyStagesData.map((stage) => (
                <div key={stage.id} className="flex flex-col items-center w-1/5 px-2">
                  <div className={`w-full p-2 rounded-lg text-center text-sm ${getEmotionColor(stage.emotionalState)}`}>
                    {stage.emotionalState}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Selected stage details */}
          {selectedStage && (
            <div className="mt-6 border rounded-lg p-6 bg-white shadow-sm">
              <h2 className="text-xl font-bold mb-2">{selectedStage.name}</h2>
              <p className="text-gray-600 mb-4">{selectedStage.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column */}
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Patient Activities</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedStage.activities.map((activity, index) => (
                        <li key={index} className="text-gray-700">{activity}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Pain Points</h3>
                    <ul className="space-y-2">
                      {selectedStage.painPoints.map((point, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Information Sources</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedStage.infoSources.map((source, index) => (
                        <li key={index} className="text-gray-700">{source}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Right column */}
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Key Stakeholders</h3>
                    <div className="space-y-2">
                      {selectedStage.stakeholders.map((stakeholder, index) => (
                        <div key={index} className="flex justify-between items-center border rounded p-2">
                          <span className="text-gray-700">{stakeholder.name}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getInvolvementColor(stakeholder.involvement)}`}>
                            {stakeholder.involvement} Involvement
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Critical Decision Points</h3>
                    <div className="space-y-4">
                      {selectedStage.decisionPoints.map((point, index) => (
                        <div key={index} className="border rounded-lg p-3 bg-yellow-50">
                          <h4 className="font-semibold text-gray-800">{point.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{point.description}</p>
                          <h5 className="text-xs font-semibold uppercase text-gray-500 mt-2">Key Factors:</h5>
                          <ul className="list-disc pl-5 text-sm">
                            {point.keyFactors.map((factor, idx) => (
                              <li key={idx}>{factor}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {!selectedStage && (
            <div className="text-center p-10 border rounded-lg bg-gray-50">
              <p className="text-gray-600">Select a journey stage above to view detailed information</p>
            </div>
          )}
        </>
      )}
      
      {viewMode === 'barriers' && renderBarriers()}
      {viewMode === 'stakeholders' && renderStakeholders()}
    </div>
  );
}

export default DiabetesJourneyTool;