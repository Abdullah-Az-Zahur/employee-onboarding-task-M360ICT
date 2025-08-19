# 🌟 Employee Onboarding Multi-Step Form (M360ICT Assessment Task)

This project is a **multi-step employee onboarding form** built as part of the **M360ICT Frontend Developer Assessment Task**.  
It demonstrates skills in **Next.js, React Hook Form, Zod, TailwindCSS, and shadcn/ui** with strong focus on validation, conditional logic, and user experience.

---

## 🚀 Live Demo
🔗 [Live Project](https://employee-onboarding-task-m360-ict.vercel.app/)  
🔗 [GitHub Repository](https://github.com/Abdullah-Az-Zahur/employee-onboarding-task-M360ICT)

---

## 🛠️ Tech Stack
- **Next.js 15 (App Router)**
- **TypeScript**
- **React Hook Form** – form state management
- **Zod v4** – schema-based validation
- **shadcn/ui** – modern UI components
- **Tailwind CSS** – utility-first styling

---

## 📋 Features
✔️ 5-step onboarding form with validations  
✔️ Smart conditional logic & dynamic field visibility  
✔️ Cross-step validation rules  
✔️ Progress indicator with step navigation  
✔️ Auto-save form state in React state  
✔️ Review & confirmation step before submission  
✔️ Mock data integration (managers & skills)  
✔️ Fully deployed on **Vercel**

---

## 🧠 Business Logic & Conditions
- **Age check** → Must be **18+ years old**.  
- **Salary validation** →  
  - Full-time → Annual salary **$30,000 – $200,000**  
  - Contract → Hourly rate **$50 – $150**  
- **Department rules** →  
  - Start date **cannot be weekend** if department = HR/Finance  
  - Manager dropdown filtered by department  
  - Skills list depends on department  
- **Guardian Contact** → Required if age < 21  
- **Remote Work** → If preference > 50%, requires manager approval  

---

## ⚡ Challenges & Solutions
- **Zod v4 Breaking Changes**  
  - `ctx.parent` no longer works with primitives → moved validation to **object-level `superRefine`**.  
- **TypeScript Errors**  
  - Fixed using `z.infer<typeof schema>` for strong typing.  
- **shadcn/ui Integration**  
  - Learned and combined with Tailwind for clean UI/UX.

---

## ▶️ Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Abdullah-Az-Zahur/employee-onboarding-task-M360ICT.git
cd employee-onboarding-task-M360ICT


### 2️⃣ Install Dependencies
```bash
npm install

### 3️⃣ Run Development Server
```bash
npm run dev

App will be running at:
👉 http://localhost:3000



