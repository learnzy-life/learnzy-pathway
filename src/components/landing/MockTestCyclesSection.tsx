
import React from 'react';
import { Book, ArrowRight, Shield, Star, Brain } from 'lucide-react';
import SectionHeader from '../SectionHeader';

const MockTestCyclesSection: React.FC = () => {
  return (
    <section className="py-12 md:py-16 bg-[#E6F7FF] rounded-xl overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <SectionHeader icon={Book} title="Progressive Mock Test Cycles" />
          <p className="text-[#003366] max-w-3xl mx-auto mt-3 px-2 sm:px-0 font-medium">
            Master NEET 2025 with Learnzy's 20 mock tests, split into 4 cycles. Each cycle includes 5 tests – 4 static and 1 dynamic – designed to progressively build your skills and target your weak areas.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Table/Cycle Breakdown */}
          <div className="w-full lg:w-3/5">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-blue-100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#003366] text-white">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">Cycle</th>
                      <th className="px-4 py-3 text-left font-medium">Focus</th>
                      <th className="px-4 py-3 text-left font-medium">Tests</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-100 text-[#003366]">
                    <tr>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <Book className="w-5 h-5 mr-2 text-learnzy-purple" />
                          <span className="font-medium">Cycle 1: Foundation</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">Core topics & high-priority PYQs</td>
                      <td className="px-4 py-3">
                        Tests 1-4: Static (core content)<br />
                        Test 5: Dynamic (70% weak areas from Tests 1-4, 30% static)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <ArrowRight className="w-5 h-5 mr-2 text-learnzy-purple" />
                          <span className="font-medium">Cycle 2: Bridging Gaps</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">Weaknesses from Cycle 1, concept clarity</td>
                      <td className="px-4 py-3">
                        Tests 6-9: Static (gap-filling)<br />
                        Test 10: Dynamic (70% weak areas from Cycle 1 & Tests 6-9, 30% static)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <Shield className="w-5 h-5 mr-2 text-learnzy-purple" />
                          <span className="font-medium">Cycle 3: Reinforcement</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">Strengthen strengths, fix weaknesses</td>
                      <td className="px-4 py-3">
                        Tests 11-14: Static (reinforcement)<br />
                        Test 15: Dynamic (70% weak areas from Cycles 1-2 & Tests 11-14, 30% static)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <Star className="w-5 h-5 mr-2 text-learnzy-purple" />
                          <span className="font-medium">Cycle 4: NEET Readiness</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">Intensive exam-like practice</td>
                      <td className="px-4 py-3">
                        Tests 16-19: Static (NEET-style)<br />
                        Test 20: Dynamic (70% weak areas from Cycles 1-3 & Tests 16-19, 30% static)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4 bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  <Brain className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <span className="font-medium text-[#003366]">Dynamic Test Explanation:</span>
                  <p className="text-[#003366] mt-1">
                    Each cycle ends with a dynamic test: 70% personalized to your weak areas from prior tests, 30% static content for balanced practice.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Aid */}
          <div className="w-full lg:w-2/5">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
              <div className="flex flex-col">
                {/* Cycle 4 */}
                <div className="relative mb-4 pb-4 pl-12">
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-learnzy-purple flex items-center justify-center text-white font-bold">4</div>
                  <div className="bg-blue-50 rounded-lg p-3 border-2 border-[#003366] ml-2">
                    <div className="flex items-center mb-2">
                      <Star className="w-5 h-5 text-learnzy-purple mr-2" />
                      <h4 className="font-bold text-[#003366]">Cycle 4: NEET Readiness</h4>
                    </div>
                    <div className="flex space-x-1 mb-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center text-[#003366] font-bold">16</div>
                      <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center text-[#003366] font-bold">17</div>
                      <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center text-[#003366] font-bold">18</div>
                      <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center text-[#003366] font-bold">19</div>
                      <div className="w-8 h-8 bg-amber-100 rounded-md flex items-center justify-center text-amber-600 font-bold">20</div>
                    </div>
                    <div className="ml-1 text-xs text-[#003366]">
                      Trophy achievement: NEET readiness!
                    </div>
                  </div>
                </div>
                
                {/* Cycle 3 */}
                <div className="relative mb-4 pb-4 pl-12">
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-learnzy-purple flex items-center justify-center text-white font-bold">3</div>
                  <div className="bg-blue-50 rounded-lg p-3 border-2 border-[#003366] ml-2">
                    <div className="flex items-center mb-2">
                      <Shield className="w-5 h-5 text-learnzy-purple mr-2" />
                      <h4 className="font-bold text-[#003366]">Cycle 3: Reinforcement</h4>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center text-[#003366] font-bold">11</div>
                      <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center text-[#003366] font-bold">12</div>
                      <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center text-[#003366] font-bold">13</div>
                      <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center text-[#003366] font-bold">14</div>
                      <div className="w-8 h-8 bg-amber-100 rounded-md flex items-center justify-center text-amber-600 font-bold">15</div>
                    </div>
                  </div>
                </div>
                
                {/* Cycle 2 */}
                <div className="relative mb-4 pb-4 pl-12">
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-learnzy-purple flex items-center justify-center text-white font-bold">2</div>
                  <div className="bg-blue-50 rounded-lg p-3 border-2 border-[#003366] ml-2">
                    <div className="flex items-center mb-2">
                      <ArrowRight className="w-5 h-5 text-learnzy-purple mr-2" />
                      <h4 className="font-bold text-[#003366]">Cycle 2: Bridging Gaps</h4>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center text-[#003366] font-bold">6</div>
                      <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center text-[#003366] font-bold">7</div>
                      <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center text-[#003366] font-bold">8</div>
                      <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center text-[#003366] font-bold">9</div>
                      <div className="w-8 h-8 bg-amber-100 rounded-md flex items-center justify-center text-amber-600 font-bold">10</div>
                    </div>
                  </div>
                </div>
                
                {/* Cycle 1 */}
                <div className="relative pl-12">
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-learnzy-purple flex items-center justify-center text-white font-bold">1</div>
                  <div className="bg-blue-50 rounded-lg p-3 border-2 border-[#003366] ml-2">
                    <div className="flex items-center mb-2">
                      <Book className="w-5 h-5 text-learnzy-purple mr-2" />
                      <h4 className="font-bold text-[#003366]">Cycle 1: Foundation</h4>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center text-[#003366] font-bold">1</div>
                      <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center text-[#003366] font-bold">2</div>
                      <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center text-[#003366] font-bold">3</div>
                      <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center text-[#003366] font-bold">4</div>
                      <div className="w-8 h-8 bg-amber-100 rounded-md flex items-center justify-center text-amber-600 font-bold">5</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-8 text-center">
          <p className="text-[#003366] font-semibold text-lg">
            This cycle-based approach ensures you tackle weaknesses, boost confidence, and ace NEET 2025!
          </p>
        </div>
      </div>
    </section>
  );
};

export default MockTestCyclesSection;
