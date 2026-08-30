const DATA_URL = "data/content.json";

async function loadPortfolio() {
  try {
    const response = await fetch(DATA_URL);

    if (!response.ok) {
      throw new Error("Failed to load portfolio data");
    }

    const data = await response.json();

    renderProfile(data);
    renderAbout(data);
    renderSkills(data);
    renderProjects(data);
    renderExperience(data);
    renderEducation(data);
    renderCertificates(data);
    renderTools(data);
    renderContacts(data);

    document.getElementById("year").textContent =
      new Date().getFullYear();

  } catch (error) {
    console.error("Portfolio loading error:", error);
  }
}


/* =========================
   PROFILE
========================= */

function renderProfile(data) {
  const profile = data.profile || {};

  const intro = document.getElementById("intro");

  if (intro && profile.intro) {
    intro.textContent = profile.intro;
  }

  const cv = document.getElementById("cv");

  if (cv && profile.cv) {
    cv.href = profile.cv;
    cv.target = "_blank";
  }

  const socials = document.getElementById("socials");

  if (socials && Array.isArray(data.contacts)) {
    socials.innerHTML = data.contacts
      .filter(item =>
        ["LinkedIn", "GitHub"].includes(item.label)
      )
      .map(item => `
        <a href="${item.url}" target="_blank">
          ${item.label}
        </a>
      `)
      .join("");
  }
}


/* =========================
   ABOUT
========================= */

function renderAbout(data) {

  const profile = data.profile || {};

  const aboutText = document.getElementById("aboutText");

  if (aboutText) {
    aboutText.textContent =
      profile.about ||
      profile.intro ||
      "";
  }


  const container =
    document.getElementById("aboutPoints");

  if (!container) return;

  const points =
    data.about_points ||
    data.aboutPoints ||
    [];

  container.innerHTML =
    points.map((item, index) => `
      <article>
        <span>0${index + 1}</span>

        <h3>
          ${item.title || ""}
        </h3>

        <p>
          ${item.description || item.text || ""}
        </p>
      </article>
    `).join("");
}


/* =========================
   SKILLS
========================= */

function renderSkills(data) {

  const container =
    document.getElementById("skillsGrid");

  if (!container) return;

  const skills =
    data.skills ||
    [];

  const icons = [
    "⌁",
    "⌖",
    "〈〉",
    "◫"
  ];

  container.innerHTML =
    skills.map((skill, index) => {

      const items =
        skill.items ||
        skill.tools ||
        skill.description ||
        [];

      let list = "";

      if (Array.isArray(items)) {

        list = items.map(item => `
          <li>${item}</li>
        `).join("");

      } else {

        list = `
          <li>${items}</li>
        `;
      }

      return `
        <article class="skill">

          <div class="icon">
            ${icons[index % icons.length]}
          </div>

          <h3>
            ${skill.title || skill.name || ""}
          </h3>

          <ul>
            ${list}
          </ul>

        </article>
      `;

    }).join("");
}


/* =========================
   PROJECTS
========================= */

function renderProjects(data) {

  const container =
    document.getElementById("projectsGrid");

  if (!container) return;

  const projects =
    data.projects ||
    [];

  container.innerHTML =
    projects.map((project, index) => {

      const image =
        project.image ||
        project.thumbnail ||
        "";

      const tools =
        project.tools ||
        project.technologies ||
        [];

      return `
        <article class="project">

          <div class="project-img">

            ${
              image
                ? `<img src="${image}" alt="${project.title || ""}">`
                : ""
            }

            <span class="num">
              ${String(index + 1).padStart(2, "0")}
            </span>

          </div>

          <div class="project-body">

            <span class="tag">
              ${project.category || "PROJECT"}
            </span>

            <h3>
              ${project.title || ""}
            </h3>

            <p>
              ${project.description || ""}
            </p>

            <div class="chips">

              ${
                Array.isArray(tools)
                  ? tools.map(tool =>
                      `<span class="chip">${tool}</span>`
                    ).join("")
                  : ""
              }

            </div>

          </div>

        </article>
      `;

    }).join("");
}


/* =========================
   EXPERIENCE
========================= */

function renderExperience(data) {

  const container =
    document.getElementById("experienceGrid");

  if (!container) return;

  const experiences =
    data.experience ||
    data.experiences ||
    [];

  container.innerHTML =
    experiences.map(item => `

      <article>

        <span class="period">
          ${item.period || ""}
        </span>

        <h3>
          ${item.role || item.title || ""}
        </h3>

        <span class="org">
          ${item.organization || item.company || ""}
        </span>

        <p>
          ${item.description || ""}
        </p>

      </article>

    `).join("");
}


/* =========================
   EDUCATION
========================= */

function renderEducation(data) {

  const container =
    document.getElementById("educationCard");

  if (!container) return;

  const education =
    data.education ||
    {};

  container.innerHTML = `

    <h3>
      ${education.degree || ""}
    </h3>

    <p>
      ${education.institution || ""}
    </p>

    ${
      education.period
        ? `<p>${education.period}</p>`
        : ""
    }

    ${
      education.gpa
        ? `<p>GPA: ${education.gpa}</p>`
        : ""
    }

  `;
}


/* =========================
   CERTIFICATES
========================= */

function renderCertificates(data) {

  const container =
    document.getElementById("certGrid");

  if (!container) return;

  const certificates =
    data.certificates ||
    data.certificate ||
    [];

  container.innerHTML =
    certificates.map(item => `

      <article class="cert">

        <b>
          ${item.title || item.name || ""}
        </b>

        <span>
          ${item.issuer || ""}
          ${
            item.year
              ? ` · ${item.year}`
              : ""
          }
        </span>

      </article>

    `).join("");
}


/* =========================
   TOOLS
========================= */

function renderTools(data) {

  const container =
    document.getElementById("tools");

  if (!container) return;

  let tools =
    data.tools ||
    [];

  if (!Array.isArray(tools)) {
    tools = Object.values(tools);
  }

  container.innerHTML =
    tools.map(tool => `

      <span class="tool">
        ${typeof tool === "string"
          ? tool
          : tool.name || ""}
      </span>

    `).join("");
}


/* =========================
   CONTACT
========================= */

function renderContacts(data) {

  const container =
    document.getElementById("contacts");

  const email =
    document.getElementById("email");

  const contacts =
    data.contacts ||
    [];

  if (email) {

    const emailItem =
      contacts.find(item =>
        item.label === "Email"
      );

    if (emailItem) {
      email.href = emailItem.url;
    }
  }


  if (!container) return;

  container.innerHTML =
    contacts.map(item => `

      <div class="contact-row">

        <span>
          ${item.label || ""}
        </span>

        <a
          href="${item.url || "#"}"
          target="_blank"
        >
          ${
            item.display ||
            item.value ||
            item.label ||
            ""
          }
        </a>

      </div>

    `).join("");
}


/* =========================
   MOBILE MENU
========================= */

const menuButton =
  document.querySelector(".menu");

const nav =
  document.querySelector(".nav nav");

if (menuButton && nav) {

  menuButton.addEventListener(
    "click",
    () => {

      nav.classList.toggle("open");

    }
  );
}


/* =========================
   START
========================= */

loadPortfolio();

// ================================
// MOBILE MENU
// ================================

const menuButton = document.querySelector(".menu");
const nav = document.querySelector(".nav nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuButton.classList.toggle("active");
  });

  // Close menu after clicking a navigation link
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.classList.remove("active");
    });
  });
}
