from pydantic import BaseModel, EmailStr
from typing import List, Optional, Any
from datetime import datetime

class UserBase(BaseModel):
    email: str
    full_name: str
    role: str = "student"
    phone: Optional[str] = None
    avatar_url: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class ProjectItem(BaseModel):
    title: str
    description: str
    tech: List[str]
    link: Optional[str] = None
    stars: Optional[int] = 0

class CertificationItem(BaseModel):
    title: str
    issuer: str
    year: str
    credential_id: Optional[str] = None

class StudentProfileUpdate(BaseModel):
    college: Optional[str] = None
    degree: Optional[str] = None
    branch: Optional[str] = None
    grad_year: Optional[int] = None
    cgpa: Optional[float] = None
    bio: Optional[str] = None
    skills: Optional[List[str]] = None
    interests: Optional[List[str]] = None
    career_goals: Optional[str] = None
    certifications: Optional[List[CertificationItem]] = None
    projects: Optional[List[ProjectItem]] = None
    resume_name: Optional[str] = None
    resume_url: Optional[str] = None
    portfolio_url: Optional[str] = None
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None

class StudentProfileResponse(BaseModel):
    id: int
    user_id: int
    college: str
    degree: str
    branch: str
    grad_year: int
    cgpa: float
    bio: str
    skills: List[str]
    interests: List[str]
    career_goals: str
    certifications: List[Any]
    projects: List[Any]
    resume_name: str
    resume_url: str
    portfolio_url: str
    github_url: str
    linkedin_url: str
    completion_percentage: int

    class Config:
        from_attributes = True

class CompanyProfileResponse(BaseModel):
    id: int
    user_id: int
    company_name: str
    logo_url: Optional[str]
    industry: str
    location: str
    website: str
    about: str
    size: str
    verified: bool

    class Config:
        from_attributes = True

class InternshipCreate(BaseModel):
    title: str
    category: str
    location: str
    work_type: str = "Hybrid"
    duration: str
    stipend: str
    required_skills: List[str]
    description: str
    responsibilities: List[str]
    perks: List[str]
    eligibility: str
    deadline: str

class InternshipResponse(BaseModel):
    id: int
    company_id: int
    company_name: str
    logo_url: Optional[str]
    title: str
    category: str
    location: str
    work_type: str
    duration: str
    stipend: str
    stipend_type: str
    required_skills: List[str]
    description: str
    responsibilities: List[str]
    perks: List[str]
    eligibility: str
    deadline: str
    active: bool
    applicants_count: int
    created_at: datetime
    match_percentage: Optional[int] = None
    matching_skills: Optional[List[str]] = None
    missing_skills: Optional[List[str]] = None

    class Config:
        from_attributes = True

class ProjectOpportunityResponse(BaseModel):
    id: int
    company_id: int
    company_name: str
    logo_url: Optional[str]
    title: str
    category: str
    description: str
    required_skills: List[str]
    duration: str
    team_size: str
    work_type: str
    stipend: str
    deliverables: List[str]
    deadline: str
    active: bool
    applicants_count: int
    created_at: datetime

    class Config:
        from_attributes = True

class ApplicationCreate(BaseModel):
    opportunity_type: str = "internship"  # "internship" or "project"
    opportunity_id: int
    cover_note: Optional[str] = None
    resume_url: Optional[str] = None
    selected_skills: Optional[List[str]] = None

class ApplicationStatusUpdate(BaseModel):
    status: str  # applied, under_review, shortlisted, interview, selected, rejected
    interview_date: Optional[str] = None
    interview_link: Optional[str] = None
    feedback: Optional[str] = None

class ApplicationResponse(BaseModel):
    id: int
    applicant_id: int
    opportunity_type: str
    opportunity_id: int
    title: str
    company_name: str
    logo_url: Optional[str]
    student_name: str
    student_email: str
    student_college: str
    student_degree: str
    student_skills: List[str]
    resume_url: Optional[str]
    cover_note: Optional[str]
    match_percentage: int
    status: str
    timeline: List[Any]
    interview_date: Optional[str]
    interview_link: Optional[str]
    feedback: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

class NotificationResponse(BaseModel):
    id: int
    title: str
    message: str
    type: str
    read: bool
    link: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True
