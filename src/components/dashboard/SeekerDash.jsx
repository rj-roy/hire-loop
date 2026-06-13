'use client';
import { useState } from 'react';
import { Upload, X, User, Save } from 'lucide-react';

const SeekerDash = () => {
  const [skills, setSkills] = useState(['Figma', 'UI Design', 'Prototyping']);
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };
  return (
    <main className="flex-1 lg:ml-64 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-2">Settings</h2>
          <p className="text-gray-400">Manage your account details and professional profile.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2 bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-6">Profile Information</h3>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                <img
                  src="/placeholder-avatar.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <User className="w-10 h-10 text-gray-500 hidden" />
              </div>
              <div>
                <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors">
                  Change Avatar
                </button>
                <p className="text-xs text-gray-500 mt-2">JPG, GIF or PNG. Max size of 5MB.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue="Jane Doe"
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                <input
                  type="email"
                  defaultValue="jane.doe@example.com"
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div className="border-t border-gray-800 pt-6 flex gap-3">
              <button className="px-6 py-2.5 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors">
                Update Profile
              </button>
              <button className="px-6 py-2.5 border border-gray-700 text-gray-300 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Reset Password
              </button>
            </div>
          </div>

          {/* Resume Section */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">Resume</h3>
            <p className="text-sm text-gray-400 mb-4">Upload your most recent resume to enable one-click applications.</p>

            <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <Upload className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-sm font-medium mb-1">Jane_Doe_Resume_2023.pdf</p>
              <p className="text-xs text-gray-500 mb-4">Last updated 2 days ago • 1.2 MB</p>

              <div className="flex gap-2 justify-center">
                <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors">
                  Replace
                </button>
                <button className="px-4 py-2 border border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-lg text-sm font-medium transition-colors">
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Details */}
        <div className="mt-6 bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-6">Professional Details</h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Professional Headline</label>
              <input
                type="text"
                defaultValue="Senior UX/UI Designer"
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Bio</label>
              <textarea
                rows="4"
                defaultValue="Passionate designer with 5+ years of experience crafting user-centric digital experiences..."
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Skills</label>
              <div className="bg-black border border-gray-700 rounded-lg p-3">
                <div className="flex flex-wrap gap-2 mb-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-800 rounded-full text-sm"
                    >
                      {skill}
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="hover:text-red-400 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddSkill(e);
                    }
                  }}
                  placeholder="Add a skill..."
                  className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm"
                />
              </div>
            </div>

            <div className="border-t border-gray-800 pt-6">
              <button className="px-6 py-2.5 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors inline-flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SeekerDash;
