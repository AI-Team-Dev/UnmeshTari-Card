import {
  profile,
  getWhatsAppUrl,
  getTelUrl,
  getMailtoUrl,
  getVCardFilename,
} from "./profile.js";
import { initHeroTilt } from "./interactions.js";

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function setHref(id, href) {
  const el = document.getElementById(id);
  if (el) el.href = href;
}

function setSrc(id, src) {
  const el = document.getElementById(id);
  if (el) el.src = src;
}

function populateProfile() {
  setSrc("logo", profile.logo);
  setSrc("photo", profile.photo);
  setSrc("company-logo", profile.logo);

  setText("name", profile.name);
  setText("designation", profile.designation);
  setText("company", profile.company);
  setText("tagline", profile.tagline);
  setText("positioning", profile.positioning);

  setText("about-text", profile.about);
  setText("cta-subtitle", profile.ctaSubtitle);
  setText("company-heading", profile.company);
  setText("company-tagline", profile.tagline);
  setText("company-description", profile.companyDescription);

  setText("contact-name", profile.name);
  setText("contact-role", profile.designation);
  setText("contact-company", profile.company);
  setText("contact-phone-value", profile.phoneDisplay);
  setText("contact-email-value", profile.email);
  setText("contact-website-value", profile.website.replace(/^https?:\/\//, ""));

  setText("footer-company", profile.company);
  setText("year", new Date().getFullYear().toString());

  const whatsappUrl = getWhatsAppUrl();
  const telUrl = getTelUrl();
  const mailtoUrl = getMailtoUrl();

  ["whatsapp-hero", "whatsapp-sticky", "whatsapp-cta"].forEach((id) =>
    setHref(id, whatsappUrl)
  );
  setHref("call-link", telUrl);
  setHref("email-link", mailtoUrl);
  setHref("linkedin-link", profile.linkedin);
  setHref("website-link", profile.website);
  setHref("visit-website", profile.website);
  setHref("contact-phone", telUrl);
  setHref("contact-email", mailtoUrl);
  setHref("contact-linkedin", profile.linkedin);
  setHref("contact-website", profile.website);

  const expertiseList = document.getElementById("expertise-list");
  if (expertiseList) {
    expertiseList.innerHTML = profile.expertise
      .map((item) => {
        const wide = item.label.length > 28 ? " expertise-chip--wide" : "";
        return `<li class="expertise-chip${wide}"><span class="expertise-chip__num">${item.num}</span><span class="expertise-chip__label">${item.label}</span><span class="expertise-chip__line" aria-hidden="true"></span></li>`;
      })
      .join("");
  }

  const addressEl = document.getElementById("address");
  if (addressEl) {
    addressEl.innerHTML = profile.address.lines
      .map((line) => `${line}<br>`)
      .join("");
  }
}

function buildVCard() {
  const nameParts = profile.name.split(" ");
  const lastName = nameParts.slice(-1)[0];
  const firstName = nameParts.slice(0, -1).join(" ");

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${profile.name}`,
    `N:${lastName};${firstName};;;`,
    `ORG:${profile.company}`,
    `TITLE:${profile.designation}`,
    `TEL;TYPE=CELL:${profile.phoneDisplay}`,
    `EMAIL:${profile.email}`,
    `URL:${profile.website}`,
    `URL:${profile.linkedin}`,
    `ADR;TYPE=WORK:;;${profile.address.full.replace(/,/g, "\\,")};;;;`,
    "END:VCARD",
  ];
  return lines.join("\r\n");
}

function downloadVCard() {
  const vcf = buildVCard();
  const blob = new Blob([vcf], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = getVCardFilename();
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function initSaveContact() {
  ["save-contact-hero", "save-contact-sticky", "save-contact-cta"].forEach((id) => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener("click", downloadVCard);
  });
}

function initHeroReveal() {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReduced) {
    document.querySelectorAll(".reveal").forEach((el) => {
      el.classList.add("revealed");
    });
    return;
  }

  document.querySelectorAll(".reveal").forEach((el) => {
    const delay = Number(el.dataset.delay || 0) * 120;
    setTimeout(() => el.classList.add("revealed"), delay + 80);
  });
}

function initSectionReveal() {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReduced) {
    document.querySelectorAll(".reveal-section").forEach((el) => {
      el.classList.add("revealed");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal-section").forEach((section) => {
    observer.observe(section);
  });
}

function initStickyBar() {
  const stickyBar = document.getElementById("sticky-bar");
  const heroActions = document.querySelector(".hero__actions");
  if (!stickyBar || !heroActions) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        stickyBar.classList.remove("sticky-bar--visible");
      } else {
        stickyBar.classList.add("sticky-bar--visible");
      }
    },
    { threshold: 0, rootMargin: "0px" }
  );

  observer.observe(heroActions);

}

document.addEventListener("DOMContentLoaded", () => {
  populateProfile();
  initSaveContact();
  initHeroReveal();
  initSectionReveal();
  initStickyBar();
  initHeroTilt();
});
