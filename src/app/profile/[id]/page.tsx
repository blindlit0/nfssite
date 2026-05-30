"use client"

import { useEffect, useState } from 'react'
import { initFirebase, firebaseHelpers as fh } from '../../../firebase'
import { useAuth } from '../../../contexts/AuthContext'
import PrivateRoute from '../../../components/auth/PrivateRoute'
import { useParams } from 'next/navigation'
import Image from 'next/image'

type User = {
  id?: string
  email: string
  nfsUsername: string
  firstName: string
  lastName: string
  fullName: string
  studentId: string
  createdAt: any
  lastLoginAt: any
  bio?: string
  course?: string
  year?: string
  photoUrl?: string
  phone?: string
  linkedin?: string
  instagram?: string
  resumeUrl?: string
  projects?: { title: string, description: string, link: string }[]
  skills?: string[]
  interests?: string[]
  achievements?: { title: string, description: string }[]
  education?: { institution: string, degree: string, years: string }[]
  workExperience?: { company: string, title: string, years: string }[]
  volunteerExperience?: { organization: string, role: string, years: string }[]
  publications?: { title: string, year: string, journal: string }[]
  awards?: { title: string, year: string }[]
}

function ProfilePage() {
  const services = initFirebase()
  const { user } = useAuth()
  const [member, setMember] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const id = (params?.id && typeof params.id === 'string') ? params.id : ''

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      if (!services) {
        if (!mounted) return
        setMember(null)
        setLoading(false)
        return
      }

      try {
        const { db } = services
        const userDoc = await fh.getUserData(db, id as string)
        if (userDoc) {
          setMember({ id: id as string, ...userDoc } as User)
        }
      } catch (err) {
        console.error('Failed to load user', err)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    if (id) {
      load()
    }
    return () => { mounted = false }
  }, [services, id])

  if (loading) {
    return <div className="card">Loading profile…</div>
  }

  if (!member) {
    return <div className="card">User not found.</div>
  }

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-red-600">{member.fullName}</h1>
        <p className="text-slate-500">{member.course} • Year {member.year}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="card">
            <Image
              src={member.photoUrl || '/placeholder-avatar.png'}
              alt={member.fullName}
              width={200}
              height={200}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="card">
            <h2 className="font-semibold text-lg mb-3">Bio</h2>
            <p>{member.bio || 'No bio provided.'}</p>
          </div>
          <div className="card mt-6">
            <h2 className="font-semibold text-lg mb-3">Contact Information</h2>
            <p>Email: {member.email}</p>
            <p>Phone: {member.phone || 'Not provided'}</p>
          </div>
          <div className="card mt-6">
            <h2 className="font-semibold text-lg mb-3">Social Media</h2>
            <p>LinkedIn: {member.linkedin ? <a href={member.linkedin} target="_blank" rel="noopener noreferrer">{member.linkedin}</a> : 'Not provided'}</p>
            <p>Instagram: {member.instagram ? <a href={member.instagram} target="_blank" rel="noopener noreferrer">{member.instagram}</a> : 'Not provided'}</p>
          </div>
          <div className="card mt-6">
            <h2 className="font-semibold text-lg mb-3">Resume</h2>
            {member.resumeUrl ? <a href={member.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">Download Resume</a> : <p>Not provided</p>}
          </div>
          <div className="card mt-6">
            <h2 className="font-semibold text-lg mb-3">Projects</h2>
            <div className="grid grid-cols-1 gap-4">
              {member.projects?.map((project, index) => (
                <div key={index} className="card">
                  <h3 className="font-semibold">{project.title}</h3>
                  <p>{project.description}</p>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">View Project</a>
                </div>
              ))}
              {!member.projects && <p>No projects provided.</p>}
            </div>
          </div>
          <div className="card mt-6">
            <h2 className="font-semibold text-lg mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {member.skills?.map((skill, index) => (
                <span key={index} className="chip">{skill}</span>
              ))}
              {!member.skills && <p>No skills provided.</p>}
            </div>
          </div>
          <div className="card mt-6">
            <h2 className="font-semibold text-lg mb-3">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {member.interests?.map((interest, index) => (
                <span key={index} className="chip">{interest}</span>
              ))}
              {!member.interests && <p>No interests provided.</p>}
            </div>
          </div>
          <div className="card mt-6">
            <h2 className="font-semibold text-lg mb-3">Achievements</h2>
            <ul className="list-disc list-inside">
              {member.achievements?.map((achievement, index) => (
                <li key={index}>
                  <strong>{achievement.title}:</strong> {achievement.description}
                </li>
              ))}
              {!member.achievements && <p>No achievements provided.</p>}
            </ul>
          </div>
          <div className="card mt-6">
            <h2 className="font-semibold text-lg mb-3">Education</h2>
            <ul className="list-disc list-inside">
              {member.education?.map((education, index) => (
                <li key={index}>
                  <strong>{education.institution}</strong> ({education.years}) - {education.degree}
                </li>
              ))}
              {!member.education && <p>No education provided.</p>}
            </ul>
          </div>
          <div className="card mt-6">
            <h2 className="font-semibold text-lg mb-3">Work Experience</h2>
            <ul className="list-disc list-inside">
              {member.workExperience?.map((work, index) => (
                <li key={index}>
                  <strong>{work.company}</strong> ({work.years}) - {work.title}
                </li>
              ))}
              {!member.workExperience && <p>No work experience provided.</p>}
            </ul>
          </div>
          <div className="card mt-6">
            <h2 className="font-semibold text-lg mb-3">Volunteer Experience</h2>
            <ul className="list-disc list-inside">
              {member.volunteerExperience?.map((volunteer, index) => (
                <li key={index}>
                  <strong>{volunteer.organization}</strong> ({volunteer.years}) - {volunteer.role}
                </li>
              ))}
              {!member.volunteerExperience && <p>No volunteer experience provided.</p>}
            </ul>
          </div>
          <div className="card mt-6">
            <h2 className="font-semibold text-lg mb-3">Publications</h2>
            <ul className="list-disc list-inside">
              {member.publications?.map((publication, index) => (
                <li key={index}>
                  <strong>{publication.title}</strong> ({publication.year}) - {publication.journal}
                </li>
              ))}
              {!member.publications && <p>No publications provided.</p>}
            </ul>
          </div>
          <div className="card mt-6">
            <h2 className="font-semibold text-lg mb-3">Awards</h2>
            <ul className="list-disc list-inside">
              {member.awards?.map((award, index) => (
                <li key={index}>
                  <strong>{award.title}</strong> ({award.year})
                </li>
              ))}
              {!member.awards && <p>No awards provided.</p>}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Profile() {
  return (
    <PrivateRoute>
      <ProfilePage />
    </PrivateRoute>
  )
}
