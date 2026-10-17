# SkillBridge 🌉
> **“Bridge Your Skills. Build Your Future.”**

SkillBridge connects college students and fresh graduates (18–24 years) with genuine internships and real-world projects based on verifiable skills, education, and career goals.

---

## 🚀 Running the Project Locally

### 1. Backend (FastAPI + Python)
The backend REST APIs are powered by FastAPI and SQLite with automatic realistic seed data on startup.

```bash
# In project root (d:/skillbridge)
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```
- API Base URL: `http://127.0.0.1:8000`
- Interactive Swagger Docs: `http://127.0.0.1:8000/docs`

### 2. Frontend (React + TypeScript + Tailwind CSS)
The frontend application is built with Vite, React, TypeScript, and modern Tailwind CSS.

```bash
cd frontend
npm install
npm run dev
```
- Web Application URL: `http://localhost:5173/`

---

## 🌟 Key Platform Features

1. **Modern Landing Page**:
   - SkillBridge Logo & Tagline.
   - Interactive Live Skill Match Calculator in the Hero.
   - Benefits, How It Works (4-step visual flow), and Featured Opportunities.
   - Student success stories & verified company logos.

2. **Student Authentication & Quick Demo Buttons**:
   - Email/password, phone, role toggle (Student / Company).
   - 1-Click Demo Buttons: **Demo Student (Aarav Sharma)** and **Demo Company (Razorpay Recruiter)**.

3. **Student Profile & Portfolio Showcase**:
   - Skills displayed as attractive interactive tags.
   - Showcase projects with live repository links and stars.
   - Verified certifications with AWS & Meta credential IDs.
   - Public shareable portfolio view (`skillbridge.dev/@aaravsharma`).

4. **Student Dashboard**:
   - Profile completion score meter (95%).
   - Recommended high-match internships & real-world projects.
   - Upcoming technical interview banner with Google Meet link.
   - Skill gap suggestions (Docker, Next.js 15) to boost match scores.

5. **Internship Search & Advanced Filters**:
   - Search by role title, company name, skill, or keyword.
   - Category pills, work mode pills (Remote, Hybrid, On-site), duration, and stipend.
   - Cards display exact match percentages (e.g. *95% Skill Match*), required skill badges, and quick apply.

6. **Internship Details & 5-Step Application Flow**:
   - Deep-dive details modal with company info, responsibilities, perks, and eligibility.
   - 5-Step Application Flow:
     - Step 1: Personal Info
     - Step 2: Education Details
     - Step 3: Skills Match
     - Step 4: Resume & Pitch Note
     - Step 5: Review & Submit (with celebration confetti!)

7. **Application Tracking Pipeline**:
   - Clean 5-stage progress tracker:
     `Applied` → `Under Review` → `Shortlisted` → `Interview` → `Selected / Offer`
   - Meeting room action for interviews.
   - Expandable recruiter history and feedback notes.

8. **Real-World Project Opportunities**:
   - Opportunities with team sizes, milestone bounties, and deliverables.

9. **Company & Recruiter Portal**:
   - Top-bar role switcher button to switch between Student View and Company View.
   - Recruiter dashboard metrics.
   - Post opportunity form with validation.
   - Candidate applications review with 1-click status transitions (Shortlist, Schedule Interview, Make Offer).
