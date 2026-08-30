const state = { data: null, filter: "All" };

async function loadData(){
  try{
    const res = await fetch("data/content.json", {cache:"no-store"});
    if(!res.ok) throw new Error("Could not load content.json");
    state.data = await res.json();
    render();
  }catch(err){
    console.error(err);
    document.body.insertAdjacentHTML("beforeend",
      '<div style="position:fixed;bottom:15px;left:15px;right:15px;background:#8b2c2c;color:white;padding:12px;border-radius:10px;z-index:99">Content could not be loaded. Make sure data/content.json exists.</div>');
  }
}

function render(){
  const d = state.data;
  document.title = `${d.profile.name} | ${d.profile.headline}`;
  document.getElementById("hero-intro").textContent = d.profile.intro;
  document.getElementById("about-title").textContent = d.profile.aboutTitle;
  document.getElementById("about-text").textContent = d.profile.about;
  document.getElementById("contact-text").textContent = d.profile.contactText;
  document.getElementById("cv-link").href = d.profile.cv || "#";

  document.getElementById("about-points").innerHTML = (d.aboutPoints || []).map(x =>
    `<div class="about-point"><strong>${escapeHtml(x.title)}</strong><span>${escapeHtml(x.text)}</span></div>`).join("");

  document.getElementById("skills-grid").innerHTML = (d.skills || []).map(x =>
    `<article class="skill-card"><h3>${escapeHtml(x.title)}</h3><div class="skill-tags">${(x.items||[]).map(s=>`<span class="skill-tag">${escapeHtml(s)}</span>`).join("")}</div></article>`).join("");

  const categories = ["All", ...new Set((d.projects||[]).map(p=>p.category).filter(Boolean))];
  document.getElementById("project-filters").innerHTML = categories.map(c =>
    `<button class="filter-btn ${c===state.filter?"active":""}" data-filter="${escapeAttr(c)}">${escapeHtml(c)}</button>`).join("");
  document.querySelectorAll(".filter-btn").forEach(btn => btn.addEventListener("click", ()=>{
    state.filter = btn.dataset.filter; renderProjects();
    document.querySelectorAll(".filter-btn").forEach(b=>b.classList.toggle("active",b.dataset.filter===state.filter));
  }));
  renderProjects();

  document.getElementById("experience-list").innerHTML = (d.experience||[]).map(x =>
    `<div class="timeline-item"><span class="date">${escapeHtml(x.period)}</span><h3>${escapeHtml(x.role)}</h3><strong>${escapeHtml(x.organization)}</strong><p>${escapeHtml(x.description)}</p></div>`).join("");

  const e = d.education;
  document.getElementById("education-card").innerHTML = `<div><p class="eyebrow">DEGREE</p><h3>${escapeHtml(e.degree)}</h3><p>${escapeHtml(e.institution)}</p><p>${escapeHtml(e.period)}</p></div><div class="gpa">GPA ${escapeHtml(e.gpa)}</div>`;

  document.getElementById("certificate-grid").innerHTML = (d.certificates||[]).map(x =>
    `<article class="certificate-card"><span class="cert-year">${escapeHtml(x.year)}</span><h3>${escapeHtml(x.name)}</h3><p>${escapeHtml(x.issuer)}</p></article>`).join("");

  document.getElementById("contact-links").innerHTML = (d.contacts||[]).map(x =>
    `<a href="${escapeAttr(x.url)}" target="_blank" rel="noopener">${escapeHtml(x.label)} ↗</a>`).join("");

  document.getElementById("year").textContent = new Date().getFullYear();
}

function renderProjects(){
  const projects = (state.data.projects||[]).filter(p => state.filter==="All" || p.category===state.filter);
  document.getElementById("project-grid").innerHTML = projects.map(p => `
    <article class="project-card">
      <div class="project-image">${p.image ? `<img src="${escapeAttr(p.image)}" alt="${escapeAttr(p.title)}">` : `<div class="placeholder">01</div>`}</div>
      <div class="project-body">
        <div class="project-top"><span class="category">${escapeHtml(p.category)}</span><span>↗</span></div>
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.description)}</p>
        <div class="tech-list">${(p.tools||[]).map(t=>`<span class="tech">${escapeHtml(t)}</span>`).join("")}</div>
        ${p.link ? `<a class="project-link" href="${escapeAttr(p.link)}" target="_blank" rel="noopener">View project →</a>` : ""}
      </div>
    </article>`).join("");
}

function escapeHtml(v=""){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function escapeAttr(v=""){return escapeHtml(v)}
document.querySelector(".menu-toggle").addEventListener("click",()=>document.querySelector(".nav").classList.toggle("open"));
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>document.querySelector(".nav").classList.remove("open")));
loadData();
