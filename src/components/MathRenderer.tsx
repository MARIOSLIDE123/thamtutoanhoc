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
 * Fallback HTML parser for basic math symbols when KaTeX is offline/loading
 */
function renderFallbackMath(tex: string): string {
  let res = tex;

  // Replace \frac{a}{b}
  res = res.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 / $2)');
  // Replace \sqrt{a} or \sqrt[n]{a}
  res = res.replace(/\\sqrt\{([^}]+)\}/g, '√($1)');
  res = res.replace(/\\sqrt\[([^\]]+)\]\{([^}]+)\}/g, '√[$1]($2)');
  // Replace powers
  res = res.replace(/\^\{([^}]+)\}/g, '<sup>$1</sup>');
  res = res.replace(/\^([0-9a-zA-Z]+)/g, '<sup>$1</sup>');
  // Replace degree
  res = res.replace(/\\circ/g, '°');
  res = res.replace(/\^\\circ/g, '°');
  // Replace times / dot / approx
  res = res.replace(/\\cdot/g, ' · ');
  res = res.replace(/\\times/g, ' × ');
  res = res.replace(/\\approx/g, ' ≈ ');
  res = res.replace(/\\widehat\{([^}]+)\}/g, '$1^');
  res = res.replace(/\\text\{([^}]+)\}/g, '$1');

  return res;
}

/**
 * Renders a single math expression using KaTeX if available
 */
const KatexSpan: React.FC<{ math: string; displayMode?: boolean }> = ({ math, displayMode = false }) => {
  const html = useMemo(() => {
    const cleanMath = math.trim();
    if (typeof window !== 'undefined' && window.katex) {
      try {
        return window.katex.renderToString(cleanMath, {
          displayMode,
          throwOnError: false,
        });
      } catch (err) {
        console.warn('KaTeX rendering error:', err);
      }
    }
    // Fallback if KaTeX is not loaded
    const fallback = renderFallbackMath(cleanMath);
    return `<span class="font-mono text-amber-200 font-bold">${fallback}</span>`;
  }, [math, displayMode]);

  return <span className="inline-math inline-block" dangerouslySetInnerHTML={{ __html: html }} />;
};

/**
 * MathRenderer component:
 * Parses text containing inline ($...$) or display ($$...$$) math expressions
 * and renders formatted math with LaTeX typography.
 */
export const MathRenderer: React.FC<MathRendererProps> = ({
  text,
  inline = false,
  className = '',
}) => {
  if (!text) return null;

  // Split lines if multiline and not inline
  const lines = text.split('\n');

  return (
    <span className={`math-content leading-relaxed ${className}`}>
      {lines.map((line, lineIdx) => {
        // Regex to match $$...$$ and $...$
        // Parts: non-math text alternating with math expressions
        const parts: React.ReactNode[] = [];
        const regex = /(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/g;
        let lastIndex = 0;
        let match: RegExpExecArray | null;

        while ((match = regex.exec(line)) !== null) {
          const matchStart = match.index;
          const matchEnd = regex.lastIndex;

          // Text before math
          if (matchStart > lastIndex) {
            parts.push(
              <span key={`text-${lineIdx}-${lastIndex}`}>
                {line.substring(lastIndex, matchStart)}
              </span>
            );
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
          parts.push(
            <span key={`text-end-${lineIdx}-${lastIndex}`}>
              {line.substring(lastIndex)}
            </span>
          );
        }

        // If line has no math tokens, just render the line
        if (parts.length === 0) {
          parts.push(<span key={`line-${lineIdx}`}>{line}</span>);
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
