'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { initFirebase, firebaseHelpers } from '../../firebase'
import PrivateRoute from '../../components/auth/PrivateRoute'

function Profile() {
  const { user, userData, signOut } = useAuth()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('')
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    displayName: '',
    bio: '',
    department: '',
    year: '',
    interests: [] as string[],
    phone: '',
    linkedin: '',
    github: ''
  })

  const firebase = initFirebase()

  useEffect(() => {
    if (userData) {
      setProfileData({
        displayName: userData.nfsUsername || user?.displayName || '',
        bio: userData.bio || '',
        department: userData.department || '',
        year: userData.year || '',
        interests: userData.interests || [],
        phone: userData.phone || '',
        linkedin: userData.linkedin || '',
        github: userData.github || ''
      })
    }
  }, [userData, user])

  const handleSave = async () => {
    if (!firebase || !user) return

    setLoading(true)
    setMessage('')
    setMessageType('')

    try {
      await firebaseHelpers.updateUserProfile(firebase.db, user.uid, profileData)
      setMessage('Profile updated successfully!')
      setMessageType('success')
      setIsEditing(false)
    } catch (error) {
      setMessage('Failed to update profile. Please try again.')
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  const handleInterestChange = (interest: string, checked: boolean) => {
    if (checked) {
      setProfileData(prev => ({
        ...prev,
        interests: [...prev.interests, interest]
      }))
    } else {
      setProfileData(prev => ({
        ...prev,
        interests: prev.interests.filter(i => i !== interest)
      }))
    }
  }

  const availableInterests = [
    'Food Science', 'Nutrition', 'Research', 'Public Health', 'Food Safety',
    'Food Technology', 'Dietetics', 'Food Chemistry', 'Microbiology', 'Sustainability'
  ]

  return (
    <div className="container max-w-[800px] my-8 mx-auto">
      {/* Header Section */}
      <div className="card mb-8 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 border-blue-500/10">
        <div className="flex items-center gap-6 flex-wrap">
          <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-blue-600 rounded-full flex items-center justify-center text-3xl text-white font-bold flex-shrink-0">
            {profileData.displayName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-[200px]">
            <h1 className="text-red-600 mb-2 text-2xl font-bold">
              {profileData.displayName}
            </h1>
            <p className="text-slate-500 mb-2">
              {user?.email}
            </p>
            <div className="inline-block px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20 text-sm text-green-600 font-semibold">
              NFS Member
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-6 py-3 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200 ${
                isEditing
                  ? 'bg-green-600 text-white border-2 border-green-600'
                  : 'bg-transparent text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-white hover:-translate-y-0.5'
              }`}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
            {isEditing && (
              <button
                onClick={handleSave}
                disabled={loading}
                className={`btn-primary ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Message Display */}
      {message && (
        <div className={`mb-6 p-4 rounded-xl border ${
          messageType === 'success'
            ? 'bg-green-50 border-green-300 text-green-700'
            : 'bg-red-50 border-red-300 text-red-700'
        } text-sm font-medium`}>
          {message}
        </div>
      )}

      {/* Profile Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Basic Information */}
        <div className="card">
          <h3 className="text-red-600 mb-6 text-xl font-semibold">
            Basic Information
          </h3>
          
          <div className="flex flex-col gap-4">
            <div>
              <label className="block mb-2 font-semibold text-slate-900 text-sm">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell us about yourself..."
                  rows={4}
                />
              ) : (
                <p className="text-slate-900 p-3 bg-slate-50 rounded-lg min-h-[60px]">
                  {profileData.bio || 'No bio provided yet.'}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-semibold text-slate-900 text-sm">
                Department
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.department}
                  onChange={(e) => setProfileData(prev => ({ ...prev, department: e.target.value }))}
                  placeholder="e.g., Food Science & Nutrition"
                />
              ) : (
                <p className="text-slate-900">
                  {profileData.department || 'Not specified'}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-semibold text-slate-900 text-sm">
                Academic Year
              </label>
              {isEditing ? (
                <select
                  value={profileData.year}
                  onChange={(e) => setProfileData(prev => ({ ...prev, year: e.target.value }))}
                >
                  <option value="">Select year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Graduate">Graduate</option>
                  <option value="PhD">PhD</option>
                  <option value="Faculty">Faculty</option>
                </select>
              ) : (
                <p className="text-slate-900">
                  {profileData.year || 'Not specified'}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Interests */}
        <div className="card">
          <h3 className="text-red-600 mb-6 text-xl font-semibold">
            Interests
          </h3>
          
          {isEditing ? (
            <div className="flex flex-col gap-3">
              {availableInterests.map(interest => (
                <label key={interest} className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={profileData.interests.includes(interest)}
                    onChange={(e) => handleInterestChange(interest, e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-slate-900 text-sm">
                    {interest}
                  </span>
                </label>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {profileData.interests.length > 0 ? (
                profileData.interests.map(interest => (
                  <span key={interest} className="px-3 py-1 bg-blue-100 rounded-full border border-blue-200 text-sm text-red-600 font-medium">
                    {interest}
                  </span>
                ))
              ) : (
                <p className="text-slate-500 italic">
                  No interests selected yet.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Contact Information */}
        <div className="card">
          <h3 className="text-red-600 mb-6 text-xl font-semibold">
            Contact Information
          </h3>
          
          <div className="flex flex-col gap-4">
            <div>
              <label className="block mb-2 font-semibold text-slate-900 text-sm">
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+1 (555) 123-4567"
                />
              ) : (
                <p className="text-slate-900">
                  {profileData.phone || 'Not provided'}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-semibold text-slate-900 text-sm">
                LinkedIn
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={profileData.linkedin}
                  onChange={(e) => setProfileData(prev => ({ ...prev, linkedin: e.target.value }))}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              ) : (
                <p className="text-slate-900">
                  {profileData.linkedin ? (
                    <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">
                      {profileData.linkedin}
                    </a>
                  ) : (
                    'Not provided'
                  )}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-semibold text-slate-900 text-sm">
                GitHub
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={profileData.github}
                  onChange={(e) => setProfileData(prev => ({ ...prev, github: e.target.value }))}
                  placeholder="https://github.com/yourusername"
                />
              ) : (
                <p className="text-slate-900">
                  {profileData.github ? (
                    <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">
                      {profileData.github}
                    </a>
                  ) : (
                    'Not provided'
                  )}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="card mt-8">
        <h3 className="text-red-600 mb-6 text-xl font-semibold">
          Account Actions
        </h3>
        
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={signOut}
            className="bg-transparent text-red-600 border-2 border-red-600 px-6 py-3 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200 hover:bg-red-600 hover:text-white hover:-translate-y-0.5"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ProfilePage() {
    return (
        <PrivateRoute>
            <Profile />
        </PrivateRoute>
    )
}

