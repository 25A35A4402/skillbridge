import json
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from .database import engine, Base, get_db
from .models import User, StudentProfile, CompanyProfile, Internship, ProjectOpportunity, Application, Notification
from .schemas import (
    UserCreate, UserLogin, UserResponse,
    StudentProfileResponse, StudentProfileUpdate,
    CompanyProfileResponse,
    InternshipResponse, InternshipCreate,
    ProjectOpportunityResponse,
    ApplicationCreate, ApplicationResponse, ApplicationStatusUpdate,
    NotificationResponse
)
from .seed_data import seed_database

# Initialize SQLite tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SkillBridge API",
    description="Bridge Your Skills. Build Your Future. Backend REST APIs for student internships and real-world projects.",
    version="1.0.0"
)

# CORS Middleware for frontend React access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    # Automatically seed realistic demo data on startup
    db = next(get_db())
    try:
        seed_database(db)
    finally:
        db.close()

# Helper: Match calculation algorithm
def calculate_skill_match(student_skills: List[str], required_skills: List[str], interests: List[str] = None, category: str = None):
    if not required_skills:
        return 100, [], []
    
    student_skills_lower = [s.strip().lower() for s in student_skills]
    matching = []
    missing = []
    
    for req in required_skills:
        req_clean = req.strip().lower()
        if any(req_clean in s or s in req_clean for s in student_skills_lower):
            matching.append(req)
        else:
            missing.append(req)
            
    base_score = (len(matching) / len(required_skills)) * 85
    
    # Bonus for interest alignment
    bonus = 0
    if interests and category:
        category_lower = category.lower()
        for interest in interests:
            if any(term in category_lower for term in ["web", "frontend", "full-stack", "ai", "data", "cloud", "design"]):
                bonus = 10
                break
                
    final_score = min(int(base_score + bonus + 5), 98)
    return max(final_score, 45), matching, missing

# ----------------- AUTH ENDPOINTS -----------------
@app.post("/api/auth/register", response_model=UserResponse)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user_data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="An account with this email already exists")
    
    user = User(
        email=user_data.email,
        phone=user_data.phone,
        full_name=user_data.full_name,
        password_hash=user_data.password,
        role=user_data.role,
        avatar_url=user_data.avatar_url or "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    if user.role == "student":
        profile = StudentProfile(
            user_id=user.id,
            bio="Aspiring software engineer excited to learn and build.",
            skills=json.dumps(["React", "TypeScript", "Tailwind CSS"]),
            interests=json.dumps(["Web Engineering", "Product Design"]),
            certifications="[]",
            projects="[]"
        )
        db.add(profile)
    else:
        comp_profile = CompanyProfile(
            user_id=user.id,
            company_name=user.full_name,
            industry="Software & Technology",
            location="Bengaluru, Karnataka",
            website="https://example.com",
            about="Innovative company building the future."
        )
        db.add(comp_profile)
    
    db.commit()
    return user

@app.post("/api/auth/login")
def login(login_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login_data.email).first()
    if not user or user.password_hash != login_data.password:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    return {
        "access_token": f"skillbridge_token_{user.id}",
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "full_name": user.full_name,
            "role": user.role,
            "avatar_url": user.avatar_url
        }
    }

# ----------------- STUDENT PROFILE -----------------
@app.get("/api/student/profile", response_model=StudentProfileResponse)
def get_student_profile(db: Session = Depends(get_db)):
    profile = db.query(StudentProfile).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Student profile not found")
    
    return StudentProfileResponse(
        id=profile.id,
        user_id=profile.user_id,
        college=profile.college,
        degree=profile.degree,
        branch=profile.branch,
        grad_year=profile.grad_year,
        cgpa=profile.cgpa,
        bio=profile.bio,
        skills=json.loads(profile.skills or "[]"),
        interests=json.loads(profile.interests or "[]"),
        career_goals=profile.career_goals,
        certifications=json.loads(profile.certifications or "[]"),
        projects=json.loads(profile.projects or "[]"),
        resume_name=profile.resume_name,
        resume_url=profile.resume_url,
        portfolio_url=profile.portfolio_url,
        github_url=profile.github_url,
        linkedin_url=profile.linkedin_url,
        completion_percentage=profile.completion_percentage
    )

@app.put("/api/student/profile", response_model=StudentProfileResponse)
def update_student_profile(update_data: StudentProfileUpdate, db: Session = Depends(get_db)):
    profile = db.query(StudentProfile).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Student profile not found")
    
    if update_data.college is not None: profile.college = update_data.college
    if update_data.degree is not None: profile.degree = update_data.degree
    if update_data.branch is not None: profile.branch = update_data.branch
    if update_data.grad_year is not None: profile.grad_year = update_data.grad_year
    if update_data.cgpa is not None: profile.cgpa = update_data.cgpa
    if update_data.bio is not None: profile.bio = update_data.bio
    if update_data.career_goals is not None: profile.career_goals = update_data.career_goals
    if update_data.resume_name is not None: profile.resume_name = update_data.resume_name
    if update_data.portfolio_url is not None: profile.portfolio_url = update_data.portfolio_url
    if update_data.github_url is not None: profile.github_url = update_data.github_url
    if update_data.linkedin_url is not None: profile.linkedin_url = update_data.linkedin_url
    
    if update_data.skills is not None:
        profile.skills = json.dumps(update_data.skills)
    if update_data.interests is not None:
        profile.interests = json.dumps(update_data.interests)
    if update_data.certifications is not None:
        profile.certifications = json.dumps([c.dict() for c in update_data.certifications])
    if update_data.projects is not None:
        profile.projects = json.dumps([p.dict() for p in update_data.projects])
        
    db.commit()
    db.refresh(profile)
    
    return StudentProfileResponse(
        id=profile.id,
        user_id=profile.user_id,
        college=profile.college,
        degree=profile.degree,
        branch=profile.branch,
        grad_year=profile.grad_year,
        cgpa=profile.cgpa,
        bio=profile.bio,
        skills=json.loads(profile.skills or "[]"),
        interests=json.loads(profile.interests or "[]"),
        career_goals=profile.career_goals,
        certifications=json.loads(profile.certifications or "[]"),
        projects=json.loads(profile.projects or "[]"),
        resume_name=profile.resume_name,
        resume_url=profile.resume_url,
        portfolio_url=profile.portfolio_url,
        github_url=profile.github_url,
        linkedin_url=profile.linkedin_url,
        completion_percentage=profile.completion_percentage
    )

# ----------------- INTERNSHIPS -----------------
@app.get("/api/internships", response_model=List[InternshipResponse])
def get_internships(
    query: Optional[str] = None,
    category: Optional[str] = None,
    work_type: Optional[str] = None,
    skill: Optional[str] = None,
    db: Session = Depends(get_db)
):
    student_profile = db.query(StudentProfile).first()
    student_skills = json.loads(student_profile.skills) if student_profile else []
    student_interests = json.loads(student_profile.interests) if student_profile else []
    
    internships = db.query(Internship).filter(Internship.active == True).all()
    results = []
    
    for item in internships:
        req_skills = json.loads(item.required_skills or "[]")
        
        # Apply filters
        if query:
            q = query.lower()
            if q not in item.title.lower() and q not in item.company_name.lower() and q not in item.description.lower():
                continue
        if category and category != "All" and category.lower() not in item.category.lower():
            continue
        if work_type and work_type != "All" and work_type.lower() != item.work_type.lower():
            continue
        if skill and not any(skill.lower() in s.lower() for s in req_skills):
            continue
            
        match_pct, matching, missing = calculate_skill_match(
            student_skills, req_skills, student_interests, item.category
        )
        
        results.append(InternshipResponse(
            id=item.id,
            company_id=item.company_id,
            company_name=item.company_name,
            logo_url=item.logo_url,
            title=item.title,
            category=item.category,
            location=item.location,
            work_type=item.work_type,
            duration=item.duration,
            stipend=item.stipend,
            stipend_type=item.stipend_type,
            required_skills=req_skills,
            description=item.description,
            responsibilities=json.loads(item.responsibilities or "[]"),
            perks=json.loads(item.perks or "[]"),
            eligibility=item.eligibility,
            deadline=item.deadline,
            active=item.active,
            applicants_count=item.applicants_count,
            created_at=item.created_at,
            match_percentage=match_pct,
            matching_skills=matching,
            missing_skills=missing
        ))
        
    # Sort by skill match percentage descending by default
    results.sort(key=lambda x: x.match_percentage or 0, reverse=True)
    return results

@app.get("/api/internships/{internship_id}", response_model=InternshipResponse)
def get_internship_detail(internship_id: int, db: Session = Depends(get_db)):
    item = db.query(Internship).filter(Internship.id == internship_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Internship not found")
        
    student_profile = db.query(StudentProfile).first()
    student_skills = json.loads(student_profile.skills) if student_profile else []
    student_interests = json.loads(student_profile.interests) if student_profile else []
    req_skills = json.loads(item.required_skills or "[]")
    
    match_pct, matching, missing = calculate_skill_match(
        student_skills, req_skills, student_interests, item.category
    )
    
    return InternshipResponse(
        id=item.id,
        company_id=item.company_id,
        company_name=item.company_name,
        logo_url=item.logo_url,
        title=item.title,
        category=item.category,
        location=item.location,
        work_type=item.work_type,
        duration=item.duration,
        stipend=item.stipend,
        stipend_type=item.stipend_type,
        required_skills=req_skills,
        description=item.description,
        responsibilities=json.loads(item.responsibilities or "[]"),
        perks=json.loads(item.perks or "[]"),
        eligibility=item.eligibility,
        deadline=item.deadline,
        active=item.active,
        applicants_count=item.applicants_count,
        created_at=item.created_at,
        match_percentage=match_pct,
        matching_skills=matching,
        missing_skills=missing
    )

@app.post("/api/internships", response_model=InternshipResponse)
def create_internship(data: InternshipCreate, db: Session = Depends(get_db)):
    comp = db.query(CompanyProfile).first()
    new_internship = Internship(
        company_id=comp.id if comp else 1,
        company_name=comp.company_name if comp else "TechScale AI",
        logo_url="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=200&q=80",
        title=data.title,
        category=data.category,
        location=data.location,
        work_type=data.work_type,
        duration=data.duration,
        stipend=data.stipend,
        stipend_type="Monthly",
        required_skills=json.dumps(data.required_skills),
        description=data.description,
        responsibilities=json.dumps(data.responsibilities),
        perks=json.dumps(data.perks),
        eligibility=data.eligibility,
        deadline=data.deadline,
        applicants_count=0
    )
    db.add(new_internship)
    db.commit()
    db.refresh(new_internship)
    
    return InternshipResponse(
        id=new_internship.id,
        company_id=new_internship.company_id,
        company_name=new_internship.company_name,
        logo_url=new_internship.logo_url,
        title=new_internship.title,
        category=new_internship.category,
        location=new_internship.location,
        work_type=new_internship.work_type,
        duration=new_internship.duration,
        stipend=new_internship.stipend,
        stipend_type=new_internship.stipend_type,
        required_skills=data.required_skills,
        description=new_internship.description,
        responsibilities=data.responsibilities,
        perks=data.perks,
        eligibility=new_internship.eligibility,
        deadline=new_internship.deadline,
        active=True,
        applicants_count=0,
        created_at=new_internship.created_at,
        match_percentage=85,
        matching_skills=data.required_skills[:2],
        missing_skills=[]
    )

# ----------------- PROJECTS -----------------
@app.get("/api/projects", response_model=List[ProjectOpportunityResponse])
def get_projects(db: Session = Depends(get_db)):
    projects = db.query(ProjectOpportunity).filter(ProjectOpportunity.active == True).all()
    results = []
    for item in projects:
        results.append(ProjectOpportunityResponse(
            id=item.id,
            company_id=item.company_id,
            company_name=item.company_name,
            logo_url=item.logo_url,
            title=item.title,
            category=item.category,
            description=item.description,
            required_skills=json.loads(item.required_skills or "[]"),
            duration=item.duration,
            team_size=item.team_size,
            work_type=item.work_type,
            stipend=item.stipend,
            deliverables=json.loads(item.deliverables or "[]"),
            deadline=item.deadline,
            active=item.active,
            applicants_count=item.applicants_count,
            created_at=item.created_at
        ))
    return results

# ----------------- APPLICATIONS -----------------
@app.get("/api/applications", response_model=List[ApplicationResponse])
def get_applications(db: Session = Depends(get_db)):
    apps = db.query(Application).order_by(Application.created_at.desc()).all()
    results = []
    for app_item in apps:
        results.append(ApplicationResponse(
            id=app_item.id,
            applicant_id=app_item.applicant_id,
            opportunity_type=app_item.opportunity_type,
            opportunity_id=app_item.opportunity_id,
            title=app_item.title,
            company_name=app_item.company_name,
            logo_url=app_item.logo_url,
            student_name=app_item.student_name,
            student_email=app_item.student_email,
            student_college=app_item.student_college,
            student_degree=app_item.student_degree,
            student_skills=json.loads(app_item.student_skills or "[]"),
            resume_url=app_item.resume_url,
            cover_note=app_item.cover_note,
            match_percentage=app_item.match_percentage,
            status=app_item.status,
            timeline=json.loads(app_item.timeline or "[]"),
            interview_date=app_item.interview_date,
            interview_link=app_item.interview_link,
            feedback=app_item.feedback,
            created_at=app_item.created_at
        ))
    return results

@app.post("/api/applications", response_model=ApplicationResponse)
def submit_application(app_data: ApplicationCreate, db: Session = Depends(get_db)):
    student = db.query(User).filter(User.role == "student").first()
    student_profile = db.query(StudentProfile).first()
    
    title = "Internship Opportunity"
    company_name = "SkillBridge Partner"
    logo_url = None
    
    if app_data.opportunity_type == "internship":
        internship = db.query(Internship).filter(Internship.id == app_data.opportunity_id).first()
        if internship:
            title = internship.title
            company_name = internship.company_name
            logo_url = internship.logo_url
            internship.applicants_count += 1
    else:
        project = db.query(ProjectOpportunity).filter(ProjectOpportunity.id == app_data.opportunity_id).first()
        if project:
            title = project.title
            company_name = project.company_name
            logo_url = project.logo_url
            project.applicants_count += 1
            
    today_str = datetime.utcnow().strftime("%b %d, %Y")
    timeline = [
        {"stage": "applied", "date": today_str, "note": "Application submitted with verified student portfolio."}
    ]
    
    new_app = Application(
        applicant_id=student.id if student else 1,
        opportunity_type=app_data.opportunity_type,
        opportunity_id=app_data.opportunity_id,
        title=title,
        company_name=company_name,
        logo_url=logo_url,
        student_name=student.full_name if student else "Aarav Sharma",
        student_email=student.email if student else "aarav.sharma@college.edu",
        student_college=student_profile.college if student_profile else "NIT",
        student_degree=student_profile.degree if student_profile else "B.Tech CSE",
        student_skills=student_profile.skills if student_profile else "[]",
        resume_url=app_data.resume_url or "https://skillbridge.dev/resumes/aarav_sharma_2026.pdf",
        cover_note=app_data.cover_note or "Applied via SkillBridge One-Click matching flow.",
        match_percentage=94,
        status="applied",
        timeline=json.dumps(timeline)
    )
    db.add(new_app)
    
    # Also add a notification
    notif = Notification(
        user_id=student.id if student else 1,
        title="Application Submitted!",
        message=f"You successfully applied for {title} at {company_name}.",
        type="application",
        link="/applications"
    )
    db.add(notif)
    
    db.commit()
    db.refresh(new_app)
    
    return ApplicationResponse(
        id=new_app.id,
        applicant_id=new_app.applicant_id,
        opportunity_type=new_app.opportunity_type,
        opportunity_id=new_app.opportunity_id,
        title=new_app.title,
        company_name=new_app.company_name,
        logo_url=new_app.logo_url,
        student_name=new_app.student_name,
        student_email=new_app.student_email,
        student_college=new_app.student_college,
        student_degree=new_app.student_degree,
        student_skills=json.loads(new_app.student_skills or "[]"),
        resume_url=new_app.resume_url,
        cover_note=new_app.cover_note,
        match_percentage=new_app.match_percentage,
        status=new_app.status,
        timeline=timeline,
        created_at=new_app.created_at
    )

@app.patch("/api/applications/{app_id}/status", response_model=ApplicationResponse)
def update_application_status(app_id: int, status_update: ApplicationStatusUpdate, db: Session = Depends(get_db)):
    app_item = db.query(Application).filter(Application.id == app_id).first()
    if not app_item:
        raise HTTPException(status_code=404, detail="Application not found")
        
    app_item.status = status_update.status
    if status_update.interview_date:
        app_item.interview_date = status_update.interview_date
    if status_update.interview_link:
        app_item.interview_link = status_update.interview_link
    if status_update.feedback:
        app_item.feedback = status_update.feedback
        
    timeline_list = json.loads(app_item.timeline or "[]")
    today_str = datetime.utcnow().strftime("%b %d, %Y")
    
    stage_notes = {
        "applied": "Application submitted.",
        "under_review": "Application under review by campus hiring team.",
        "shortlisted": "Candidate shortlisted for technical round.",
        "interview": f"Interview scheduled for {status_update.interview_date or 'upcoming week'}.",
        "selected": "Selected! Offer letter generated.",
        "rejected": "Application closed for this cycle."
    }
    
    timeline_list.append({
        "stage": status_update.status,
        "date": today_str,
        "note": status_update.feedback or stage_notes.get(status_update.status, "Status updated.")
    })
    app_item.timeline = json.dumps(timeline_list)
    
    db.commit()
    db.refresh(app_item)
    
    return ApplicationResponse(
        id=app_item.id,
        applicant_id=app_item.applicant_id,
        opportunity_type=app_item.opportunity_type,
        opportunity_id=app_item.opportunity_id,
        title=app_item.title,
        company_name=app_item.company_name,
        logo_url=app_item.logo_url,
        student_name=app_item.student_name,
        student_email=app_item.student_email,
        student_college=app_item.student_college,
        student_degree=app_item.student_degree,
        student_skills=json.loads(app_item.student_skills or "[]"),
        resume_url=app_item.resume_url,
        cover_note=app_item.cover_note,
        match_percentage=app_item.match_percentage,
        status=app_item.status,
        timeline=timeline_list,
        interview_date=app_item.interview_date,
        interview_link=app_item.interview_link,
        feedback=app_item.feedback,
        created_at=app_item.created_at
    )

# ----------------- NOTIFICATIONS -----------------
@app.get("/api/notifications", response_model=List[NotificationResponse])
def get_notifications(db: Session = Depends(get_db)):
    notifs = db.query(Notification).order_by(Notification.created_at.desc()).all()
    return notifs

@app.post("/api/notifications/{notif_id}/read")
def mark_notification_read(notif_id: int, db: Session = Depends(get_db)):
    notif = db.query(Notification).filter(Notification.id == notif_id).first()
    if notif:
        notif.read = True
        db.commit()
    return {"status": "success"}

# ----------------- COMPANY PROFILE -----------------
@app.get("/api/company/profile", response_model=CompanyProfileResponse)
def get_company_profile(db: Session = Depends(get_db)):
    comp = db.query(CompanyProfile).first()
    if not comp:
        raise HTTPException(status_code=404, detail="Company profile not found")
    return comp
