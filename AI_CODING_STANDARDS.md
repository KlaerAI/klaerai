# AI Coding Standards & Guidelines

This document establishes the mandatory standards for all AI models and developers contributing to this codebase. These rules must be followed strictly to ensure premium quality, high performance, and flawless user experience.

## 1. UI/UX & Design Philosophy (HIGHEST PRIORITY)
*   **Aesthetics First**: Every component must look "premium". Use consistent padding, harmonious typography, and subtle shadows/borders. "Bare minimum" styling is unacceptable.
*   **micro-interactions**: Interactive elements (buttons, cards, links) must provide immediate feedback (hover scale, color shift, or active state).
*   **Whitespace**: Use generous whitespace to create a clean, modern feel. Avoid clutter.
*   **Mobile-Responsiveness**: All designs must be fully responsive. Test layouts on mobile (320px), tablet, and desktop breakpoints.

## 2. Motion & Animations
*   **Hardware Acceleration**: **ONLY** animate `opacity` and `transform` properties. NEVER animate layout properties like `width`, `height`, `top`, `left`, or `margin` as they trigger expensive layout reflows.
*   **Smoothing**: Avoid default linear easing. Use custom cubic-bezier curves for natural, snappy motion (e.g., `cubic-bezier(0.76, 0, 0.24, 1)`).
*   **Coordination**: Animations seamlessly flow into one another (staggered delay) rather than happening all at once.
*   **Performance**: Use `requestAnimationFrame` for loop-based animations. Ensure `will-change` is used sparingly and removed when not needed.

## 3. Rendering & React Best Practices
*   **Hydration Safety**: To prevent "Text content does not match server-rendered HTML" errors:
    *   Avoid using `window` or `document` in the global scope or initial render.
    *   Wrap client-only visual logic (like random numbers or dates) in a `useEffect` or use a `mounted` state check.
*   **Stability**: No layout shifts (CLS). Define explicit aspect ratios for images and loading placeholders for async data.
*   **Key Props**: Always use unique, stable IDs for list keys (never use array index unless the list is static and never reordered).

## 4. Code Efficiency & Architecture
*   **"Check Twice" Rule**: Before outputting code, verify:
    *   Are there usage of heavy libraries (e.g., lodash) where native JS suffices?
    *   Are event listeners properly cleaned up in `useEffect` return statements?
    *   Are `useMemo` and `useCallback` used for expensive calculations or function props passed to children?
*   **Component Structure**:
    *   Keep components small and focused (Single Responsibility Principle).
    *   Abstract complex logic into custom hooks (`useScrollPosition`, `useWindowSize`).
*   **Type Safety**: Strict TypeScript usage. No `any`. Define interfaces for all props and state.

## 5. Deployment & Validation
*   **Error Handling**: Fail gracefully. If an image fails to load, show a fallback. If an API call fails, show a user-friendly error toast, not a white screen/crash.
*   **Console Cleanliness**: Final code must not produce console warnings (e.g., "unique key prop", "unrecognized DOM property").

---

**Example of "Perfect" Animation Code:**
```tsx
// Good: Hardware accelerated, smooth easing, standard cleanup
<div 
  className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
  style={{ transform: isActive ? "translateY(0)" : "translateY(10px)" }}
/>
```

**Example of "Bad" Animation Code:**
```tsx
// CAUTION: Triggers layout thrashing, linear boring easing
<div 
  style={{ marginTop: isActive ? 0 : 10, transition: "all 0.5s ease" }} 
/>
```
