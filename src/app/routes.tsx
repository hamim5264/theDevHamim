import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { LifeJourney } from "./pages/LifeJourney";
import { Projects } from "./pages/Projects";
import { ProjectDetail } from "./pages/ProjectDetail";

import { SkillsUniverse } from "./pages/SkillsUniverse";
import { PersonalLife } from "./pages/PersonalLife";
import { Achievements } from "./pages/Achievements";
import { Vision } from "./pages/Vision";
import { LeoAssistant } from "./pages/LeoAssistant";
import { Contact } from "./pages/Contact";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminDashboard } from "./pages/admin/Dashboard";
import { AdminProjects } from "./pages/admin/Projects";
import { AdminSkills } from "./pages/admin/Skills";
import { AdminTimeline } from "./pages/admin/Timeline";
import { AdminMedia } from "./pages/admin/Media";
import { AdminSettings } from "./pages/admin/Settings";
import { AdminLogin } from "./pages/admin/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/about",
    Component: About,
  },
  {
    path: "/journey",
    Component: LifeJourney,
  },
  {
    path: "/projects",
    Component: Projects,
  },
  {
    path: "/projects/:projectId",
    Component: ProjectDetail,

  },
  {
    path: "/skills",
    Component: SkillsUniverse,
  },
  {
    path: "/personal",
    Component: PersonalLife,
  },
  {
    path: "/achievements",
    Component: Achievements,
  },
  {
    path: "/vision",
    Component: Vision,
  },
  {
    path: "/leo",
    Component: LeoAssistant,
  },
  {
    path: "/contact",
    Component: Contact,
  },
  {
    path: "/admin/login",
    Component: AdminLogin,
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "projects", Component: AdminProjects },
      { path: "skills", Component: AdminSkills },
      { path: "timeline", Component: AdminTimeline },
      { path: "media", Component: AdminMedia },
      { path: "settings", Component: AdminSettings },
    ],
  },
]);
