/**
 * GeoVerity 2026 Data Models (Structured)
 * These interfaces define how we represent consulting pillars,
 * deliverables, and focus areas in both English and Spanish.
 *
 * Rules:
 * - Fields that are human-readable must have *_en and *_es variants.
 * - Shared factual fields (ids, slugs, flags) are language-agnostic.
 * - All user-facing text fields MUST have provenance tracking (v1.3.0+)
 */

/**
 * Content Provenance Metadata (v1.3.0)
 * Tracks authorship and AI auto-fix history for all user-facing content.
 *
 * State Machine:
 * ai-generated → ai-generated-fixed → human-edited → human-verified
 *
 * Enforcement: Content with "ai-generated" or "ai-generated-fixed" status
 * CANNOT be committed until human review is complete.
 */
export interface ProvenanceMetadata {
  provenance: 'ai-generated' | 'ai-generated-fixed' | 'human-edited' | 'human-verified';
  lastEdited: string; // ISO 8601 timestamp
  autoFixCount?: number; // Number of auto-fixes applied by checking-crappy-writing
  lastCheckingCrappyWritingVersion?: string; // e.g., "1.3.0"
}

/**
 * Content Governance Metadata
 * Required for all content files to track review status and approval.
 */
export interface ContentMeta {
  contentStatus: 'requires-review' | 'approved';
  lastCheckingCrappyWritingRun?: string; // ISO 8601 timestamp
  reviewedBy?: string; // GitHub username or "human"
}

export interface Deliverable {
  id: string; // stable key, e.g. "authorized-llm"
  title_en: string;
  title_en_provenance?: ProvenanceMetadata;
  title_es: string;
  title_es_provenance?: ProvenanceMetadata;
  summary_en: string;
  summary_en_provenance?: ProvenanceMetadata;
  summary_es: string;
  summary_es_provenance?: ProvenanceMetadata;
  sensitivityLevel: "normal" | "high-sensitivity";
  _meta?: ContentMeta;
}

export interface Pillar {
  id: string; // e.g. "higher-education-consulting"
  slug_en: string; // e.g. "/higher-education-consulting/"
  slug_es: string; // e.g. "/es/consultoria-academica/"
  name_en: string;
  name_en_provenance?: ProvenanceMetadata;
  name_es: string;
  name_es_provenance?: ProvenanceMetadata;
  description_en: string;
  description_en_provenance?: ProvenanceMetadata;
  description_es: string;
  description_es_provenance?: ProvenanceMetadata;
  deliverables: Deliverable[];
  _meta?: ContentMeta;
  // In future we may attach governance flags, accreditation relevance, etc.
}
