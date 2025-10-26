import React from "react";
import { researchIntegrityManifest } from "./manifest";

type Props = {
  lang: "en" | "es";
};

export function ResearchIntegrityIsland({ lang }: Props) {
  const str = researchIntegrityManifest.strings[lang];

  return (
    <section data-island-id={researchIntegrityManifest.id}>
      <header>
        <h2>{str.heading}</h2>
        <p>{str.subheading}</p>
      </header>
      <div>
        <button type="button" disabled>
          {str.ctaLabel ?? "Coming Soon"}
        </button>
      </div>
      {str.disclaimer ? (
        <p style={{ fontSize: "0.8rem", opacity: 0.7 }}>
          {str.disclaimer}
        </p>
      ) : null}
    </section>
  );
}
