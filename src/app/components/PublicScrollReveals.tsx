"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const REVEAL_CLASS = "cpsar-scroll-reveal";
const VISIBLE_CLASS = "cpsar-scroll-reveal-visible";

/** Adds reveal motion to public page content while leaving the first section untouched. */
export function PublicScrollReveals() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let observer: IntersectionObserver | null = null;
    const targets = new Set<HTMLElement>();
    const timer = window.setTimeout(() => {
      const main = document.querySelector<HTMLElement>("#maincontent main");
      if (!main) return;

      const sections = Array.from(main.querySelectorAll<HTMLElement>("section"))
        .filter((section) => !section.parentElement?.closest("section"));
      const firstSection = pathname === "/" ? sections[0] : null;

      for (const section of sections) {
        if (section === firstSection || section.closest("[data-no-scroll-reveal]")) continue;

        const articles = Array.from(section.querySelectorAll<HTMLElement>("article"))
          .filter((article) => article.closest("section") === section);
        const sectionHeader = section.querySelector<HTMLElement>("header");
        if (sectionHeader) {
          sectionHeader.dataset.revealDirection = "down";
          targets.add(sectionHeader);
        }
        section.querySelectorAll<HTMLElement>("h2").forEach((heading) => {
          if (!heading.closest("article") && !heading.closest("header")) {
            heading.dataset.revealDirection = "down";
            targets.add(heading);
          }
        });

        if (articles.length) {
          articles.forEach((article, index) => {
            article.style.setProperty("--cpsar-reveal-delay", `${Math.min(index * 110, 440)}ms`);
            targets.add(article);
          });
          continue;
        }

        const grid = section.querySelector<HTMLElement>(".grid");
        const columns = grid ? Array.from(grid.children).filter((child): child is HTMLElement => child instanceof HTMLElement) : [];
        if (columns.length === 2) {
          columns.forEach((column, index) => {
            column.dataset.revealDirection = index === 0 ? "left" : "right";
            targets.add(column);
          });
        } else {
          section.dataset.revealDirection = sections.indexOf(section) % 2 === 0 ? "left" : "right";
          targets.add(section);
        }
      }

      // Content pages with one article and no separate sections still get a gentle entrance.
      if (sections.length === 0) {
        main.querySelectorAll<HTMLElement>("article").forEach((article) => targets.add(article));
      }

      document.querySelectorAll<HTMLElement>("footer > div > div").forEach((block, index) => {
        block.dataset.revealDirection = index % 2 === 0 ? "left" : "right";
        block.style.setProperty("--cpsar-reveal-delay", `${Math.min(index * 100, 300)}ms`);
        targets.add(block);
      });

      const activeObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          element.classList.add(VISIBLE_CLASS);
          activeObserver.unobserve(element);
        }
      }, { threshold: 0.12, rootMargin: "0px 0px -48px 0px" });
      observer = activeObserver;

      targets.forEach((element) => {
        element.classList.add(REVEAL_CLASS);
        observer?.observe(element);
      });
    }, 260);

    return () => {
      window.clearTimeout(timer);
      observer?.disconnect();
      targets.forEach((element) => {
        element.classList.remove(REVEAL_CLASS, VISIBLE_CLASS);
        element.style.removeProperty("--cpsar-reveal-delay");
        delete element.dataset.revealDirection;
      });
    };
  }, [pathname]);

  return null;
}
