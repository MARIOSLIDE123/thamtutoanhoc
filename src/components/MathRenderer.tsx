import React, { useMemo } from 'react';

declare global {
  interface Window {
    katex?: {
      renderToString: (
        tex: string,
        options?: {
          displayMode?: boolean;
          throwOnError?: boolean;
          output?: 'html' | 'mathml' | 'htmlAndMathml';
        }
      ) => string;
    };
  }
}

interface MathRendererProps {
  text: string;
  inline?: boolean;
  className?: string;
}

/**
 * Preprocesses raw text containing unicode math or non-LaTeX notations (e.g. 8√3, 8/√3, 4.5√2, b², 30°)
 * and normalizes them to standard LaTeX.
 */
export function normalizeMathText(raw: string): string {
  if (!raw) return '';

  let res = raw;

  // 1. If text already contains $, normalize inside/outside
  // If text has NO $, but contains math symbols like √, ^, /, sin, cos, tan, ≈, ², ³, °, try auto-converting
  if (!res.includes('$')) {
    // If the entire string looks like a formula or mathematical option (e.g. "AB = 8√3 cm", "d = 5√3 m", "AH = 4.5√2 cm")
    // Replace 8/√3 -> \frac{8}{\sqrt{3}}
    res = res.replace(/(\d+(?:[.,]\d+)?)\s*\/\s*√(\d+)/g, (_, p1, p2) => `$\\frac{${p1}}{\\sqrt{${p2}}}$`);
    res = res.replace(/(\d+(?:[.,]\d+)?)\s*\/\s*(\d+)/g, (_, p1, p2) => `$\\frac{${p1}}{${p2}}$`);
    // Replace √(\d+) -> \sqrt{$1}
    res = res.replace(/√(\d+(?:[.,]\d+)?)/g, (_, p1) => `$\\sqrt{${p1}}$`);
    res = res.replace(/√([a-zA-Z]+)/g, (_, p1) => `$\\sqrt{${p1}}$`);
    // Replace b² -> $b^2$, a² -> $a^2$, c² -> $c^2$
    res = res.replace(/([a-zA-Z0-9]+)²/g, (_, p1) => `$${p1}^2$`);
    res = res.replace(/([a-zA-Z0-9]+)³/g, (_, p1) => `$${p1}^3$`);
    // Replace ° in angles
    res = res.replace(/(\d+)°/g, (_, p1) => `$${p1}^\\circ$`);
  }

  return res;
}

/**
 * Beautiful HTML/CSS Fallback for Square Root with true overline vinculum
 */
export const SqrtFallback: React.FC<{ radicand: string }> = ({ radicand }) => {
  return (
    <span className="inline-flex items-center align-baseline mx-0.5 text-amber-200">
      <span className="text-amber-400 font-serif text-lg leading-none select-none -mr-0.5">√</span>
      <span className="border-t-2 border-amber-400 px-0.5 font-mono font-bold leading-tight text-amber-100">
        {radicand}
      </span>
    </span>
  );
};

/**
 * Beautiful HTML/CSS Fallback for Fraction with true horizontal fraction bar
 */
export const FractionFallback: React.FC<{ num: string; den: string }> = ({ num, den }) => {
  return (
    <span className="inline-flex flex-col items-center justify-center align-middle mx-1 text-center font-mono font-bold text-xs sm:text-sm text-amber-100">
      <span className="border-b-2 border-amber-400 px-1 pb-0.5 leading-none">{num}</span>
      <span className="pt-0.5 leading-none">{den}</span>
    </span>
  );
};

/**
 * Fallback HTML parser that generates true radical overline and fraction bar
 */
function renderFallbackMathHTML(tex: string): string {
  let res = tex;

  // Clean text wrappers
  res = res.replace(/\\text\{([^}]+)\}/g, '$1');

  // Replace \frac{\sqrt{a}}{b} or \frac{a}{\sqrt{b}} or \frac{a}{b}
  res = res.replace(
    /\\frac\{([^}]+)\}\{([^}]+)\}/g,
    '<span class="inline-flex flex-col items-center justify-center align-middle mx-1 text-center font-mono font-bold text-xs sm:text-sm"><span class="border-b-2 border-amber-400 px-1 pb-0.5 leading-none text-amber-100">$1</span><span class="pt-0.5 leading-none text-amber-100">$2</span></span>'
  );

  // Replace \sqrt{a} with radical + top line vinculum
  res = res.replace(
    /\\sqrt\{([^}]+)\}/g,
    '<span class="inline-flex items-center align-baseline mx-0.5 text-amber-200"><span class="text-amber-400 font-serif text-lg leading-none select-none">√</span><span class="border-t-2 border-amber-400 px-1 font-mono font-bold leading-tight text-amber-100">$1</span></span>'
  );

  // Replace raw √3 or √2 if any remains
  res = res.replace(
    /√([0-9a-zA-Z,.]+)/g,
    '<span class="inline-flex items-center align-baseline mx-0.5 text-amber-200"><span class="text-amber-400 font-serif text-lg leading-none select-none">√</span><span class="border-t-2 border-amber-400 px-1 font-mono font-bold leading-tight text-amber-100">$1</span></span>'
  );

  // Replace powers
  res = res.replace(/\^\{([^}]+)\}/g, '<sup class="text-amber-300 font-bold">$1</sup>');
  res = res.replace(/\^([0-9a-zA-Z]+)/g, '<sup class="text-amber-300 font-bold">$1</sup>');
  // Replace degree
  res = res.replace(/\\circ/g, '°');
  res = res.replace(/\^\\circ/g, '°');
  // Replace times / dot / approx
  res = res.replace(/\\cdot/g, ' · ');
  res = res.replace(/\\times/g, ' × ');
  res = res.replace(/\\approx/g, ' ≈ ');
  res = res.replace(/\\widehat\{([^}]+)\}/g, '$1^');

  return res;
}

/**
 * Renders a single math expression using KaTeX if available, or rich HTML radical/fraction fallback
 */
const KatexSpan: React.FC<{ math: string; displayMode?: boolean }> = ({ math, displayMode = false }) => {
  const html = useMemo(() => {
    let cleanMath = math.trim();

    // Convert any raw √ inside LaTeX into \sqrt{}
    cleanMath = cleanMath.replace(/√\{([^}]+)\}/g, '\\sqrt{$1}');
    cleanMath = cleanMath.replace(/√([0-9a-zA-Z,.]+)/g, '\\sqrt{$1}');

    if (typeof window !== 'undefined' && window.katex) {
      try {
        return window.katex.renderToString(cleanMath, {
          displayMode,
          throwOnError: false,
        });
      } catch (err) {
        console.warn('KaTeX rendering fallback:', err);
      }
    }

    // High fidelity fallback with true overline vinculum and fraction bars
    const fallback = renderFallbackMathHTML(cleanMath);
    return `<span class="inline-math font-mono text-amber-200 font-bold">${fallback}</span>`;
  }, [math, displayMode]);

  return <span className="inline-math inline-block align-middle" dangerouslySetInnerHTML={{ __html: html }} />;
};

/**
 * MathRenderer component:
 * Parses text containing inline ($...$) or display ($$...$$) math expressions
 * OR raw mathematical text (8√3, 8/√3, etc.) and renders formatted math with LaTeX typography.
 */
export const MathRenderer: React.FC<MathRendererProps> = ({
  text,
  inline = false,
  className = '',
}) => {
  if (!text) return null;

  // Preprocess text to normalize raw math (e.g. 8√3 -> $8\sqrt{3}$)
  const normalizedText = normalizeMathText(text);

  // Split lines if multiline and not inline
  const lines = normalizedText.split('\n');

  return (
    <span className={`math-content leading-relaxed ${className}`}>
      {lines.map((line, lineIdx) => {
        // Regex to match $$...$$ and $...$
        const parts: React.ReactNode[] = [];
        const regex = /(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/g;
        let lastIndex = 0;
        let match: RegExpExecArray | null;

        while ((match = regex.exec(line)) !== null) {
          const matchStart = match.index;
          const matchEnd = regex.lastIndex;

          // Text before math
          if (matchStart > lastIndex) {
            const rawPart = line.substring(lastIndex, matchStart);
            // If rawPart has raw square roots like √3, render with fallback HTML
            if (rawPart.includes('√') || rawPart.includes('²') || rawPart.includes('³')) {
              parts.push(
                <span
                  key={`text-${lineIdx}-${lastIndex}`}
                  dangerouslySetInnerHTML={{ __html: renderFallbackMathHTML(rawPart) }}
                />
              );
            } else {
              parts.push(
                <span key={`text-${lineIdx}-${lastIndex}`}>
                  {rawPart}
                </span>
              );
            }
          }

          const mathToken = match[0];
          if (mathToken.startsWith('$$') && mathToken.endsWith('$$')) {
            const math = mathToken.slice(2, -2);
            parts.push(
              <span key={`display-math-${lineIdx}-${matchStart}`} className="block my-2 text-center">
                <KatexSpan math={math} displayMode={true} />
              </span>
            );
          } else if (mathToken.startsWith('$') && mathToken.endsWith('$')) {
            const math = mathToken.slice(1, -1);
            parts.push(
              <KatexSpan key={`inline-math-${lineIdx}-${matchStart}`} math={math} displayMode={false} />
            );
          }

          lastIndex = matchEnd;
        }

        // Remaining text after last math match
        if (lastIndex < line.length) {
          const rawPart = line.substring(lastIndex);
          if (rawPart.includes('√') || rawPart.includes('²') || rawPart.includes('³')) {
            parts.push(
              <span
                key={`text-end-${lineIdx}-${lastIndex}`}
                dangerouslySetInnerHTML={{ __html: renderFallbackMathHTML(rawPart) }}
              />
            );
          } else {
            parts.push(
              <span key={`text-end-${lineIdx}-${lastIndex}`}>
                {rawPart}
              </span>
            );
          }
        }

        // If line has no math tokens, just render the line (with raw math fallback if contains √)
        if (parts.length === 0) {
          if (line.includes('√') || line.includes('²') || line.includes('³')) {
            parts.push(
              <span
                key={`line-${lineIdx}`}
                dangerouslySetInnerHTML={{ __html: renderFallbackMathHTML(line) }}
              />
            );
          } else {
            parts.push(<span key={`line-${lineIdx}`}>{line}</span>);
          }
        }

        return (
          <React.Fragment key={`line-frag-${lineIdx}`}>
            {lineIdx > 0 && <br />}
            {parts}
          </React.Fragment>
        );
      })}
    </span>
  );
};
