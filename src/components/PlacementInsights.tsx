import React from 'react';
import { PLACEMENT_STATISTICS, ALUMNI_EXPERIENCES } from '../data/mockData';
import { 
  BarChart3, 
  TrendingUp, 
  Award, 
  Building2, 
  GraduationCap, 
  CheckCircle2, 
  Quote, 
  Sparkles 
} from 'lucide-react';

export const PlacementInsights: React.FC = () => {
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span>Institutional Placement Analytics & Alumni Network</span>
          <span aria-hidden="true">·</span>
          <span>Annual Report</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          Placement Insights, Record Trends & Alumni Archives
        </h2>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Review institutional recruitment performance across academic departments, examine salary distributions, and read unfiltered interview guidance from recent Info Institute alumni.
        </p>
      </div>

      {/* Top Level Metric Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs text-slate-500 uppercase tracking-wide font-medium">Overall Placed %</div>
          <div className="text-3xl font-extrabold text-blue-700 font-mono tabular-nums">
            {PLACEMENT_STATISTICS.placementPercentage}%
          </div>
          <div className="text-xs text-slate-500">
            {PLACEMENT_STATISTICS.studentsPlacedSoFar} of {PLACEMENT_STATISTICS.totalEligibleStudents} students
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs text-slate-500 uppercase tracking-wide font-medium">Highest Package</div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            ₹{PLACEMENT_STATISTICS.highestPackageLpa.toFixed(1)} <span className="text-sm font-sans font-medium text-slate-600">LPA</span>
          </div>
          <div className="text-xs text-slate-500">Google Cloud Platform</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs text-slate-500 uppercase tracking-wide font-medium">Average Package</div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            ₹{PLACEMENT_STATISTICS.averagePackageLpa.toFixed(1)} <span className="text-sm font-sans font-medium text-slate-600">LPA</span>
          </div>
          <div className="text-xs text-slate-500">Median: ₹{PLACEMENT_STATISTICS.medianPackageLpa} LPA</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs text-slate-500 uppercase tracking-wide font-medium">Recruiting Partners</div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            {PLACEMENT_STATISTICS.totalCompaniesVisited}+
          </div>
          <div className="text-xs text-slate-500">Product, Core & IT Leaders</div>
        </div>
      </div>

      {/* Department-wise Placement Rates */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
        <div>
          <h3 className="text-base font-bold text-slate-900">Department-wise Recruitment Statistics (2025-2026)</h3>
          <p className="text-xs text-slate-500">Real-time status based on confirmed offer letters received</p>
        </div>

        <div className="space-y-4">
          {PLACEMENT_STATISTICS.departmentBreakdown.map((dept, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-800">{dept.department}</span>
                <span className="text-slate-700 font-mono tabular-nums">
                  {dept.placed} / {dept.total} placed ({dept.percentage}%)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-blue-700 rounded-full"
                  style={{ width: `${dept.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Recruiting Brands Grid */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">Key Institutional Recruiting Partners</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          {PLACEMENT_STATISTICS.topRecruitingPartners.map((partner, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800 flex items-center justify-center">
              {partner}
            </div>
          ))}
        </div>
      </div>

      {/* Alumni Interview Archives */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Alumni Interview Experience & Tips</h3>
          <p className="text-xs text-slate-500">Practical guidance from the graduating batch of 2025</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ALUMNI_EXPERIENCES.map((exp) => (
            <div key={exp.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="font-bold text-blue-700">{exp.company}</span>
                  <span className="font-mono tabular-nums font-semibold text-slate-800">₹{exp.packageLpa} LPA</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{exp.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">{exp.authorName}</div>
                  <div className="text-[11px] text-slate-500">{exp.batch} · {exp.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
