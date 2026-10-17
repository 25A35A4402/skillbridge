from sqlalchemy import Column, Integer, String, Boolean, Text, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    phone = Column(String(30), nullable=True)
    full_name = Column(String(255), nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(50), default="student")  # "student" or "company"
    avatar_url = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    student_profile = relationship("StudentProfile", back_populates="user", uselist=False)
    company_profile = relationship("CompanyProfile", back_populates="user", uselist=False)
    notifications = relationship("Notification", back_populates="user")


class StudentProfile(Base):
    __tablename__ = "student_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    college = Column(String(255), default="National Institute of Technology")
    degree = Column(String(100), default="B.Tech")
    branch = Column(String(100), default="Computer Science & Engineering")
    grad_year = Column(Integer, default=2026)
    cgpa = Column(Float, default=8.8)
    bio = Column(Text, default="Passionate software developer aiming to build scalable web applications and explore AI technologies.")
    
    # JSON strings
    skills = Column(Text, default='["React", "TypeScript", "Python", "Tailwind CSS", "Node.js", "Git", "REST APIs"]')
    interests = Column(Text, default='["Full-Stack Web Development", "AI/ML Systems", "FinTech", "Open Source"]')
    career_goals = Column(Text, default="Seeking high-growth software engineering internships at product-driven tech startups to build real-world experience.")
    certifications = Column(Text, default='[{"title": "AWS Certified Cloud Practitioner", "issuer": "Amazon Web Services", "year": "2025", "credential_id": "AWS-CCP-9831"}, {"title": "Meta Front-End Developer Professional", "issuer": "Coursera / Meta", "year": "2024", "credential_id": "META-FE-5421"}]')
    projects = Column(Text, default='[{"title": "DevConnect - Peer Code Review Platform", "description": "Collaborative developer tool built with React and FastAPI enabling live code reviews and markdown documentation.", "tech": ["React", "FastAPI", "WebSockets", "Tailwind"], "link": "https://github.com/example/devconnect", "stars": 42}, {"title": "CryptoTrack - Real-time Portfolio Dashboard", "description": "Financial analytics web app tracking 100+ cryptocurrencies with historical sparklines and alert webhooks.", "tech": ["TypeScript", "Next.js", "Chart.js"], "link": "https://github.com/example/cryptotrack", "stars": 28}]')
    
    resume_name = Column(String(255), default="Aarav_Sharma_Resume_2026.pdf")
    resume_url = Column(String(500), default="https://skillbridge.dev/resumes/aarav_sharma.pdf")
    portfolio_url = Column(String(500), default="https://aaravsharma.dev")
    github_url = Column(String(500), default="https://github.com/aaravsharma")
    linkedin_url = Column(String(500), default="https://linkedin.com/in/aaravsharma")
    completion_percentage = Column(Integer, default=90)

    user = relationship("User", back_populates="student_profile")


class CompanyProfile(Base):
    __tablename__ = "company_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    company_name = Column(String(255), nullable=False)
    logo_url = Column(String(500), nullable=True)
    industry = Column(String(100), default="Information Technology")
    location = Column(String(100), default="Bengaluru, Karnataka")
    website = Column(String(255), default="https://techscale.io")
    about = Column(Text, default="Fast-growing technology startup modernizing business workflows with AI-powered analytics.")
    size = Column(String(50), default="50-200 employees")
    verified = Column(Boolean, default=True)

    user = relationship("User", back_populates="company_profile")
    internships = relationship("Internship", back_populates="company")
    projects = relationship("ProjectOpportunity", back_populates="company")


class Internship(Base):
    __tablename__ = "internships"

    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("company_profiles.id"))
    company_name = Column(String(255), nullable=False)
    logo_url = Column(String(500), nullable=True)
    title = Column(String(255), nullable=False)
    category = Column(String(100), default="Software Development")
    location = Column(String(100), default="Bengaluru (Hybrid)")
    work_type = Column(String(50), default="Hybrid")  # "Remote", "On-site", "Hybrid"
    duration = Column(String(50), default="3 Months")
    stipend = Column(String(50), default="₹25,000 - ₹35,000 / month")
    stipend_type = Column(String(50), default="Monthly")
    
    # JSON strings
    required_skills = Column(Text, default='["React", "TypeScript", "Tailwind CSS", "REST APIs"]')
    description = Column(Text, nullable=False)
    responsibilities = Column(Text, default='["Build high-performance React components and responsive web interfaces", "Collaborate with backend engineers to integrate REST APIs", "Participate in agile sprints, code reviews, and UX refinements"]')
    perks = Column(Text, default='["Certificate of Internship", "Letter of Recommendation (PPO Potential)", "Flexible work hours", "Mentorship from Senior Engineers"]')
    
    eligibility = Column(String(255), default="Pre-final & Final year students (B.Tech / BCA / MCA / B.Sc)")
    deadline = Column(String(50), default="2026-11-15")
    active = Column(Boolean, default=True)
    applicants_count = Column(Integer, default=14)
    created_at = Column(DateTime, default=datetime.utcnow)

    company = relationship("CompanyProfile", back_populates="internships")


class ProjectOpportunity(Base):
    __tablename__ = "project_opportunities"

    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("company_profiles.id"))
    company_name = Column(String(255), nullable=False)
    logo_url = Column(String(500), nullable=True)
    title = Column(String(255), nullable=False)
    category = Column(String(100), default="Open Source / Real-World")
    description = Column(Text, nullable=False)
    
    # JSON strings
    required_skills = Column(Text, default='["Python", "FastAPI", "PostgreSQL", "Docker"]')
    duration = Column(String(50), default="6 Weeks")
    team_size = Column(String(50), default="3-4 Students")
    work_type = Column(String(50), default="Remote")
    stipend = Column(String(50), default="₹15,000 Milestone Bonus + Certificate")
    deliverables = Column(Text, default='["Architecture design document", "Clean REST microservice with unit tests", "Deployment on cloud demo container"]')
    
    deadline = Column(String(50), default="2026-11-20")
    active = Column(Boolean, default=True)
    applicants_count = Column(Integer, default=8)
    created_at = Column(DateTime, default=datetime.utcnow)

    company = relationship("CompanyProfile", back_populates="projects")


class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    applicant_id = Column(Integer, ForeignKey("users.id"))
    opportunity_type = Column(String(50), default="internship")  # "internship" or "project"
    opportunity_id = Column(Integer, nullable=False)
    title = Column(String(255), nullable=False)
    company_name = Column(String(255), nullable=False)
    logo_url = Column(String(500), nullable=True)
    
    student_name = Column(String(255), nullable=False)
    student_email = Column(String(255), nullable=False)
    student_college = Column(String(255), nullable=False)
    student_degree = Column(String(100), nullable=False)
    student_skills = Column(Text, default="[]")
    resume_url = Column(String(500), nullable=True)
    cover_note = Column(Text, nullable=True)
    match_percentage = Column(Integer, default=90)
    
    # Status: "applied", "under_review", "shortlisted", "interview", "selected", "rejected"
    status = Column(String(50), default="applied")
    timeline = Column(Text, default='[{"stage": "applied", "date": "Oct 15, 2026", "note": "Application submitted successfully"}]')
    interview_date = Column(String(100), nullable=True)
    interview_link = Column(String(255), nullable=True)
    feedback = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    type = Column(String(50), default="application")  # "match", "application", "interview", "message", "system"
    read = Column(Boolean, default=False)
    link = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="notifications")
