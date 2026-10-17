import json
from sqlalchemy.orm import Session
from .models import User, StudentProfile, CompanyProfile, Internship, ProjectOpportunity, Application, Notification

def seed_database(db: Session):
    # Check if data already exists
    if db.query(User).first():
        return

    # 1. Create Student User
    student_user = User(
        email="aarav.sharma@college.edu",
        phone="+91 98765 43210",
        full_name="Aarav Sharma",
        password_hash="demo123",
        role="student",
        avatar_url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
    )
    db.add(student_user)
    db.commit()
    db.refresh(student_user)

    # Student Profile
    student_profile = StudentProfile(
        user_id=student_user.id,
        college="National Institute of Technology (NIT)",
        degree="Bachelor of Technology (B.Tech)",
        branch="Computer Science & Engineering",
        grad_year=2026,
        cgpa=8.85,
        bio="Passionate 3rd-year CS student with hands-on experience building full-stack web applications and interactive UI systems. Looking to contribute to impactful engineering teams.",
        skills=json.dumps(["React", "TypeScript", "Tailwind CSS", "Next.js", "Python", "FastAPI", "PostgreSQL", "Git", "REST APIs", "Node.js"]),
        interests=json.dumps(["Full-Stack Web Engineering", "Generative AI Products", "FinTech Systems", "Open Source Tooling"]),
        career_goals="Aspiring to become a Software Engineer at a high-velocity product company, architecting modern distributed web applications.",
        certifications=json.dumps([
            {
                "title": "AWS Certified Cloud Practitioner (CLF-C02)",
                "issuer": "Amazon Web Services",
                "year": "2025",
                "credential_id": "AWS-CCP-98214-IN"
            },
            {
                "title": "Meta Front-End Developer Professional Certificate",
                "issuer": "Coursera / Meta",
                "year": "2024",
                "credential_id": "META-FE-77412-ID"
            },
            {
                "title": "Full Stack Open (Deep Dive Into Modern Web Development)",
                "issuer": "University of Helsinki",
                "year": "2024",
                "credential_id": "HELSINKI-FSO-2024"
            }
        ]),
        projects=json.dumps([
            {
                "title": "DevConnect - Collaborative Peer Review Platform",
                "description": "Engineered a real-time markdown review & snippet collaboration tool using React, WebSockets, and FastAPI.",
                "tech": ["React", "TypeScript", "FastAPI", "WebSockets", "Tailwind CSS"],
                "link": "https://github.com/aaravsharma/devconnect",
                "stars": 64
            },
            {
                "title": "SmartResume AI - Resume Scoring Engine",
                "description": "Built an intelligent keyword parsing and formatting tool for college students applying to tech internships.",
                "tech": ["Next.js", "Python", "OpenAI API", "PostgreSQL"],
                "link": "https://github.com/aaravsharma/smart-resume",
                "stars": 89
            },
            {
                "title": "CryptoPulse - Crypto Portfolio & Webhook Alerts",
                "description": "High-throughput cryptocurrency tracking dashboard with interactive charts and automated price alert webhooks.",
                "tech": ["React", "Tailwind CSS", "Chart.js", "Vite"],
                "link": "https://github.com/aaravsharma/cryptopulse",
                "stars": 41
            }
        ]),
        resume_name="Aarav_Sharma_Resume_2026.pdf",
        resume_url="https://skillbridge.dev/resumes/aarav_sharma_2026.pdf",
        portfolio_url="https://aaravsharma.dev",
        github_url="https://github.com/aaravsharma",
        linkedin_url="https://linkedin.com/in/aaravsharma",
        completion_percentage=92
    )
    db.add(student_profile)

    # 2. Create Company User
    company_user = User(
        email="talent@razorpay.com",
        phone="+91 80 4668 5000",
        full_name="Priya Nair (Campus Lead)",
        password_hash="demo123",
        role="company",
        avatar_url="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
    )
    db.add(company_user)
    db.commit()
    db.refresh(company_user)

    company_profile = CompanyProfile(
        user_id=company_user.id,
        company_name="Razorpay Technologies",
        logo_url="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
        industry="FinTech & Payments",
        location="Bengaluru, Karnataka (HQ)",
        website="https://razorpay.com",
        about="Razorpay is India's leading payment gateway and neobanking platform powering modern financial transactions for millions of businesses.",
        size="2,000+ employees",
        verified=True
    )
    db.add(company_profile)
    db.commit()
    db.refresh(company_profile)

    # 3. Create Additional Company Profiles for rich ecosystem
    companies_data = [
        {
            "name": "Razorpay Technologies",
            "logo": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
            "industry": "FinTech & Payments",
            "location": "Bengaluru (Hybrid)",
            "website": "https://razorpay.com"
        },
        {
            "name": "Postman",
            "logo": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=200&q=80",
            "industry": "Developer Tools & APIs",
            "location": "Bengaluru / Remote",
            "website": "https://postman.com"
        },
        {
            "name": "Hasura",
            "logo": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=200&q=80",
            "industry": "Cloud Infrastructure & GraphQL",
            "location": "Bengaluru (Hybrid)",
            "website": "https://hasura.io"
        },
        {
            "name": "Swiggy",
            "logo": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=200&q=80",
            "industry": "Consumer Tech & Logistics",
            "location": "Bengaluru (On-site)",
            "website": "https://swiggy.com"
        },
        {
            "name": "Innovaccer AI",
            "logo": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=200&q=80",
            "industry": "HealthTech & Artificial Intelligence",
            "location": "Noida / Remote",
            "website": "https://innovaccer.com"
        },
        {
            "name": "Zerodha Rainmatter",
            "logo": "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=200&q=80",
            "industry": "Financial Markets & Incubator",
            "location": "Bengaluru (On-site)",
            "website": "https://rainmatter.com"
        }
    ]

    # 4. Create Internships
    internships_data = [
        {
            "company_name": "Razorpay Technologies",
            "logo_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
            "title": "Frontend React Developer Intern",
            "category": "Frontend Development",
            "location": "Bengaluru, Karnataka (Hybrid)",
            "work_type": "Hybrid",
            "duration": "6 Months",
            "stipend": "₹35,000 / month",
            "stipend_type": "Monthly",
            "required_skills": ["React", "TypeScript", "Tailwind CSS", "REST APIs", "Git"],
            "description": "Join our Merchant Dashboard Engineering team to build pixel-perfect, accessible, and high-performance financial interfaces used by over 5 million businesses across India.",
            "responsibilities": [
                "Implement modular React components using TypeScript and Tailwind CSS",
                "Collaborate with backend engineers to consume RESTful and GraphQL APIs",
                "Optimize client-side bundle size, Core Web Vitals, and responsive mobile layouts",
                "Participate in weekly code reviews, design critiques, and engineering demos"
            ],
            "perks": [
                "Pre-Placement Offer (PPO) evaluation for high performers",
                "Direct 1-on-1 mentorship from Senior Staff Engineers",
                "Latest M3 MacBook Pro provided for internship duration",
                "Comprehensive health & accidental insurance coverage",
                "Free breakfast, catered lunches, and snacks at campus"
            ],
            "eligibility": "B.Tech / B.E / Dual Degree students graduating in 2026 or 2027",
            "deadline": "2026-11-20",
            "applicants_count": 38
        },
        {
            "company_name": "Postman",
            "logo_url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=200&q=80",
            "title": "Full-Stack API Engineering Intern",
            "category": "Full-Stack Development",
            "location": "Bengaluru / Remote",
            "work_type": "Remote",
            "duration": "6 Months",
            "stipend": "₹45,000 / month",
            "stipend_type": "Monthly",
            "required_skills": ["Node.js", "React", "TypeScript", "REST APIs", "PostgreSQL"],
            "description": "Work directly on Postman's public API network and developer workspace features. You will help build collaborative tools used by 30+ million developers worldwide.",
            "responsibilities": [
                "Develop scalable microservices in Node.js / TypeScript",
                "Design and maintain automated API integration tests",
                "Build polished interactive UI panels in React and Electron",
                "Write technical developer guides and open-source API documentation"
            ],
            "perks": [
                "100% remote flexibility with home office setup stipend",
                "High PPO conversion rate for full-time Software Engineer 1",
                "Company sponsored attendance to international developer conferences",
                "Monthly learning & wellness allowance"
            ],
            "eligibility": "B.Tech / MCA / B.Sc Computer Science students graduating 2026",
            "deadline": "2026-11-15",
            "applicants_count": 52
        },
        {
            "company_name": "Innovaccer AI",
            "logo_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=200&q=80",
            "title": "AI & LLM Solutions Intern",
            "category": "Artificial Intelligence",
            "location": "Noida, UP (Hybrid)",
            "work_type": "Hybrid",
            "duration": "3-6 Months",
            "stipend": "₹40,000 / month",
            "stipend_type": "Monthly",
            "required_skills": ["Python", "FastAPI", "PyTorch", "REST APIs", "SQL"],
            "description": "Collaborate with our Data Science and AI product team to fine-tune retrieval-augmented generation (RAG) pipelines and automated clinical summarization agents.",
            "responsibilities": [
                "Build and benchmark LLM embeddings and vector search evaluation pipelines",
                "Create lightweight Python microservices using FastAPI and Docker",
                "Curate clean training datasets and run bias / hallucination stress tests",
                "Integrate AI workflows with enterprise healthcare data connectors"
            ],
            "perks": [
                "Opportunity to work on state-of-the-art AI infrastructure",
                "Co-authorship on technical whitepapers and patents",
                "Direct guidance from Chief AI Scientist",
                "Competitive stipend with performance bonuses"
            ],
            "eligibility": "Students with strong Python and ML foundations (Graduation 2026/2027)",
            "deadline": "2026-11-25",
            "applicants_count": 29
        },
        {
            "company_name": "Zerodha Rainmatter",
            "logo_url": "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=200&q=80",
            "title": "UI/UX Product Design Intern",
            "category": "Product & UI/UX",
            "location": "Bengaluru, Karnataka (On-site)",
            "work_type": "On-site",
            "duration": "4 Months",
            "stipend": "₹30,000 / month",
            "stipend_type": "Monthly",
            "required_skills": ["Figma", "Design Systems", "User Research", "Wireframing", "Prototyping"],
            "description": "Help design frictionless financial interfaces, investment tools, and climate technology dashboards for Rainmatter backed initiatives.",
            "responsibilities": [
                "Conduct student and retail investor user interviews and synthesize feedback",
                "Create high-fidelity interactive Figma prototypes with design token support",
                "Collaborate with frontend developers to ensure design fidelity in production",
                "Build accessible typography and color contrast palettes"
            ],
            "perks": [
                "Portfolio-defining real-world design work",
                "Casual, high-autonomy engineering culture",
                "Mentorship from founding design leads",
                "Catered organic meals and vibrant workspace"
            ],
            "eligibility": "Design, B.Des, Human-Computer Interaction, or Tech students with strong portfolio",
            "deadline": "2026-11-18",
            "applicants_count": 24
        },
        {
            "company_name": "Hasura",
            "logo_url": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=200&q=80",
            "title": "Cloud DevOps & Platform Intern",
            "category": "Cloud & DevOps",
            "location": "Bengaluru (Hybrid)",
            "work_type": "Hybrid",
            "duration": "6 Months",
            "stipend": "₹35,000 / month",
            "stipend_type": "Monthly",
            "required_skills": ["Docker", "Kubernetes", "Linux", "Git", "Python"],
            "description": "Learn how cloud-native data platforms handle high concurrency and multi-cloud Kubernetes orchestration. Join our infrastructure core engineering group.",
            "responsibilities": [
                "Automate CI/CD pipelines using GitHub Actions and ArgoCD",
                "Configure Prometheus and Grafana alerts for latency and resource spikes",
                "Write Infrastructure as Code (Terraform) scripts for staging clusters",
                "Assist in zero-downtime deployment rehearsals and disaster recovery drills"
            ],
            "perks": [
                "Hands-on production Kubernetes experience",
                "AWS/GCP certification fees fully reimbursed",
                "Fast-track interview for Associate DevOps Engineer role",
                "Flexible hybrid schedule"
            ],
            "eligibility": "B.Tech / B.E in CS / IT / Electronics (2026 passout)",
            "deadline": "2026-11-30",
            "applicants_count": 19
        },
        {
            "company_name": "Swiggy",
            "logo_url": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=200&q=80",
            "title": "Data Analytics & Growth Intern",
            "category": "Data Science & Analytics",
            "location": "Bengaluru (On-site)",
            "work_type": "On-site",
            "duration": "3 Months",
            "stipend": "₹28,000 / month",
            "stipend_type": "Monthly",
            "required_skills": ["SQL", "Python", "Tableau", "Data Analysis", "Excel"],
            "description": "Dive into petabytes of hyperlocal delivery logistics and consumer demand data to uncover operational efficiencies and customer retention patterns.",
            "responsibilities": [
                "Write complex SQL queries on Snowflake and BigQuery data warehouses",
                "Build executive Tableau dashboards tracking weekly cohort retention",
                "Analyze A/B experiment test results for new delivery pricing models",
                "Present actionable business recommendations to product category leads"
            ],
            "perks": [
                "Swiggy One corporate subscription and meal credits",
                "Exposure to hyper-scale consumer data systems",
                "Potential PPO conversion to Associate Data Analyst",
                "Dynamic young team environment"
            ],
            "eligibility": "Students in Engineering, Mathematics, Economics, or Statistics (Graduation 2026)",
            "deadline": "2026-11-12",
            "applicants_count": 45
        }
    ]

    for item in internships_data:
        internship = Internship(
            company_id=company_profile.id,
            company_name=item["company_name"],
            logo_url=item["logo_url"],
            title=item["title"],
            category=item["category"],
            location=item["location"],
            work_type=item["work_type"],
            duration=item["duration"],
            stipend=item["stipend"],
            stipend_type=item["stipend_type"],
            required_skills=json.dumps(item["required_skills"]),
            description=item["description"],
            responsibilities=json.dumps(item["responsibilities"]),
            perks=json.dumps(item["perks"]),
            eligibility=item["eligibility"],
            deadline=item["deadline"],
            applicants_count=item["applicants_count"]
        )
        db.add(internship)
    db.commit()

    # 5. Create Real-World Project Opportunities
    projects_data = [
        {
            "company_name": "Razorpay DevRel",
            "logo_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
            "title": "Open Source FinTech React Component SDK",
            "category": "Open Source / SDK",
            "description": "Build an open-source lightweight React UI kit for checkout badges, UPI QR modals, and currency calculators. Featured on Razorpay Developer Hub.",
            "required_skills": ["React", "TypeScript", "Tailwind CSS", "NPM Packaging"],
            "duration": "6 Weeks",
            "team_size": "3 Students",
            "work_type": "Remote",
            "stipend": "₹20,000 Milestone Bounty + Verified Badge",
            "deliverables": [
                "Modular NPM package with Storybook documentation",
                "Accessible keyboard navigation (WCAG AA compliance)",
                "Live demo sandbox with 5 interactive mock checkout scenarios"
            ],
            "deadline": "2026-11-28",
            "applicants_count": 12
        },
        {
            "company_name": "GreenTech Alliance",
            "logo_url": "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=200&q=80",
            "title": "Campus Energy & Carbon Footprint Tracker",
            "category": "Climate Tech & IoT",
            "description": "Develop a multi-campus dashboard tracking electricity, water, and paper waste metrics with gamified student sustainability leaderboards.",
            "required_skills": ["Python", "FastAPI", "React", "Chart.js", "PostgreSQL"],
            "duration": "8 Weeks",
            "team_size": "4 Students",
            "work_type": "Remote",
            "stipend": "₹25,000 Project Grant + Sustainability Certificate",
            "deliverables": [
                "RESTful backend ingesting smart sensor telemetry",
                "Interactive carbon savings calculator and student rankings",
                "Automated PDF monthly report generator for college administration"
            ],
            "deadline": "2026-12-05",
            "applicants_count": 16
        },
        {
            "company_name": "SkillBridge Innovation Labs",
            "logo_url": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=200&q=80",
            "title": "AI Mock Interview Practice Bot with Real-time Speech Analysis",
            "category": "Artificial Intelligence / WebRTC",
            "description": "Create an AI-powered technical and behavioral mock interview room where students receive instant feedback on confidence, pace, and clarity.",
            "required_skills": ["React", "FastAPI", "WebRTC", "OpenAI Whisper", "Tailwind CSS"],
            "duration": "6 Weeks",
            "team_size": "3-4 Students",
            "work_type": "Remote",
            "stipend": "₹30,000 Milestone Bonus + Production Deployment",
            "deliverables": [
                "Real-time audio waveform visualization and transcript recording",
                "Automated score breakdown across Technical, Clarity, and Confidence metrics",
                "Downloadable interview performance summary report"
            ],
            "deadline": "2026-11-30",
            "applicants_count": 22
        }
    ]

    for item in projects_data:
        project = ProjectOpportunity(
            company_id=company_profile.id,
            company_name=item["company_name"],
            logo_url=item["logo_url"],
            title=item["title"],
            category=item["category"],
            description=item["description"],
            required_skills=json.dumps(item["required_skills"]),
            duration=item["duration"],
            team_size=item["team_size"],
            work_type=item["work_type"],
            stipend=item["stipend"],
            deliverables=json.dumps(item["deliverables"]),
            deadline=item["deadline"],
            applicants_count=item["applicants_count"]
        )
        db.add(project)
    db.commit()

    # 6. Create realistic applications for Aarav Sharma to populate timeline tracker!
    all_internships = db.query(Internship).all()
    if all_internships:
        # App 1: Razorpay -> Interview scheduled
        app1 = Application(
            applicant_id=student_user.id,
            opportunity_type="internship",
            opportunity_id=all_internships[0].id,
            title=all_internships[0].title,
            company_name=all_internships[0].company_name,
            logo_url=all_internships[0].logo_url,
            student_name="Aarav Sharma",
            student_email="aarav.sharma@college.edu",
            student_college="National Institute of Technology",
            student_degree="B.Tech Computer Science (2026)",
            student_skills=json.dumps(["React", "TypeScript", "Tailwind CSS", "REST APIs", "Git"]),
            resume_url="https://skillbridge.dev/resumes/aarav_sharma_2026.pdf",
            cover_note="Excited to apply for the Frontend React role! I've built multiple production-grade web apps with React and TypeScript.",
            match_percentage=94,
            status="interview",
            interview_date="Oct 22, 2026 • 3:30 PM IST",
            interview_link="https://meet.google.com/sb-rzp-tech",
            feedback="Strong project portfolio in React and clean state management. Moving to technical round.",
            timeline=json.dumps([
                {"stage": "applied", "date": "Oct 10, 2026", "note": "Application submitted with resume and GitHub links."},
                {"stage": "under_review", "date": "Oct 12, 2026", "note": "Profile and portfolio reviewed by Campus Recruitment team."},
                {"stage": "shortlisted", "date": "Oct 14, 2026", "note": "Shortlisted based on high skill match (94%) and live project demo."},
                {"stage": "interview", "date": "Oct 16, 2026", "note": "Technical 1-on-1 scheduled with Senior Frontend Architect for Oct 22."}
            ])
        )
        db.add(app1)

        # App 2: Postman -> Shortlisted
        if len(all_internships) > 1:
            app2 = Application(
                applicant_id=student_user.id,
                opportunity_type="internship",
                opportunity_id=all_internships[1].id,
                title=all_internships[1].title,
                company_name=all_internships[1].company_name,
                logo_url=all_internships[1].logo_url,
                student_name="Aarav Sharma",
                student_email="aarav.sharma@college.edu",
                student_college="National Institute of Technology",
                student_degree="B.Tech Computer Science (2026)",
                student_skills=json.dumps(["React", "Node.js", "TypeScript", "REST APIs"]),
                resume_url="https://skillbridge.dev/resumes/aarav_sharma_2026.pdf",
                cover_note="Passionate about API ecosystems. Long time Postman user and open source contributor.",
                match_percentage=88,
                status="shortlisted",
                timeline=json.dumps([
                    {"stage": "applied", "date": "Oct 08, 2026", "note": "Application submitted."},
                    {"stage": "under_review", "date": "Oct 11, 2026", "note": "Engineering screening passed."},
                    {"stage": "shortlisted", "date": "Oct 15, 2026", "note": "Added to priority shortlist for batch interview cycle."}
                ])
            )
            db.add(app2)

        # App 3: Hasura -> Selected / Offer
        if len(all_internships) > 4:
            app3 = Application(
                applicant_id=student_user.id,
                opportunity_type="internship",
                opportunity_id=all_internships[4].id,
                title=all_internships[4].title,
                company_name=all_internships[4].company_name,
                logo_url=all_internships[4].logo_url,
                student_name="Aarav Sharma",
                student_email="aarav.sharma@college.edu",
                student_college="National Institute of Technology",
                student_degree="B.Tech Computer Science (2026)",
                student_skills=json.dumps(["Docker", "Linux", "Git", "Python"]),
                resume_url="https://skillbridge.dev/resumes/aarav_sharma_2026.pdf",
                cover_note="Experienced in Docker containerization and CI/CD pipelines.",
                match_percentage=85,
                status="selected",
                feedback="Congratulations! The engineering panel was impressed by your DevConnect architecture walkthrough.",
                timeline=json.dumps([
                    {"stage": "applied", "date": "Sep 28, 2026", "note": "Application submitted."},
                    {"stage": "under_review", "date": "Oct 01, 2026", "note": "Screening completed."},
                    {"stage": "shortlisted", "date": "Oct 04, 2026", "note": "Shortlisted for interview."},
                    {"stage": "interview", "date": "Oct 08, 2026", "note": "Completed 60-min system design interview."},
                    {"stage": "selected", "date": "Oct 14, 2026", "note": "Official Offer Letter released! Welcome to Hasura."}
                ])
            )
            db.add(app3)

        # App 4: Swiggy -> Under Review
        if len(all_internships) > 5:
            app4 = Application(
                applicant_id=student_user.id,
                opportunity_type="internship",
                opportunity_id=all_internships[5].id,
                title=all_internships[5].title,
                company_name=all_internships[5].company_name,
                logo_url=all_internships[5].logo_url,
                student_name="Aarav Sharma",
                student_email="aarav.sharma@college.edu",
                student_college="National Institute of Technology",
                student_degree="B.Tech Computer Science (2026)",
                student_skills=json.dumps(["Python", "SQL"]),
                resume_url="https://skillbridge.dev/resumes/aarav_sharma_2026.pdf",
                cover_note="Eager to apply data analysis and Python skills to real consumer scale.",
                match_percentage=72,
                status="under_review",
                timeline=json.dumps([
                    {"stage": "applied", "date": "Oct 15, 2026", "note": "Application received."},
                    {"stage": "under_review", "date": "Oct 16, 2026", "note": "Currently under automated eligibility and profile review."}
                ])
            )
            db.add(app4)

    # 7. Create Notifications
    notifications_data = [
        {
            "title": "Interview Invitation: Razorpay",
            "message": "Your technical interview for Frontend React Developer Intern is scheduled for Oct 22, 2026 at 3:30 PM IST.",
            "type": "interview",
            "link": "/applications"
        },
        {
            "title": "Offer Letter Released! 🎉",
            "message": "Hasura has selected your application for Cloud DevOps & Platform Intern. Click to view offer details.",
            "type": "application",
            "link": "/applications"
        },
        {
            "title": "New High Match Opportunity (94%)",
            "message": "Postman posted 'Full-Stack API Engineering Intern' matching your React and Node.js skills.",
            "type": "match",
            "link": "/internships"
        },
        {
            "title": "Application Shortlisted",
            "message": "Your application to Postman has moved to the 'Shortlisted' candidate stage.",
            "type": "application",
            "link": "/applications"
        },
        {
            "title": "SkillBridge Verification Tip",
            "message": "Adding a GitHub live demo URL increases your profile shortlisting chance by 3.2x.",
            "type": "system",
            "link": "/profile"
        }
    ]

    for n in notifications_data:
        notif = Notification(
            user_id=student_user.id,
            title=n["title"],
            message=n["message"],
            type=n["type"],
            link=n["link"],
            read=False
        )
        db.add(notif)
    db.commit()
