const COMMANDS = [
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
    command: "certifications",
    description: "My Certifications",
  },
  {
    command:
      // 'clear <span style="color: var(--primary)">(Ctrl+L shortcut)</span>',
      "clear",
    description: "Clear terminal",
  },
];

const getAbout = async () => {
  const { content } = await (await fetch("/api/about")).json();
  return content;
};

const getEducation = async () => {
  const educationData = await (await fetch("/api/education")).json();
  return (
    `<span style="color: #73daca">Education Status: Completed</span><br/><br/>` +
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
    <div class="command"><span style="color:#e0af68">${index + 1}. ${exp.company
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
        (contact) => `<div style="display: flex; justify-content: space-between;">
      <p style="font-size: 15px">${contact.medium}</p>
      <a class="meaning" href="${contact.link}" target="_blank">${contact.username}</a>
    </div>`
      )
      .join("")
  );
};

export const CONTENTS = {
  help: () =>
    COMMANDS.map(
      (command) => `<div style="display: flex; justify-content: space-between;">
        <p style="font-size: 15px">${command.command}</p>
        <p>${command.description}</p>
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
  resume: () => {
    window.open("/Shivansh_Verma_Resume.pdf", "_blank");
    return "";
  },
  error: (input) =>
    `<div class="help-command">sh: Unknown command: ${input}</div><div class="help-command">See \`help\` for info`,
};
