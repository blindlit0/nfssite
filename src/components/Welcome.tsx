import React from 'react';
import styled from 'styled-components';

const Welcome = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <svg height={0} width={0} viewBox="0 0 64 64" className="absolute">
          <defs className="s-xJBuHA073rTt" xmlns="http://www.w3.org/2000/svg">
            <linearGradient className="s-xJBuHA073rTt" gradientUnits="userSpaceOnUse" y2={2} x2={0} y1={62} x1={0} id="b">
              <stop className="s-xJBuHA073rTt" stopColor="#973BED" />
              <stop className="s-xJBuHA073rTt" stopColor="#007CFF" offset={1} />
            </linearGradient>
            <linearGradient className="s-xJBuHA073rTt" gradientUnits="userSpaceOnUse" y2={0} x2={0} y1={64} x1={0} id="c">
              <stop className="s-xJBuHA073rTt" stopColor="#FFC800" />
              <stop className="s-xJBuHA073rTt" stopColor="#F0F" offset={1} />
              <animateTransform repeatCount="indefinite" keySplines=".42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1" keyTimes="0; 0.125; 0.25; 0.375; 0.5; 0.625; 0.75; 0.875; 1" dur="8s" values="0 32 32;-270 32 32;-270 32 32;-540 32 32;-540 32 32;-810 32 32;-810 32 32;-1080 32 32;-1080 32 32" type="rotate" attributeName="gradientTransform" />
            </linearGradient>
            <linearGradient className="s-xJBuHA073rTt" gradientUnits="userSpaceOnUse" y2={2} x2={0} y1={62} x1={0} id="d">
              <stop className="s-xJBuHA073rTt" stopColor="#00E0ED" />
              <stop className="s-xJBuHA073rTt" stopColor="#00DA72" offset={1} />
            </linearGradient>
          </defs>
        </svg>

        {/* W */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" height={64} width={64} className="inline-block">
          <path strokeLinejoin="round" strokeLinecap="round" strokeWidth={8} stroke="url(#b)" d="M4 4 L16 60 L32 20 L48 60 L60 4" className="dash" pathLength={360} />
        </svg>
        {/* E */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" height={64} width={64} className="inline-block">
          <path strokeLinejoin="round" strokeLinecap="round" strokeWidth={8} stroke="url(#c)" d="M60 4 H4 V 60 H 60 M4 32 H 44" className="dash" pathLength={360} />
        </svg>
        {/* L */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" height={64} width={64} className="inline-block">
          <path strokeLinejoin="round" strokeLinecap="round" strokeWidth={8} stroke="url(#d)" d="M4 4 V 60 H 60" className="dash" pathLength={360} />
        </svg>
        {/* C */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" height={64} width={64} className="inline-block">
          <path strokeLinejoin="round" strokeLinecap="round" strokeWidth={8} stroke="url(#b)" d="M52 52 a28 28 0 1 1 0-40" className="dash" pathLength={360} />
        </svg>
        {/* O */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" height={64} width={64} className="inline-block">
          <path strokeLinejoin="round" strokeLinecap="round" strokeWidth={10} stroke="url(#c)" d="M 32 32 m 0 -27 a 27 27 0 1 1 0 54 a 27 27 0 1 1 0 -54" className="spin" pathLength={360} />
        </svg>
        {/* M */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" height={64} width={64} className="inline-block">
            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth={8} stroke="url(#d)" d="M4 60 V4 L32 52 L60 4 V 60" className="dash" pathLength={360} />
        </svg>
        {/* E */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" height={64} width={64} className="inline-block">
          <path strokeLinejoin="round" strokeLinecap="round" strokeWidth={8} stroke="url(#b)" d="M60 4 H4 V 60 H 60 M4 32 H 44" className="dash" pathLength={360} />
        </svg>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .absolute {
    position: absolute;
  }

  .inline-block {
    display: inline-block;
  }

  .loader {
    display: flex;
    margin: 0.25em 0;
    max-width: 100%;
    flex-wrap: wrap;
    justify-content: center;
  }

  .w-2 {
    width: 0.5em;
  }

  .dash {
    /* much slower drawing */
    animation: dashArray 6s ease-in-out infinite,
      dashOffset 6s linear infinite;
  }

  .spin {
    /* much slower overall spin */
    animation: spinDashArray 6s ease-in-out infinite,
      spin 24s ease-in-out infinite,
      dashOffset 6s linear infinite;
    transform-origin: center;
  }

  @keyframes dashArray {
    0% {
      stroke-dasharray: 0 1 359 0;
    }

    50% {
      stroke-dasharray: 0 359 1 0;
    }

    100% {
      stroke-dasharray: 359 1 0 0;
    }
  }

  @keyframes spinDashArray {
    0% {
      stroke-dasharray: 270 90;
    }

    50% {
      stroke-dasharray: 0 360;
    }

    100% {
      stroke-dasharray: 270 90;
    }
  }

  @keyframes dashOffset {
    0% {
      stroke-dashoffset: 365;
    }

    100% {
      stroke-dashoffset: 5;
    }
  }

  @keyframes spin {
    0% {
      rotate: 0deg;
    }

    12.5%,
    25% {
      rotate: 270deg;
    }

    37.5%,
    50% {
      rotate: 540deg;
    }

    62.5%,
    75% {
      rotate: 810deg;
    }

    87.5%,
    100% {
      rotate: 1080deg;
    }
  }
`;

export default Welcome;
