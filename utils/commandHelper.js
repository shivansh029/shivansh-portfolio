export const COMMANDS = [
  {
    command: "whoami",
    description: "Who Am I?",
  },
  {
    command: "about",
    description: "About Me",
  },
  {
    command: "education",
    description: "My Education",
  },
  {
    command: "skills",
    description: "My Tech Skills",
  },
  {
    command: "experience",
    description: "My Professional Experience",
  },
  {
    command: "resume",
    description: "My Resume",
  },
  {
    command: "contact",
    description: "Contact Me",
  },
  {
    command: "hire-me",
    description: "Recruiter? Type This!",
  },
  {
    command: "certifications",
    description: "My Certifications",
  },
  {
    command: "theme",
    description: "Toggle Light/Dark Theme",
  },
  {
    command: "help",
    description: "List All Commands",
  },
  {
    command:
      // 'clear <span style="color: var(--primary)">(Ctrl+L shortcut)</span>',
      "clear",
    description: "Clear Terminal",
  },
];

const getAbout = async () => {
  const { content } = await (await fetch("/api/about")).json();
  return content;
};

const getEducation = async () => {
  const educationData = await (await fetch("/api/education")).json();
  return (
    `<span style="color: var(--system-msg)">Education Status: Completed</span><br/><br/>` +
    educationData
      .map(
        (edu) => `
      ${edu.description ? edu.description + "<br/><br/>" : ""}
      <div class="command"><b>${edu.institution}</b></div>
      <div class="meaning">${edu.degree}<br/>${edu.duration}</div>
      <br />
    `
      )
      .join("")
  );
};

const getSkills = async () => {
  const { overview, categories } = await (await fetch("/api/skills")).json();
  return (
    `${overview}<br /><br />` +
    categories
      .map(
        (cat) => `<div class="skill"><b>${cat.name}</b>: ${cat.skills.join(", ")}</div>`
      )
      .join("")
  );
};

const getExperience = async () => {
  const experienceData = await (await fetch("/api/experience")).json();
  return experienceData
    .map(
      (exp, index) => `
    <div class="command"><span style="color:var(--highlight)">${index + 1}. ${exp.company
        }</span> | ${exp.role}</div>
    <div class="meaning">${exp.duration} | ${exp.location}</div>
    <br/>
    ${exp.projects
          .map(
            (proj) => `
      <div class="command"><u>Project: ${proj.name}</u></div>
      ${proj.highlights
                .map((hl) => `<div class="meaning">[•] ${hl}</div>`)
                .join("")}
      <br/>
    `
          )
          .join("")}
  `
    )
    .join("");
};

const getCertifications = async () => {
  const certificationsData = await (await fetch("/api/certifications")).json();
  return certificationsData
    .map(
      (cert) => `
    <div class="command"><b>${cert.name}</b></div>
    <div class="meaning">Certification ID: ${cert.id}</div>
    <br />
  `
    )
    .join("");
};

const getContacts = async () => {
  const contactMediums = await (await fetch("/api/contacts")).json();
  return (
    contactMediums
      .map(
        (contact) => `<div style="display: flex; justify-content: space-between; gap: 8px; margin-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 4px;">
      <p style="font-size: 15px; font-weight: bold;">${contact.medium}</p>
      <a class="meaning" href="${contact.link}" target="_blank" style="text-align: right;">${contact.username}</a>
    </div>`
      )
      .join("")
  );
};

export const CONTENTS = {
  help: () =>
    COMMANDS.map(
      (command) => `<div style="display: flex; justify-content: space-between; gap: 10px; margin-bottom: 4px;">
        <p style="font-size: 15px; color: var(--primary); font-weight: bold;">${command.command}</p>
        <p style="color: var(--text-color); text-align: right;">${command.description}</p>
      </div>`
    ).join("") +
    `<br />
      <div class="command">Type one of the above to view. For eg. <span style="color: var(--secondary)">about</span></div>`,
  about: getAbout,
  education: getEducation,
  skills: getSkills,
  experience: getExperience,
  contact: getContacts,
  certifications: getCertifications,
  theme: (args) => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    let newTheme = currentTheme === "dark" ? "light" : "dark";

    if (args && args.length > 0) {
      if (args[0] === "light") newTheme = "light";
      if (args[0] === "dark") newTheme = "dark";
    }

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    // Dispatch custom event to update ThemeToggle component state
    window.dispatchEvent(new CustomEvent("themeChange", { detail: newTheme }));

    return `Theme set to <span style="color: var(--primary)">${newTheme}</span> mode`;
  },
  "hire-me": getContacts,
  whoami: () => {
    return `
    <pre class="asciiFull" style="color: var(--primary); line-height: 1.2; font-size: 10px; margin-bottom: 15px;">
  ____  _     _                      _     __     __                          
 / ___|| |__ (_)_   ____ _ _ __  ___| |__  \\ \\   / /__ _ __ _ __ ___   __ _ 
 \\___ \\| '_ \\| \\ \\ / / _\` | '_ \\/ __| '_ \\  \\ \\ / / _ \\ '__| '_ \` _ \\ / _\` |
  ___) | | | | |\\ V / (_| | | | \\__ \\ | | |  \\ V /  __/ |  | | | | | | (_| |
 |____/|_| |_|_| \\_/ \\__,_|_| |_|___/_| |_|   \\_/ \\___|_|  |_| |_| |_|\\__,_|
    </pre>
    <pre class="asciiMobile" style="color: var(--primary); line-height: 1.2; font-size: 10px; margin-bottom: 15px;">
  ______     __
 / ___\\ \\   / /
 \\___ \\\\ \\ / / 
  ___) |\\ V /  
 |____/  \\_/   
    </pre>
    <div style="color: var(--text-color); font-weight: bold; font-size: 16px;">Software Engineer</div>
    <div style="color: var(--secondary);">Backend | Distributed Systems | Java</div>`;
  },
  resume: async () => {
    return "/Shivansh_Verma_Resume.pdf";
  },
  error: (input) =>
    `<div class="help-command">sh: Unknown command: <span style="color: var(--error-msg)">${input}</span></div><div class="help-command">See \`help\` for info`,
};
