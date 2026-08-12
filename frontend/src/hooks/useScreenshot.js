import html2canvas from "html2canvas";

/**
 * Captures whatever is currently rendered in the exam tab and returns it as a
 * base64 PNG data-URL, so the Placement Cell can see exactly what the
 * student's screen looked like the instant a violation fired. This captures
 * the page's own DOM (not the OS-level screen) -- browsers don't allow
 * silent access to a full screen capture without an explicit permission
 * prompt on every call, which would be disruptive mid-exam, so a DOM
 * snapshot of the exam surface is the practical, non-intrusive equivalent.
 */
export async function captureViolationScreenshot() {
  try {
    const canvas = await html2canvas(document.body, {
      logging: false,
      useCORS: true,
      scale: 0.6, // keep the payload small
    });
    return canvas.toDataURL("image/png", 0.7);
  } catch (e) {
    return null; // never let a screenshot failure block the auto-submit
  }
}
