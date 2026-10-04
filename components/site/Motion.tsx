"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * The site's only client-side script. It watches for [data-reveal] elements
 * entering the viewport and adds `is-in`, which plays the CSS transition in
 * globals.css, and counts [data-count] numbers up from zero once.
 *
 * It renders nothing. It re-runs on every route change so the second page
 * reveals its own content after client-side navigation.
 */

const format = new Intl.NumberFormat("en-US");
let firstMount = true;

function countUp(el: HTMLElement) {
  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix ?? "";
  // Single digits ("2 countries") read better standing still.
  if (!Number.isFinite(target) || target < 10) return;
  const duration = 1400;
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = format.format(Math.round(target * eased)) + suffix;
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/**
 * In-page links (the nav's "/#news", the skip link). Sections below the fold
 * use content-visibility, so until they are rendered the page only estimates
 * their height. A smooth scroll then renders them one by one on the way down,
 * the page grows mid-glide, and the scroll lands short of its target (by
 * ~650px on desktop in testing). So on click, lay those sections out first,
 * glide to the now-accurate position, then hand them back. Each keeps its
 * real height afterwards (contain-intrinsic-size: auto), so nothing shifts.
 */
function useAccurateAnchors() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href*='#']");
      if (!(link instanceof HTMLAnchorElement)) return;
      const url = new URL(link.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;

      event.preventDefault();
      const root = document.documentElement;
      root.classList.add("anchoring");
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      history.pushState(null, "", url.hash);

      // Move keyboard focus too, as a native anchor jump would.
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });

      const release = () => root.classList.remove("anchoring");
      if ("onscrollend" in window) window.addEventListener("scrollend", release, { once: true });
      else setTimeout(release, 1500); // older Safari: no scrollend
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}

export function Motion() {
  const pathname = usePathname();
  useAccurateAnchors();

  useEffect(() => {
    const root = document.documentElement;
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)")
    );
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // If this script arrived after the CSS failsafe already showed everything
    // (a very slow first load), just keep it all shown rather than re-hiding.
    const late = firstMount && performance.now() > 3500;
    firstMount = false;

    if (reduce || late || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-in"));
      root.classList.add("motion-ready");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.classList.add("is-in");
          observer.unobserve(el);
          el.querySelectorAll<HTMLElement>("[data-count]").forEach(countUp);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    targets.forEach((el) => observer.observe(el));
    root.classList.add("motion-ready");
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
