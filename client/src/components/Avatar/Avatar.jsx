/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📄 client/src/components/Avatar/Avatar.jsx · Phase 3 · ☆ stretch (15 min)
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎯 GOAL  Initials avatars (users have an avatarColor) and an overlapping <AvatarGroup max={3}> ("+2").
 *
 * 📝 STEPS
 *   1. export function Avatar({ name, color, size = 'md' }): initials = the first letters of the first two words (Intl-aware ☆),
 *      role="img" aria-label={name}, background: the user's colour. Choose a text colour with enough contrast
 *      (compute the relative luminance, or use color-contrast() where it's supported ☆).
 *   2. export function AvatarGroup({ users, max = 3 }): a FLEX row with negative margin-inline-start overlap,
 *      a ring (box-shadow) matching the surface colour, and a "+N" chip with a title listing the hidden names.
 *
 * ✅ DONE WHEN  [ ] Readable initials on every seed colour · the group doesn't wrap
 * ═══════════════════════════════════════════════════════════════════════════
 */
