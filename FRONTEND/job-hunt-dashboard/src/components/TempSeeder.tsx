import React, { useState } from 'react';
import { db } from '../lib/firebase'; 
import { collection, writeBatch, doc } from 'firebase/firestore';

const TempSeeder: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const seedJobs = async () => {
    setLoading(true);
    const batch = writeBatch(db);

    const jobs = [
      {
        id: "job_101",
        title: "Junior React Developer",
        company: "TechFlow Solutions",
        status: "New",
        salary: "$65k - $80k",
        location: "Remote (Canada)",
        description: "<p>We are looking for a passionate developer to join our frontend team. You will be working with React 18, Tailwind, and TypeScript.</p>",
        skills: ["React", "TypeScript", "Tailwind CSS"],
        dateAdded: "2025-12-25T09:00:00.000Z",
        contactEmail: "careers@techflow.example.com",
        link: "https://techflow.example.com/careers/123"
      },
      {
        id: "job_102",
        title: "Frontend Engineer",
        company: "Shopify",
        status: "Applied",
        salary: "$90k - $110k",
        location: "Toronto, ON",
        description: "<p>Join our merchant experience team. We need someone who understands performance and accessibility.</p>",
        skills: ["React", "GraphQL", "Performance"],
        dateAdded: "2025-12-20T10:00:00.000Z",
        dateApplied: "2025-12-24T14:30:00.000Z",
        contactEmail: "recruiter@shopify.example.com",
        link: "https://shopify.example.com/jobs/456"
      },
      {
        id: "job_103",
        title: "Software Developer Intern",
        company: "Wealthsimple",
        status: "Interview",
        salary: "$25/hr",
        location: "Hybrid - Toronto",
        description: "<p>A 4-month internship for students graduating in 2026. Work on our mobile trading app using React Native.</p>",
        skills: ["React Native", "JavaScript", "Mobile"],
        dateAdded: "2025-12-15T09:00:00.000Z",
        dateApplied: "2025-12-16T11:00:00.000Z",
        contactEmail: "campus@wealthsimple.example.com",
        link: "https://wealthsimple.example.com/jobs/789"
      },
      {
        id: "job_104",
        title: "Web Developer",
        company: "FreshBooks",
        status: "Offer",
        salary: "$85k",
        location: "Remote",
        description: "<p>Help small business owners by building intuitive accounting tools.</p>",
        skills: ["Vue.js", "Ember.js", "SaaS"],
        dateAdded: "2025-12-01T08:00:00.000Z",
        dateApplied: "2025-12-02T10:00:00.000Z",
        contactEmail: "hr@freshbooks.example.com",
        link: "https://freshbooks.example.com/jobs/101"
      },
      {
        id: "job_105",
        title: "Full Stack Developer",
        company: "RBC",
        status: "Rejected",
        salary: "$95k",
        location: "Toronto, ON",
        description: "<p>Bank level security and large scale distributed systems.</p>",
        skills: ["Java", "Spring Boot", "React"],
        dateAdded: "2025-11-20T09:00:00.000Z",
        dateApplied: "2025-11-21T15:00:00.000Z",
        contactEmail: "careers@rbc.example.com",
        link: "https://rbc.example.com/jobs/999"
      }
    ];

    jobs.forEach((job) => {
      const docRef = doc(db, "jobs", job.id);
      batch.set(docRef, job);
    });

    try {
      await batch.commit();
      alert("✅ 5 Jobs Added Successfully!");
    } catch (e) {
      console.error(e);
      alert("Error adding jobs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={seedJobs}
      disabled={loading}
      className="fixed bottom-10 right-10 z-50 bg-red-600 text-white px-6 py-3 rounded-full font-bold shadow-2xl hover:bg-red-700"
    >
      {loading ? "Adding..." : "⚡ Click to Seed DB"}
    </button>
  );
};

export default TempSeeder;